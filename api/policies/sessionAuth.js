/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  if (req.isAuthenticated()) {
    //-- current app alias
    req.currentApp = req.session.currentApp || {};
    return next();
  } else {
    return res.redirect("/login");  
  }

};
