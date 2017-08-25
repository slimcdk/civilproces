var express = require('express');
var router = express.Router();
var gf = require('./global_functions.js');
var fs = require('fs');
var blog_dir = "./views/blog";

// Get Homepage
router.get('/', function(req, res){
	res.render('index');
});


// Get template for event
router.get('/blog:id', function (req, res) {
    var id = req.params.id.substring(1, Infinity);
    fs.readdir(blog_dir, function(err, data) {
        if (id > 0 && id <= data.length){


            var view_path = "blog/article_" + id;
            res.render(view_path);
        } else if (id === "length"){
            res.status(404).render('layouts/error_404');
        } else {
            res.status(404).send(null);
        }
    });
});


// Get blog page
router.get('/blog', function(req, res){
    fs.readdir(blog_dir, function(err, data) {
        res.render('blog', {data: data});
    });
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