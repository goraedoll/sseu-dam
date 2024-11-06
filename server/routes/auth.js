router.post('/login', (req, res) => {
    const { UserID, Password } = req.body;
  
    console.log("로그인 시도:", UserID);
  
    const query = 'SELECT * FROM pr_tb_Users WHERE UserID = ?';
    db.query(query, [UserID], (err, results) => {
      if (err) {
        console.error('데이터베이스 오류:', err);
        return res.status(500).send('서버 오류');
      }
  
      if (results.length === 0) {
        console.log("아이디가 존재하지 않음");
        return res.status(400).json({ detail: '아이디 틀림' });
      }
  
      const user = results[0];
      console.log("DB에서 찾은 사용자:", user);
  
      // 비밀번호 비교 (단순 문자열 비교로 수정)
      if (user.PasswordHash !== Password) {
        console.log("비밀번호 불일치");
        return res.status(400).json({ detail: '비밀번호 틀림' });
      }
  
      // JWT 생성
      const token = jwt.sign({ userId: user.UserID }, JWT_SECRET, { expiresIn: '1h' });
  
      // 쿠키에 토큰 설정
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.json({ message: '로그인 성공' });
    });
  });
  