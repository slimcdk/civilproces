var express = require('express');
var router = express.Router();

/*
// Get article 01
router.get('/01', function (req, res) {
    res.render('blog/article_01');
});

// Get article 02
router.get('/02', function (req, res) {
    res.render('blog/article_02');
});*/


// Get event 1
router.get('/event_1', function (req, res) {
    res.render('events/event_1', {title: "Event 1"});
});


// Get event 2
router.get('/event_2', function (req, res) {
    res.render('events/event_2', {title: "Event 2"});
});


// Get event 3
router.get('/event_3', function (req, res) {
    res.render('events/event_3', {title: "Event 3"});
});


module.exports = router;