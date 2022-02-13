/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  // test('#example Test GET /api/books', function(done){
  //    chai.request(server)
  //     .get('/api/books')
  //     .end(function(err, res){
  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body, 'response should be an array');
  //       assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
  //       assert.property(res.body[0], 'title', 'Books in array should contain title');
  //       assert.property(res.body[0], '_id', 'Books in array should contain _id');
  //       done();
  //     });
  // });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai
        .request(server)
        .post('/api/books')
        .send({
          title: "testing"
        })
        .end((err, res) => {
          assert.isAtLeast(res.status, 200)
          assert.isObject(res.body, "Response must be an object")
          assert.property(res.body, '_id',  "Response must contain an object containing the _id and title")
          assert.property(res.body, 'title', "Response must contain an object containing the _id and title")
          done()
        })
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai
        .request(server)
        .post('/api/books')
        .send({})
        .end((err, res) => {
          assert.isAtLeast(res.status, 200)
          assert.equal(res.text, 'missing required field title')
          done()
        })
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai
        .request(server)
        .get('/api/books')
        .end((err, res) => {
          assert.isAtLeast(res.status, 200)
          assert.isArray(res.body)
          assert.isObject(res.body[0], 'Array must contain all the books and its details inside an object')
          assert.property(res.body[0], 'comments', 'An object in the array must contain comments field')
          assert.property(res.body[0], '_id', 'An object in the array must contain -_id field')
          assert.property(res.body[0], 'title', 'An object in the array must contain title field')
          assert.property(res.body[0], 'commentcount', 'An object in the array must contain commentcount field')
          assert.property(res.body[0], '__v', 'An object in the array must contain __v field')
          done()
        })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai
        .request(server)
        .get('/api/books/randomId')
        .end((err, res) => {
          assert.isAtLeast(res.status, 200)
          assert.equal(res.text, 'no book exists')
          done()
        })
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
        .request(server)
        .get('/api/books/6208602cfa182dba9996f286')
        .end((err, res) => {
          assert.isAtLeast(res.status, 200)
          assert.equal(res.body._id, "6208602cfa182dba9996f286")
          assert.isObject(res.body, 'Array must contain all the books and its details inside an object')
          assert.property(res.body, 'comments', 'An object in the array must contain comments field')
          assert.property(res.body, '_id', 'An object in the array must contain -_id field')
          assert.property(res.body, 'title', 'An object in the array must contain title field')
          assert.property(res.body, 'commentcount', 'An object in the array must contain commentcount field')
          assert.property(res.body, '__v', 'An object in the array must contain __v field')
          done()
        })
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai
        .request(server)
        .post('/api/books/6208602cfa182dba9996f286')
        .send({
          comment: "hatdog"
        })
        .end((err, res) => {
          assert.isAtLeast(res.status, 200)
          assert.property(res.body, 'comments', 'must have a comments field')
          assert.include(res.body.comments, 'hatdog')
          done()
        })
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai
        .request(server)
        .post('/api/books/6208602cfa182dba9996f286')
        .send({})
        .end((err, res) => {
          assert.isAtLeast(res.status, 200)
          assert.equal(res.text, 'missing required field comment')
          done()
        })
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai
        .request(server)
        .post('/api/books/randomid')
        .send({
          comment: "must fail"
        })
        .end((err, res) => {
          assert.isAtLeast(res.status, 200)
          assert.equal(res.text, 'no book exists')
          done()
        })
      });
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
        .request(server)
        .delete('/api/books/6208602cfa182dba9996f286')
        .end((err, res) => {
          assert.isAtLeast(res.status, 200)
          assert.equal(res.text, 'delete successful')
          done()
        })
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai
        .request(server)
        .delete('/api/books')
        .end((err, res) => {
          assert.isAtLeast(res.status, 200)
          assert.equal(res.text, 'complete delete successful')
          done()
        })
      });

    });

  });

});
