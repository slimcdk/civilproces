var express = require('express');
var router = express.Router();
var fs = require('fs');
var gf = require('./global_functions.js');
var event = require('../models/event.js');
var views_dir = "./views/events";


// Get template for event
router.get('/event:id', function (req, res) {
    var id = req.params.id.substring(1, Infinity);

    if (id.length === 1) {
        id = "0" + id;
    }

    fs.readdir(views_dir, function(err, data) {
        if (err) throw err;
        if (id > 0 && id <= data.length && id.length === 2){
            var view_path = "events/event_" + id;
            res.render(view_path);
        } else if (id === "length") {
            res.status(200).send({length: data.length});
        } else {
            res.status(404).render('layouts/error_404');
        }
    });
});


// receive data for event
router.post('/event:id', function (req, res){
    var id = req.params.id.substring(1, Infinity);
    var name = req.body.name;
    var email = req.body.email;
    var email_confirm = req.body.email_confirm;
    var working_title = req.body.working_title;
    var company = req.body.company;

    event.find({email: email, event_id: id},{__v:0}, function(err, data) {
        if (err) throw err;
        if (data.length === 0) {

            // Validation
            req.checkBody('name', 'Navn er nødvendigt!').notEmpty();
            req.checkBody('company', 'Udfyld venligst din arbejdsplads!').notEmpty();
            req.checkBody('working_title', 'Udfyld venligst din arbejdstitel!').notEmpty();
            req.checkBody('email', 'Email skal udfyldes!').notEmpty();
            req.checkBody('email', 'Tjek venligst at emailen er skrevet rigtigt!').isEmail();
            req.checkBody('email_confirm', 'Tjek venligst at de to emails er ens').isEmail().equals(email);

            req.getValidationResult().then(function(result) {
                if (!result.isEmpty()) {
                    req.flash('error_msg', 'Der opsted et problem med valideringen af de indtastede oplysninger. ' + result.array()[0].msg);
                    res.redirect('back');
                } else {
                    var newSignup = new event({
                        name: name,
                        email: email,
                        working_title: working_title,
                        company: company,
                        event_id: id,
                        signup_date: Date.now()
                    });

                    newSignup.save(function(err){
                        if(err) throw err;
                        req.flash('success_msg', 'Du er nu tilmeldt');
                        res.redirect('back');
                    });
                }
            });
        } else {
            req.flash('error_msg', 'Den indtastede email er allerde tilmeldt dette event');
            res.redirect('back');
        }
    });
});


// check if mail is assigned to event
router.post('/check_signup:id', function(req, res){
    var id = req.params.id.substring(1, Infinity);
    var email = req.body.email;

    req.checkBody('email', 'Indtast venligst en email').notEmpty();
    req.checkBody('email', 'Tjek venligst at emailen er indtastet korrekt!').isEmail();

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            req.flash('error_msg', 'Der opsted et problem med valideringen af de indtastede oplysninger. ' + result.array()[0].msg);
            res.redirect('back');
        } else {
            event.find({event_id: id, email: email}, function(err, data){
                if(err) throw err;
                if(data.length !== 0){
                    if(data[0].email === email){
                        req.flash('success_msg', 'Den indtastede email er tilmeldt dette event');
                        res.redirect('back');
                    }
                } else if (data.length === 0){
                    req.flash('error_msg','Den indtastede email er ikke tilmeldt dette event');
                    res.redirect('back');
                }
            });
        }
    });
});


// transmit database content
router.get('/data:id', function (req, res) {
    var id = req.params.id.substring(1, Infinity);

    fs.readdir(views_dir, function(err, data) {
        if (id === 'length'){
            res.status(200).send({length: data.length});

        } else if (id.substring(0, "part_length".length) === "part_length") {
            id = id.substring("part_length".length, Infinity);
            event.find({event_id: id},{__v:0}, function(err, data){
                res.status(200).send({"length": data.length});
            });

        } else if (id > 0 && id <= data.length){
            event.find({event_id: id},{__v:0}, function(err, data){
                if(err) throw err;
                res.status(200).send(data);
            });

        } else {
            res.status(404).send(null);
        }
    });
});


// delete whole event from database
router.post('/delete:id', gf.ensureAuthenticated, function (req, res) {
    var id = req.params.id.substring(1, Infinity);

    event.remove({event_id: id}, function(err){
        if (!err){
            req.flash('success_msg', 'Listen er nu slettet');
            res.redirect('back');
        } else {
            req.flash('error_msg', 'Der opstod en fejl under sletningen');
            res.redirect('back');
        }
    });
});


// delete user from database
router.post('/remove', gf.ensureAuthenticated, function (req, res) {
    var id = req.body.id;
    var participant = req.body.participant;

    event.remove({event_id: id, email: participant}, function(err){
        if (!err){
            req.flash('success_msg', 'Personen er nu afmeldt');
            res.redirect('back');
        } else {
            req.flash('error_msg', 'Der opstod en fejl under afmeldingen');
            res.redirect('back');
        }
    });
});


module.exports = router;