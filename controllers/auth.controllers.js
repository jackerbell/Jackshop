const User = require('../models/user.model');

const getSingUp = (req, res) => {
  res.render('customer/auth/signup'); 
}

const signup = async (req,res) => {
  const user = new User(
    req.body.email, 
    req.body.password, 
    req.body.fullname, 
    req.body.street, 
    req.body.postal, 
    req.body.city 
  );

  await user.signup();

  res.redirect('/login');
}

const getLogin = (req, res) => {
  res.render('customer/auth/login');
}

module.exports = {
  getSingUp : getSingUp,
  getLogin: getLogin,
  signup: signup
};