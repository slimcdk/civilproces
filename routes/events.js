var express = require('express');
var router = express.Router();

var event_1 = require('../models/event_1');
var event_2 = require('../models/event_2');
var event_3 = require('../models/event_3');


// Get event 1
router.get('/event_1', function (req, res) {
    res.render('events/event_1', {title: "Event 1"});
});
// receive data for event 1
router.post('/event_1', function (req, res){
    var name = req.body.name;
    var email = req.body.email;
    var working_title = req.body.working_title;
    var company = req.body.company;

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
        var newSignup = new event_1({
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
});




// Get event 2
router.get('/event_2', function (req, res) {
    res.render('events/event_2', {title: "Event 2"});
});
// receive data for event 2
router.post('/event_2', function (req, res){
    var name = req.body.name;
    var email = req.body.email;
    var working_title = req.body.working_title;
    var company = req.body.company;

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
        var newSignup = new event_2({
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
});




// Get event 3
router.get('/event_3', function (req, res) {
    res.render('events/event_3', {title: "Event 3"});
});
// receive data for event 3
router.post('/event_3', function (req, res){
    var name = req.body.name;
    var email = req.body.email;
    var working_title = req.body.working_title;
    var company = req.body.company;

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
});




module.exports = router;