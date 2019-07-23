const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/', function(req, res, next) {
    request.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + req.body['isbn-input'], function(error, response) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(response.body);
            res.render('newbook', {info: response.body});
        }
    });
});

module.exports = router;