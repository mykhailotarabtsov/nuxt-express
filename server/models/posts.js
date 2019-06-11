const getDb = require('../util/database').getDb;

class Post {
  constructor (title, imageUrl, description, author, updatedDate) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.author = author;
    this.updatedDate = updatedDate;
  }

  save () {
    const db = getDb();
    let dbOp;
    dbOp = db.collection('posts').insertOne(this);
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
  }

  static fetchPosts () {
    const db = getDb();
    return db.collection('posts').find().toArray()
      .then(posts => {
        return posts;
      })
      .catch(err => console.log(err))
  }

}

module.exports = Post;
