const addCsrfToken = (req,res,next) => {
  res.locals.csrfToken = req.csrfToken(); // res.locals에 저장되어 모든 뷰에서 사용가능, 이 과정을 통해 csrf 토큰 생성
  next();
}

module.exports = addCsrfToken;
