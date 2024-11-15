from sqlalchemy import create_engine
import json

with open("config.json") as config_file:
    config = json.load(config_file)

# 환경 변수 사용
database_url = config["DATABASE_URL"]


# database_url = f"mysql+pymysql://Insa5_IOT_final_2:aischool2@project-db-stu3.smhrd.com:3307/Insa5_IOT_final_2"
# mysql+pymysql://<user>:<password>@<host>:<port>/<database>
engine = create_engine(database_url)