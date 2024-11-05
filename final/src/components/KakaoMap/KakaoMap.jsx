import React, { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    // 스크립트가 이미 로드된 경우 바로 지도 로드
    if (window.kakao && window.kakao.maps) {
      loadMap();
      return;
    }

    // 스크립트가 로드되지 않았으면 동적으로 추가
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d6e252d637c0d3495f0c36ab69c21bad&libraries=services`;
    script.async = true;

    // 스크립트 로드가 완료되면 지도 로드 함수 호출
    script.onload = () => {
      loadMap();
    };
    document.head.appendChild(script);

    // 지도 로드 함수 정의
    function loadMap() {
      if (!window.kakao || !window.kakao.maps) {
        console.error("Kakao API가 로드되지 않았습니다.");
        return;
      }

      const { kakao } = window;

      // 지도의 중심 좌표 설정 (예: 서울 중심)
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울의 위도와 경도
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);

      // 장소 검색 예시: '병원' 키워드로 주변 장소 표시
      const places = new kakao.maps.services.Places();
      const callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          result.forEach((place) => {
            const marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(place.y, place.x),
            });
          });
        }
      };

      // 현재 위치 기준으로 5km 반경 내 병원 검색
      places.keywordSearch("병원", callback, {
        location: new kakao.maps.LatLng(37.5665, 126.9780),
        radius: 5000,
      });
    }

    return () => {
      // 컴포넌트가 언마운트될 때 스크립트 제거 (필요시)
      if (script) {
        script.remove();
      }
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default KakaoMap;
