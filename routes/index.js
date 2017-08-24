var express = require('express');
var router = express.Router();
var gf = require('./global_functions.js');
var fs = require('fs');
var blog_dir = "./views/blog";


// Get template for event
router.get('/blog:id', function (req, res) {
    var id = req.params.id.substring(1, Infinity);
    fs.readdir(blog_dir, function(err, data) {
        if (id > 0 && id <= data.length){
            var view_path = "blog/article_0" + id;
            res.render(view_path);
        } else {
            res.status(404).render('layouts/error_404');
        }
    });
});


// Get Homepage
router.get('/', function(req, res){
	res.render('index');
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