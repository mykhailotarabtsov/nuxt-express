const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://mykhailo:icuVMsc6QXcB3EB9@cluster0-gn4vg.mongodb.net/posts?retryWrites=true&w=majority', {useNewUrlParser: true})
    .then(client => {
      console.log('Connected to DB!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
