const express = require('express');
const router = express.Router();
const request = require('request');
const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/getinfo', function(req, res, next) {
  res.render('getinfo');
});

router.post('/getinfo', function(req, res, next) {
  request.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + req.body['isbn-input'] + '&jscmd=data&format=json', function(error, response) {
      if (error) {
          console.log(error);
      }
      else {
          console.log(response.body);
          var bookInfo = JSON.parse(response.body);
          if (bookInfo.totalItems === 0) {
              //book not found by api
              res.render('newbook', {info: undefined})
          }
          else {
              res.render('newbook', {info: bookInfo['ISBN:' + req.body['isbn-input']]});
          }
      }
  });
});

router.get('/search', function(req, res, next) {
  res.render('search');
});

router.post('/search', function(req, res, next) {
  if (req.body['isbn-input']) {
    let searchFor = req.body['isbn-input'];
    let params = [searchFor, searchFor. searchFor];
    db.query('SELECT `Id` FROM `Book` WHERE (`ISBN-10` = ?) OR (`ISBN-13` = ?) OR (`Title` = ?) OR (`Author` = ?);', params, function(err, results, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.render('searchresults', {results: results});
      }
    });
  } else if (req.body['title-input']) {
    let searchFor = req.body['title-input'];
    let params = [searchFor, searchFor. searchFor];
    db.query('SELECT `Id` FROM `Book` WHERE (`ISBN-10` = ?) OR (`ISBN-13` = ?) OR (`Title` = ?) OR (`Author` = ?);', params, function(err, results, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.render('searchresults', {results: results});
      }
    });
  } else if (req.body['author-input']) {
    let searchFor = req.body['author-input'];
    db.query('SELECT `AuthorOf` FROM `Author` WHERE (`Name` like ?);', db.escape('%' + searchFor + '%'), function(err, results, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.render('searchresults', {results: results});
      }
    });
  } else {
    res.sendStatus(400);
  }
  
});

module.exports = router;
