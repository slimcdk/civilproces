/**
 * Created by Christian Skjerning on 8/22/2017.
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');


// ensure that user is authenticated
module.exports.ensureAuthenticated = function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.is_admin){
            console.log("admin entered site");
            return next();
        } else {
            req.flash('error_msg','Du har ikke administerende rettigheder til denne side');
            res.redirect('/');
        }
    } else {
        req.flash('error_msg','Du skal logge ind for at se denne side');
        res.redirect('/login');
    }
};


module.exports.idExists = function idExists (id){
    fs.readdir("./views/events", function(err, data) {
        return data.length;
    });
};