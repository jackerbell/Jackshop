const checkAuthStatus = (req,res,next) => {
  const uid = req.session.uid;

  if(!uid){
    return next(); //리턴 후 아래의 응답을 처리
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  res.locals.isAdmin = req.session.isAdmin;
  next();
}

module.exports = checkAuthStatus;