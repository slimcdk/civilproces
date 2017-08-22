var express = require('express');
var router = express.Router();
var gf = require('./global_functions.js');

// Get Homepage
router.get('/', function(req, res){
	res.render('index');
});


// // Get Homepage
// router.get('/login', function(req, res){
//     res.render('');
// });


// Get blog
router.get('/blog', function (req, res) {
    res.render('blog', {title: "Blog"});
});


// Get about
router.get('/about', function (req, res) {
    res.render('about', {title: "About"});
});


// Get login
router.get('/admin', gf.ensureAuthenticated, function (req, res) {
    res.render('admin', {title: "Admin"});
});




module.exports = router;