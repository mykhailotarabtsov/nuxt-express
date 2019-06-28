const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.checkLogin({ email: email })
    .then(user => {
      if (!user) {
        return res.send({ errorMessage: true });
      }
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            return res.status(200).send(user);
          }
          return res.send({ errorMessage: true });
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => console.log(err))
}

exports.postSignup = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne(email)
    .then(user => {
      if (user) {
        return res.send({ errorMessage: true });
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User(firstName, lastName, email, hashedPassword);
          return user.save()
        })
        .then(result => {
          console.log('SignUP')
          console.log(result)
          return res.status(200).send(result)
        })
    })
    .catch(err => console.log(err))
}
