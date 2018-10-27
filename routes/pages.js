// packages and config
var express = require('express');
var passport = require('passport');
var router = express.Router();
var path = require('path');

var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = function() {

    router.get('/', isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, '../public/feed.html'));
    });

    router.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    });

    router.get('/signup', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/register.html'));
    });

    router.get('/profile', isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, '../public/profile.html'));
    });

    router.post('/login',
        passport.authenticate('login', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

    router.post('/signup',
        passport.authenticate('signup', {
            successRedirect: '/',
            failureRedirect: '/signup'
        }));

    return router;
}