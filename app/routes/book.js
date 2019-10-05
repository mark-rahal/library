const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', function(req, res, next) {
    // list all books
});

router.get('/:id', function(req, res, next) {
    //work on this
    let params = [];
});

router.post('/', function(req, res, next) {
    let params = [req.body['book-title-input'], req.body['isbn-10-input'], req.body['isbn-13-input'], req.body['dds-num-input']]
    db.query('INSERT INTO `Book` (`Title`, `ISBN-10`, `ISBN-13`, `DDSNum`) VALUES (?, ?, ?, ?);', params, function(error, results, fields) {
        if (error) {
            console.log(error); //add better error handling later
        }
        else {
            let bookId = results.insertId;
            let authors = req.body['book-author-input'];
            if (!(authors instanceof Array)) {
                authors = [authors];
            }
            authors.forEach(function(author) {
                params = [author, bookId];
                db.query('INSERT INTO `Author` (`Name`, `AuthorOf`) VALUES (?, ?);', params, function(error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        //render success page!
                        res.render('index', {bookAddSuccess: true});
                    }
                });
            });
        }
    });
});

module.exports = router;