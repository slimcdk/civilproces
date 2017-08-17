var express = require('express');
var router = express.Router();

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
router.get('/admin', ensureAuthenticated, function (req, res) {
    res.render('admin', {title: "Admin"});


});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		if(req.user.is_admin){
            console.log("Admin accessed site");
            return next();
		} else {
            req.flash('error_msg','Du har ikke administerende rettigheder til denne side');
			req.redirect('/');
		}
	} else {
		req.flash('error_msg','Du skal logge ind for at se denne side');
		res.redirect('/login');
	}
}

module.exports = router;