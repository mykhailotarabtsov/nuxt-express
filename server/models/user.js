const getDb = require('../util/database').getDb;

let ObjectID = require('mongodb').ObjectID;

class User {
  constructor (firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  save () {
    const db = getDb();
    return db.collection('users').insertOne(this)
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
}

module.exports = User;
