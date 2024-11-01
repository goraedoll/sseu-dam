import gi
gi.require_version('Gst', '1.0')
from gi.repository import Gst
import os
import numpy as np
import threading
import requests
import cv2
import hailo
import time
from collections import deque

from hailo_rpi_common import (
    get_caps_from_pad,
    get_numpy_from_buffer,
    app_callback_class,
)
from pose_estimation_pipeline import GStreamerPoseEstimationApp

# 서버 URL 설정
server_url = 'http://192.168.20.106:1252/upload'

# 알림 서버 URL
alert_url = 'http://192.168.20.106:1252/main/alert'

# -----------------------------------------------------------------------------------------------
# User-defined class for callback and frame storage
# -----------------------------------------------------------------------------------------------
class user_app_callback_class(app_callback_class):
    def __init__(self):
        super().__init__()
        self.frame = None
        self.prev_positions = deque(maxlen=5)  # 최근 5개의 머리 위치 저장
        self.prev_times = deque(maxlen=5)      # 최근 5개의 시간 저장
        self.alert_active = False
        self.last_alert_time = 0

    def set_frame(self, frame):
        """프레임 저장"""
        self.frame = frame

    def get_frame(self):
        """저장된 프레임 반환"""
        return self.frame

# -----------------------------------------------------------------------------------------------
# 이동 평균 계산 함수
# -----------------------------------------------------------------------------------------------
def calculate_moving_average(positions):
    """머리 위치의 이동 평균 계산"""
    x_avg = np.mean([pos[0] for pos in positions])
    y_avg = np.mean([pos[1] for pos in positions])
    return (x_avg, y_avg)

# -----------------------------------------------------------------------------------------------
# 낙상 감지 알고리즘
# -----------------------------------------------------------------------------------------------
def detect_fall_with_moving_average(head_pos, bbox_ratio, prev_positions, prev_times):
    """이동 평균을 활용한 낙상 감지 알고리즘"""
    if len(prev_positions) < 2:
        return False  # 데이터가 충분하지 않으면 감지하지 않음

    # 이전 위치의 이동 평균 계산
    avg_prev_pos = calculate_moving_average(prev_positions)
    dist = np.linalg.norm(np.array(head_pos) - np.array(avg_prev_pos))

    # 평균 속도 계산
    time_diff = prev_times[-1] - prev_times[0]
    speed = dist / time_diff if time_diff > 0 else 0

    # Y축 하락량 계산
    y_diff = head_pos[1] - avg_prev_pos[1]

    # 임계값 정의
    SPEED_THRESHOLD = 50  # 속도 임계값 (픽셀/초)
    Y_DROP_THRESHOLD = 15  # Y축 하락 임계값 (픽셀)
    BBOX_RATIO_THRESHOLD = 0.5  # 바운딩 박스 비율 임계값

    # 소수점 2자리로 출력하도록 포맷팅
    print(f"Speed: {speed:.2f}, Y-Diff: {y_diff:.2f}, BBox Ratio: {bbox_ratio:.2f}")

    # 낙상 조건: 빠른 속도 + Y축 하락 + 바운딩 박스 비율 감소
    return (
        speed > SPEED_THRESHOLD and
        y_diff > Y_DROP_THRESHOLD and
        bbox_ratio < BBOX_RATIO_THRESHOLD
    )


