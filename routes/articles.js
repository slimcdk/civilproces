var express = require('express');
var router = express.Router();

// Get article 01
router.get('/01', function (req, res) {
    res.render('blog/article_01');
});

// Get article 02
router.get('/02', function (req, res) {
    res.render('blog/article_02');
});

module.exports = router;