from sqlalchemy import create_engine
from ipconfig import pw


database_url = f"mysql+pymysql://Insa5_IOT_final_2:{pw}@project-db-stu3.smhrd.com:3307/Insa5_IOT_final_2"
# mysql+pymysql://<user>:<password>@<host>:<port>/<database>
engine = create_engine(database_url)