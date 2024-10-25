const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'project-db-stu3.smhrd.com',
  port: 3307,
  user: 'Insa5_IOT_final_2',
  password: 'aischool2',
  database: 'Insa5_IOT_final_2',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});

module.exports = db;
