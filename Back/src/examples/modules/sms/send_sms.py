import sys
import os
import json

# 현재 파일의 경로를 기준으로 프로젝트 루트 디렉토리를 설정
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, '..', '..', '..', '..'))
sys.path.append(project_root)

from src.lib import message


# 한번 요청으로 1만건의 메시지 발송이 가능합니다.
if __name__ == '__main__':
    data = {
        'messages': [
            {
                'to': '01043442019',
                'from': '01029505968',
                'text': '상현이형 너무최고.'
            }
            # ...
            # 1만건까지 추가 가능
        ]
    }
    res = message.send_many(data)
    print(json.dumps(res.json(), indent=2, ensure_ascii=False))
