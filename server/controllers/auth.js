const User = require('../models/user');

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.checkLogin({ email: email, password: password })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => console.log(err))
}

exports.postSignup = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User(firstName, lastName, email, password);
  user.save()
    .then(result => {
      console.log('SignUP')
      console.log(result)
      res.status(200).send(result)
    })
    .catch(err => console.log(err))
}
