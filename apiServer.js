var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// --->>> SET UP SESSIONS
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))
  // SAVE TO SESSION CART API
  app.post('/cart', function(req, res) {
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function(err) {
      if (err) {
        console.log('# API POST CART SESSION:', err);
      }
      res.json(req.session.cart);
    })
  })
  // GET SESSION CART API
  app.get('/cart', function(req, res) {
    if (typeof req.session.cart !== 'undefined') {
      res.json(req.session.cart);
    }
  })
  // --->>> END SESSIONS SET UP

var Books = require('./models/books.js');

//---->>> POST A BOOK <<<----
app.post('/books', function(req, res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err) {
      console.log('# API POST BOOKS: ', err);
    }
    res.json(books);
  })
});

//---->>> GET BOOKS <<<----
app.get('/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      console.log('# API GET BOOKS: ', err);
    }
    res.json(books);
  })
});

//---->>> DELETE A BOOK <<<----
app.delete('/books/:_id', function(req, res){
  var query = {_id: req.params._id};

  Books.remove(query, function(err, books){
    if(err){
      console.log('# API DELETE BOOKS: ', err);
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
      console.log('# API UPDATE BOOKS: ',err);
    }
    res.json(books);
  });
});

// ----->>> GET BOOKS IMAGES API <<<-----
app.get('/images', function(req, res) {
  const imgFolder = __dirname + '/public/images/';
  //Require file system
  const fs = require('fs');
  //Read all file in the directory
  fs.readdir(imgFolder, function(err, files) {
    if (err) {
      return console.error(err);
    }
    //Create an empty array
    const imgArr = [];
    files.forEach(function(file) {
      imgArr.push({name: file});
    });
    res.json(imgArr);
  });
})
// END APIs

app.listen(3001, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
});