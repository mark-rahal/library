var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.render('book', {isbn: req.body['isbn-input']});
});

module.exports = router;