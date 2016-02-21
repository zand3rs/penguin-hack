/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

  index: function(req, res) {
    res.view();
  },

  login: function(req, res) {
    //check if user is already logged-in
    if (req.isAuthenticated()) { 
      return res.redirect("/");
    }   
    
    return res.view();
  }
};
