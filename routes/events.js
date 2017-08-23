var express = require('express');
var router = express.Router();
var fs = require('fs');
var gf = require('./global_functions.js');
var event = require('../models/event.js');
var views_path = "./views/events";


// Get template for event
router.get('/event:id', function (req, res) {
    var id = req.params.id.substring(1, Infinity);

    fs.readdir(views_path, function(err, data) {
        if (id > 0 && id <= data.length){
            var view_path = "events/event_" + id;
            res.render(view_path);
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
    var working_title = req.body.working_title;
    var company = req.body.company;

    event.find({email: email, event_id: id},{__v:0}, function(err, data) {
        if (err) throw err;
        if (data.length === 0) {

            // Validation
            req.checkBody('name', 'Navn er nødvendigt').notEmpty();
            req.checkBody('email', 'Email skal udfyldes').notEmpty();
            req.checkBody('email', 'Tjek venligst at Emailen er skrevet rigtigt').isEmail();
            req.checkBody('working_title', 'Udfyld venligst din arbejdstitel').notEmpty();
            req.checkBody('company', 'Udfyld venligst din arbejdsplads').notEmpty();

            req.getValidationResult().then(function(result) {
                if (!result.isEmpty()) {
                    req.flash('error_msg', 'Der opsted et problem med valideringen af de indtastede oplysninger. Tjek venligst at E-mailen er indtastet korrekt');
                    res.redirect('/event:' + id);
                } else {
                    var newSignup = new event({
                        name: name,
                        email: email,
                        working_title: working_title,
                        company: company,
                        event_id: id
                    });

                    newSignup.save(function(err){
                        if(err) throw err;
                        req.flash('success_msg', 'Du er nu tilmeldt');
                        res.redirect('/event:' + id);
                    });
                }
            });
        } else {
            req.flash('error_msg', 'Den indtastede email er allerde tilmeldt dette event');
            res.redirect('/event:' + id);
        }
    });
});


// check if mail is assigned to event
router.post('/check_signup:id', function(req, res){
    var id = req.params.id.substring(1, Infinity);
    var email = req.body.email;

    event.find({event_id: id, email: email},{__v:0}, function(err, data){
        if(err) throw err;
        if(data.length !== 0){
            if(data[0].email === email){
                req.flash('success_msg', 'Den indtastede email er allerede tilmeldt dette event');
                res.redirect('/event:' + id);
            }
        } else if (data.length === 0){
            req.flash('error_msg','Den indtastede email er ikke tilmeldt dette event');
            res.redirect('/event:' + id);
        }
    });
});


// transmit database content
router.get('/data:id', function (req, res) {
    var id = req.params.id.substring(1, Infinity);
    fs.readdir(views_path, function(err, data) {
        if (id === 'length'){
            res.status(200).send({length: data.length});
        } else if (id > 0 && id <= data.length){
            event.find({event_id: id},{__v:0, _id:0}, function(err, data){
                if(err) throw err;
                res.status(200).send(data);
            });
        } else {
            res.status(404).send(null);
        }
    });
});


// delete content from database
router.post('/delete:id', function (req, res) {
    var id = req.params.id.substring(1, Infinity);
    event.remove({event_id: id}, function(err){
        if (!err){
            req.flash('success_msg', 'Listen er nu slettet');
            res.redirect('/admin');
        } else {
            req.flash('error_msg', 'Der opstod en fejl under sletningen');
            res.redirect('/admin');
        }
    });
});


module.exports = router;