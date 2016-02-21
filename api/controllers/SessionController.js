/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	
  authenticate: function (req, res) {
    PenguinPassport.authenticate()(req, res);
  },

  //----------------------------------------------------------------
  authorize: function (req, res) {
    PenguinPassport.authorize(function (err, profile) {
      req.login(profile, function (err) {
        res.redirect("/");
      });
    })(req, res);
  },

  //----------------------------------------------------------------
  destroy: function (req, res) {
    req.logout();
    req.session.destroy();
  }
};

