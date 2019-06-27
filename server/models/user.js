const getDb = require('../util/database').getDb;

let ObjectID = require('mongodb').ObjectID;

class User {
  constructor (firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  save () {
    const db = getDb();
    return db.collection('users').insertOne(this)
      .then(result => {
        return result.insertedId;
      })
      .catch(err => console.log(err))
  }

  static findById (userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: ObjectID(userId) })
      .then(user => {
        console.log('Found')
        return user
      })
      .catch(err => console.log(err))
  }

  static checkLogin (user) {
    const db = getDb();
    return db.collection('users').findOne({ email: user.email, password: user.password })
      .then(result => {
        console.log('Login is good!')
        return result;
      })
      .catch(err => console.log(err))
  }
}

module.exports = User;
