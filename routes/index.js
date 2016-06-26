var express = require('express');
var router = express.Router();
var auth = require('../auth');

/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('index', { user: request.user});
});

// get login page
router.get('/login', function(request, response, next){
  response.render('login', {user: request.user});
});
// GET route for when you click on login - passport authenticates through google
router.get('/auth/google',
 auth.passport.authenticate('google', { scope: ['openid email profile'] }));

 // If successful auth - redirects to home page, if not - redirects to /login
router.get('/auth/google/callback',
 auth.passport.authenticate('google', {
   failureRedirect: '/login'
 }),
 function(request, response) {
   // Authenticated successfully
   response.redirect('/');
 });
// get logout
router.get('/logout', function(request, response, next){
  request.logout();
  response.redirect('/');
});
// route middleware to insure user is authenticated
// you will need to use this middleware for any page you need to have permisions to see
function ensureAuthenticated(request, response, next){
  if(request.isAuthenticated()){
    return next();
  }
  response.redirect('/login');
}

module.exports = router;
