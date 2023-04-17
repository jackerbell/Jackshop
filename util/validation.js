const isEmpty = (value) => {
  return !value || value.trim() === ''; 
}

const userCredentialAreValid = (email, password) => {
  return email &&
    email.includes('@') &&
    password &&
    password.length >= 6;
}

const userDetailsAreValid = (email, password, name, street, postal, city) => {
  console.log(`at userDetalisAreValid email,password : ` + `${userCredentialAreValid(email, password)}`);
  console.log(`at userDetalisAreValid name : ` + `${!isEmpty(name)} ` + `${name}`);
  console.log(`at userDetalisAreValid street : ` + `${!isEmpty(street)} ` + `${street}`);
  console.log(`at userDetalisAreValid postal : ` + `${!isEmpty(postal)} ` + `${postal}`);
  console.log(`at userDetalisAreValid city : ` + `${!isEmpty(city)} ` + `${city}`);
  return (
    userCredentialAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed
};