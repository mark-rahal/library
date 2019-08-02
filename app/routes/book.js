const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/', function(req, res, next) {
    request.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + req.body['isbn-input'], function(error, response) {
        if (error) {
            console.log(error);
        }
        else {
            var bookInfo = JSON.parse(response.body);
            if (bookInfo.totalItems === 0) {
                //book not found by google books api
                res.render('newbook', {info: undefined})
            }
            else {
                res.render('newbook', {info: bookInfo.items[0].volumeInfo});
            }
        }
    });
});

module.exports = router;