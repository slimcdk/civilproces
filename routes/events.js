var express = require('express');
var router = express.Router();

var event_1 = require('../models/event_1');
var event_2 = require('../models/event_2');
var event_3 = require('../models/event_3');


/** ********* **/
/**  EVENT 1  **/
/** ********* **/

// Get template for event 1
router.get('/event_1', function (req, res) {
    res.render('events/event_1', {title: "Event 1"});
});
// receive data for event 3
router.post('/event_1', function (req, res){
    var name = req.body.name;
    var email = req.body.email;
    var working_title = req.body.working_title;
    var company = req.body.company;

    event_1.find({email: email},{__v:0}, function(err, data) {
        if (err) throw err;
        if (data.length === 0) {

            // Validation
            req.checkBody('name', 'Navn er nødvendigt').notEmpty();
            req.checkBody('email', 'Email skal udfyldes').notEmpty();
            req.checkBody('email', 'Tjek venligst at Emailen er skrevet rigtigt').isEmail();
            req.checkBody('working_title', 'Udfyld venligst din arbejdstitel').notEmpty();
            req.checkBody('company', 'Udfyld venligst din arbejdsplads').notEmpty();
            var errors = req.validationErrors();
            if(errors){
                res.redirect('/event_1',{
                    errors:errors
                });
            } else {
                var newSignup = new event_3({
                    name: name,
                    email: email,
                    working_title: working_title,
                    company: company
                });
                newSignup.save(function(err){
                    if(err) throw err;
                });
                req.flash('success_msg', 'Du er nu tilmeldt');
                res.redirect('/event_1');
            }
        } else {
            req.flash('error_msg', 'Den indtastede email er allerde tilmeldt dette event');
            res.redirect('/event_1');
        }
    });
});
// check if mail is assigned to event
router.post('/event_1_check', function(req, res){
    var email = req.body.email;
    event_1.find({email: email},{__v:0}, function(err, data){
        if(err) throw err;
        if(data.length !== 0){
            if(data[0].email === email){
                req.flash('success_msg', 'Den indtastede email er tilmeldt dette event');
                res.redirect('/event_1');
            }
        } else if (data.length === 0){
            req.flash('error_msg','Den indtastede email er ikke tilmeldt dette event');
            res.redirect('/event_1');
        }
    });
});
// transmit database content
router.get('/event_1_json', function (req, res) {
    event_1.find({},{__v:0}, function(err, data){
        if(err) throw err;
        res.json(data);
    });
});


/** ********* **/
/**  EVENT 2  **/
/** ********* **/


// Get template for event 2
router.get('/event_2', function (req, res) {
    res.render('events/event_2', {title: "Event 2"});
});
// receive data for event 3
router.post('/event_2', function (req, res){
    var name = req.body.name;
    var email = req.body.email;
    var working_title = req.body.working_title;
    var company = req.body.company;

    event_2.find({email: email},{__v:0}, function(err, data) {
        if (err) throw err;
        if (data.length === 0) {

            // Validation
            req.checkBody('name', 'Navn er nødvendigt').notEmpty();
            req.checkBody('email', 'Email skal udfyldes').notEmpty();
            req.checkBody('email', 'Tjek venligst at Emailen er skrevet rigtigt').isEmail();
            req.checkBody('working_title', 'Udfyld venligst din arbejdstitel').notEmpty();
            req.checkBody('company', 'Udfyld venligst din arbejdsplads').notEmpty();
            var errors = req.validationErrors();
            if(errors){
                res.redirect('/event_2',{
                    errors:errors
                });
            } else {
                var newSignup = new event_3({
                    name: name,
                    email: email,
                    working_title: working_title,
                    company: company
                });
                newSignup.save(function(err){
                    if(err) throw err;
                });
                req.flash('success_msg', 'Du er nu tilmeldt');
                res.redirect('/event_2');
            }
        } else {
            req.flash('error_msg', 'Den indtastede email er allerde tilmeldt dette event');
            res.redirect('/event_2');
        }
    });
});
// check if mail is assigned to event
router.post('/event_2_check', function(req, res){
    var email = req.body.email;
    event_2.find({email: email},{__v:0}, function(err, data){
        if(err) throw err;
        if(data.length !== 0){
            if(data[0].email === email){
                req.flash('success_msg', 'Den indtastede email er tilmeldt dette event');
                res.redirect('/event_2');
            }
        } else if (data.length === 0){
            req.flash('error_msg','Den indtastede email er ikke tilmeldt dette event');
            res.redirect('/event_2');
        }
    });
});
// transmit database content
router.get('/event_2_json', function (req, res) {
    event_2.find({},{__v:0}, function(err, data){
        if(err) throw err;
        res.json(data);
    });
});


/** ********* **/
/**  EVENT 3  **/
/** ********* **/

// Get template for event 3
router.get('/event_3', function (req, res) {
    res.render('events/event_3', {title: "Event 3"});
});
// receive data for event 3
router.post('/event_3', function (req, res){
    var name = req.body.name;
    var email = req.body.email;
    var working_title = req.body.working_title;
    var company = req.body.company;

    event_3.find({email: email},{__v:0}, function(err, data) {
        if (err) throw err;
        if (data.length === 0) {

            // Validation
            req.checkBody('name', 'Navn er nødvendigt').notEmpty();
            req.checkBody('email', 'Email skal udfyldes').notEmpty();
            req.checkBody('email', 'Tjek venligst at Emailen er skrevet rigtigt').isEmail();
            req.checkBody('working_title', 'Udfyld venligst din arbejdstitel').notEmpty();
            req.checkBody('company', 'Udfyld venligst din arbejdsplads').notEmpty();
            var errors = req.validationErrors();
            if(errors){
                res.redirect('/event_3',{
                    errors:errors
                });
            } else {
                var newSignup = new event_3({
                    name: name,
                    email: email,
                    working_title: working_title,
                    company: company
                });
                newSignup.save(function(err){
                    if(err) throw err;
                });
                req.flash('success_msg', 'Du er nu tilmeldt');
                res.redirect('/event_3');
            }
        } else {
            req.flash('error_msg', 'Den indtastede email er allerde tilmeldt dette event');
            res.redirect('/event_3');
        }
    });
});
// check if mail is assigned to event
router.post('/event_3_check', function(req, res){
    var email = req.body.email;
    event_3.find({email: email},{__v:0}, function(err, data){
        if(err) throw err;
        if(data.length !== 0){
            if(data[0].email === email){
                req.flash('success_msg', 'Den indtastede email er tilmeldt dette event');
                res.redirect('/event_3');
            }
        } else if (data.length === 0){
            req.flash('error_msg','Den indtastede email er ikke tilmeldt dette event');
            res.redirect('/event_3');
        }
    });
});
// transmit database content
router.get('/event_3_json', function (req, res) {
    event_3.find({},{__v:0}, function(err, data){
        if(err) throw err;
        res.json(data);
    });
});


module.exports = router;