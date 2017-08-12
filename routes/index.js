var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
	res.render('index');
});


// Get Homepage
router.get('/users/login', function(req, res){
    res.render('');
});


// Get event 1
router.get('/event_1', function (req, res) {
    res.render('event_1', {title: "Event 1"});
});


// Get event 2
router.get('/event_2', function (req, res) {
    res.render('event_2', {title: "Event 2"});
});


// Get event 3
router.get('/event_3', function (req, res) {
    res.render('event_3', {title: "Event 3"});
});


// Get blog
router.get('/blog', function (req, res) {
    res.render('blog', {title: "Blog"});
});


// Get about
router.get('/about', function (req, res) {
    res.render('about', {title: "About"});
});


// Get login
/*router.get('/login', function (req, res) {
    res.render('login', {title: "Login"});
});*/


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;