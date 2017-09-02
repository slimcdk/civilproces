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

    if (id.length === 1){
        id = "0" + id;
    }

    fs.readdir(blog_dir, function(err, data) {
        if (err) throw err;
        if (id > 0 && id <= data.length && id.length === 2){
            var view_path = "blog/article_" + id;
            res.render(view_path);
        } else if (id === "length") {
            res.status(200).send({length: data.length});
        } else {
            res.status(404).render('layouts/error_404');
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
    res.render('about', {title: "Omkring"});
});


// Get about
router.get('/contact', function (req, res) {
    res.render('contact', {title: "Kontakt"});
});


// Get login
router.get('/admin', gf.ensureAuthenticated, function (req, res) {
    res.render('admin', {title: "Admin"});
});

module.exports = router;