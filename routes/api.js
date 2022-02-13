/*
*
*
*       Complete the API routing below
*       
*       
*/
'use strict';

const { rawListeners } = require("../server");

module.exports = function (app, Books) {

  app.route('/api/books')
    .get(function (req, res, next){
      let allBooks = []

      Books.find({}, (err, data) => {
        data.map(book => {
          allBooks.push({
            comments: book.comments,
            _id: book.id,
            title: book.title,
            commentcount: book.commentcount,
            __v: book.__v
          })
        })
        res.send(allBooks)
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;

      if(!title){
        return res.send("missing required field title")
      }

      let addBook = new Books({
        comments: [],
        title: title,
        commentcount: 0
      })

      addBook.save((err, doc) => {
        res.json({_id: doc.id, title: doc.title})
      })
    })
    
    .delete(function(req, res, next){
      Books.deleteMany({}, (err, doc) => {
        res.send('complete delete successful')
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;

      Books.findById(bookid, (err, book) => {
        if(!book || err) {
          return res.send('no book exists')
        }
        res.json(book)
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;

      if(!comment) {
        return res.send('missing required field comment')
      }

      Books.findById(bookid, (err, book) => {
        if(!book){
          return res.send('no book exists')
        }
        book.comments.push(comment)
        book.commentcount = book.comments.length

        book.save((err, doc) => {
          res.json(doc)
        })
      })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      Books.deleteOne({_id: bookid}, (err, data) => {
        if(data.deletedCount == 0){
          return res.send('no book exists')
        }
        res.send('delete successful')
      })
    });
  
};
