var express = require('express');
var router = express.Router();


// Get template for event
router.get('/event:id', function (req, res) {
    var id = req.params.id.substring(1, Infinity);
    var view_path = "events/event_" + id;

    res.render(view_path, {title: "Event " + id});
});


// receive data for event
router.post('/event:id', function (req, res){
    var id = req.params.id.substring(1, Infinity);
    var event = require('../models/event_' + id);

    var name = req.body.name;
    var email = req.body.email;
    var working_title = req.body.working_title;
    var company = req.body.company;

    event.find({email: email},{__v:0}, function(err, data) {
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
                        company: company
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
    var event = require('../models/event_' + id);
    var email = req.body.email;

    event.find({email: email},{__v:0}, function(err, data){
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
router.get('/event_json:id', function (req, res) {
    var id = req.params.id.substring(1, Infinity);
    var event = require('../models/event_' + id);

    if (id > 0 && id < 4){
        event.find({},{__v:0}, function(err, data){
            if(err) throw err;
            res.status(200).send(data);
        });
    } else {
        res.status(404).send(null);
    }
});


// ensure that user is authenticated
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.is_admin){
            return next();
        } else {
            req.flash('error_msg','Du har ikke administerende rettigheder til denne side');
            res.redirect('/');
        }
    } else {
        req.flash('error_msg','Du skal logge ind for at se denne side');
        res.redirect('/login');
    }
}

module.exports = router;