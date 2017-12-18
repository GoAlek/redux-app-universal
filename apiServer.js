var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIS
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop', {
  useMongoClient: true
});

var Books = require('./models/books.js');

//---->>> POST A BOOK <<<----
app.post('/books', function(req, res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err) {
      throw err;
    }
    res.json(books);
  })
});

//---->>> GET BOOKS <<<----
app.get('/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//---->>> DELETE A BOOK <<<----
app.delete('/books/:_id', function(req, res){
  var query = {_id: req.params._id};

  Books.remove(query, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//---->>> UPDATE A BOOK <<<----
app.put('/books/:_id', function(req, res){
  var book = req.body;
  var query = req.params._id;
  //if the field doesn't exist $set will set a new field

  var updatedBook = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  var options = {new: true};

  Books.findOneAndUpdate(query, updatedBook, options, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  });
});

// END APIs

app.listen(3001, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
});