# -----------------------------------------------------------------------------------------------
# GStreamer Callback function
# -----------------------------------------------------------------------------------------------
def app_callback(pad, info, user_data):
    """GStreamer 콜백 함수"""
    buffer = info.get_buffer()
    if buffer is None:
        return Gst.PadProbeReturn.OK

    user_data.increment()

    format, width, height = get_caps_from_pad(pad)
    frame = get_numpy_from_buffer(buffer, format, width, height)

    roi = hailo.get_roi_from_buffer(buffer)
    detections = roi.get_objects_typed(hailo.HAILO_DETECTION)
    keypoints = get_keypoints()

    for detection in detections:
        label = detection.get_label()
        bbox = detection.get_bbox()
        confidence = detection.get_confidence()

        if label == "person" and confidence >= 0.8:
            landmarks = detection.get_objects_typed(hailo.HAILO_LANDMARKS)
            if len(landmarks) != 0:
                points = landmarks[0].get_points()

                head_x = np.mean([points[keypoints[key]].x() for key in 
                                  ['nose', 'left_eye', 'right_eye', 'left_ear', 'right_ear']])
                head_y = np.mean([points[keypoints[key]].y() for key in 
                                  ['nose', 'left_eye', 'right_eye', 'left_ear', 'right_ear']])
                head_pos = (int(head_x * width), int(head_y * height))

                bbox_ratio = bbox.height() / bbox.width()
                curr_time = time.time()

                # 최근 위치와 시간 업데이트
                user_data.prev_positions.append(head_pos)
                user_data.prev_times.append(curr_time)

                # 낙상 감지 수행
                if detect_fall_with_moving_average(head_pos, bbox_ratio, user_data.prev_positions, user_data.prev_times):
                    if curr_time - user_data.last_alert_time > 300:  # 알림 주기 300초
                        user_data.alert_active = True
                        user_data.last_alert_time = curr_time
                        send_alert("Fall Detection")

                if user_data.alert_active:
                    cv2.putText(frame, "FALL DETECTED!", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                    if time.time() - user_data.last_alert_time > 5:
                        user_data.alert_active = False

                # 스켈레톤 그리기
                keypoint_coords = {}
                for keypoint_name, keypoint_index in keypoints.items():
                    if keypoint_index < len(points):
                        point = points[keypoint_index]
                        x = int((point.x() * bbox.width() + bbox.xmin()) * width)
                        y = int((point.y() * bbox.height() + bbox.ymin()) * height)
                        keypoint_coords[keypoint_index] = (x, y)
                        cv2.circle(frame, (x, y), 5, (0, 255, 0), -1)

                for connection in get_connections():
                    if connection[0] in keypoint_coords and connection[1] in keypoint_coords:
                        pt1 = keypoint_coords[connection[0]]
                        pt2 = keypoint_coords[connection[1]]
                        cv2.line(frame, pt1, pt2, (255, 0, 0), 2)

    frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
    user_data.set_frame(frame)
    send_frame_to_server(frame)

    return Gst.PadProbeReturn.OK

# -----------------------------------------------------------------------------------------------
# 알림 전송 함수
# -----------------------------------------------------------------------------------------------
def send_alert(sensing_type):
    """낙상 알림 전송 함수"""
    data = {
        "DeviceIdx" : 1,
        "SensingType": sensing_type}
    try:
        response = requests.post(alert_url, json=data)
        if response.status_code == 200:
            print("[INFO] Alert sent successfully")
        else:
            print(f"[ERROR] Failed to send alert. Status Code: {response.status_code}")
    except Exception as e:
        print(f"[ERROR] Exception while sending alert: {e}")


# -----------------------------------------------------------------------------------------------
# 프레임 전송 함수
# -----------------------------------------------------------------------------------------------
def send_frame_to_server(frame):
    success, img_encoded = cv2.imencode('.jpg', frame)
    if not success:
        print("[ERROR] Failed to encode the frame.")
        return

    img_bytes = img_encoded.tobytes()

    def post_request():
        try:
            response = requests.post(server_url, files={'image': ('frame.jpg', img_bytes, 'image/jpeg')})
        except Exception as e:
            print(f"[ERROR] Exception while sending frame: {e}")

    threading.Thread(target=post_request, daemon=True).start()

# -----------------------------------------------------------------------------------------------
# COCO Keypoints 정의
# -----------------------------------------------------------------------------------------------
def get_keypoints():
    return {
        'nose': 0, 'left_eye': 1, 'right_eye': 2, 'left_ear': 3, 'right_ear': 4,
        'left_shoulder': 5, 'right_shoulder': 6, 'left_elbow': 7, 'right_elbow': 8,
        'left_wrist': 9, 'right_wrist': 10, 'left_hip': 11, 'right_hip': 12,
        'left_knee': 13, 'right_knee': 14, 'left_ankle': 15, 'right_ankle': 16
    }

def get_connections():
    return [
        (0, 1), (1, 3), (0, 2), (2, 4), (5, 6), (5, 7), (7, 9), (6, 8), (8, 10),
        (5, 11), (11, 13), (13, 15), (6, 12), (12, 14), (14, 16), (11, 12)
    ]

# -----------------------------------------------------------------------------------------------
# Main 함수
# -----------------------------------------------------------------------------------------------
if __name__ == "__main__":
    user_data = user_app_callback_class()
    user_data.use_frame = True

    app = GStreamerPoseEstimationApp(app_callback, user_data)

    print("Starting pose estimation...")
    try:
        app.run()
    except KeyboardInterrupt:
        print("Stopping...")
