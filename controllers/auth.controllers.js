const User = require('../models/user.model');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');

const getSingUp = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);
  if(!sessionData){
    sessionData = { // enteredData 의 키와 매칭이되는지 확인!!!!!!
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postal: '',
      city: '',
    }
  }
  res.render('customer/auth/signup',{inputData: sessionData}); 
}

const signup = async (req,res) => {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body['confirm-email'],
    password: req.body.password, 
    fullname: req.body.fullname, 
    street: req.body.street, 
    postal: req.body.postal, 
    city: req.body.city,  
  };

  if(!validation.userDetailsAreValid( 
    req.body.email,
    req.body.password, 
    req.body.fullname, 
    req.body.street, 
    req.body.postal, 
    req.body.city
  ) || !validation.emailIsConfirmed(req.body.email, req.body['confirm-email']) 
  ){
    sessionFlash.flashDataToSession(req,{
      errorMessage: 'please check your input. Password must be at least 6 characters long, postal code must be 5 characters long.',
      ...enteredData // 모든 키, 값을 가져옴..
      },
      ()=>{
      res.redirect('/signup');
    })
    return;
  }

  const user = new User( // 유효성 검증 후에만 생성
    req.body.email, 
    req.body.password, 
    req.body.fullname, 
    req.body.street, 
    req.body.postal, 
    req.body.city 
  );


  try {
    const existsAlready = await user.existsAlready();

    if(existsAlready) {
      sessionFlash.flashDataToSession(req,{
        errorMessage: 'User exists already!. Try logging in instead!',
        ...enteredData
      },
      ()=>{
        res.redirect('/signup'); // render 의 경우 post로 요청이 들어가고, 브라우저에서 post요청에 대한 응답여부를 경고문으로 묻고 요청하면 잘못된 데이터가 들어올 수 있음.
      })
      return ;
    }
    await user.signup();
  } catch(error) {
    next(error); // 500
    return;
  }

  res.redirect('/login');
}

const getLogin = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);

  if(!sessionData){
    sessionData = {
      email: '',
      password: ''
    }
  }

  res.render('customer/auth/login',{inputData:sessionData});
}

const login = async (req,res,next) => {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserWithSameEmail();

  const sessionErrorData = {
    errorMessage:'Invalid credentials - please dobule check your email and password!',
    email: user.email,
    password: user.password
  }

  if(!existingUser) {
    sessionFlash.flashDataToSession(req,sessionErrorData,
    ()=>{
      res.redirect('/login');
    })
    return ;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

  if(!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req,sessionErrorData,
      ()=>{
        res.redirect('/login');
    })
    return;
  }

  authUtil.createUserSession(req, existingUser, () => {  
    res.redirect('/');
  })
} 

const logout = (req,res) => {
  authUtil.deleteUserSession(req);
  res.redirect('/login');
}

module.exports = {
  getSingUp : getSingUp,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout
};