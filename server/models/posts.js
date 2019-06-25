const getDb = require('../util/database').getDb;
let ObjectID = require('mongodb').ObjectID;

class Post {
  constructor (title, imageUrl, description, previewText, author, updatedDate, editId) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.previewText = previewText;
    this.author = author;
    this.updatedDate = updatedDate;
    this.editId = editId || '';
  }

  save () {
    const db = getDb();
    let dbOp;
    dbOp = db.collection('posts').insertOne({
      title: this.title,
      imageUrl: this.imageUrl,
      description: this.description,
      previewText: this.previewText,
      author: this.author,
      updatedDate: this.updatedDate
    });
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

  editPost () {
    const db = getDb();
    return db.collection('posts').updateOne({_id: ObjectID(this.editId)}, {
      $set: {
        "title": this.title,
        "imageUrl": this.imageUrl,
        "description": this.description,
        "previewText": this.previewText,
        "author": this.author,
        "updatedDate": this.updatedDate
      }
    })
      .then(result => {
        return result;
      })
      .catch(err => console.log(err))
  }

}

module.exports = Post;
