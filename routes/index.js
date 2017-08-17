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


// Get blog
router.get('/blog', function (req, res) {
    res.render('blog', {title: "Blog"});
});


// Get about
router.get('/about', function (req, res) {
    res.render('about', {title: "About"});
});


// Get login
router.get('/admin', function (req, res) {
    res.render('admin', {title: "Admin"});
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;