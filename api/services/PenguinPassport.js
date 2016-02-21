var passport = require("passport");
var GooglePassport = require("passport-google-oauth").OAuth2Strategy;

module.exports = {

  //----------------------------------------------------------------------------

  _serializeUser: function(user, done) {
    var userId = _.isObject(user) ? user.id : user;
    done(null, userId);
  },

  //----------------------------------------------------------------------------

  _deserializeUser: function(user, done) {
    var userId = _.isObject(user) ? user.id : user;
    User.findOne({id: userId}, done);
  },  

  //----------------------------------------------------------------------------

  _authenticate: function(params, done) {
    var self = this;
    var token = params.token;
    var user = params.user;
    done(null, user);

  },  

    //----------------------------------------------------------------------------

  _saveUser: function(user, done) {
    var self = this;
    var newUser = {
      authId: user.id,
      authType: "google",
      displayName: user.displayName,
      firstName: user.name.givenName,
      lastName: user.name.familyName,
      email: _.first(user.emails).value,
      picture: _.first(user.photos).value
    };    
    User.findOrCreate({authId: user.id}, newUser, done);
  },  



  //----------------------------------------------------------------------------

  initialize: function(options) {
    sails.log.info("Penguin Passport Initialize");
    var self = this;

    passport.serializeUser(self._serializeUser);
    passport.deserializeUser(self._deserializeUser);

    passport.use(new GooglePassport({
        clientID:     sails.config.google.key,
        clientSecret: sails.config.google.secret,
        callbackURL: sails.config.google.callbackUrl,
        passReqToCallback   : true
      }, function(req, token, tokenSecret, user, next) {
        var params = {
          accessToken: token,
          user: user
        }
        self._authenticate(params, next);
      }
    ));
    return self;
  },

  //----------------------------------------------------------------------------

  authenticate: function(done) {
    var self = this;
    return function (req, res) {
      // passport.authenticate('google', {  scope:"profile email openid" })(req, res);
      var scope = ["https://www.googleapis.com/auth/plus.login", "https://www.googleapis.com/auth/plus.me", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"];
      passport.authenticate('google', {  scope: scope })(req, res);
    }
  },

  //----------------------------------------------------------------------------

  authorize: function(done) {
    var self = this;
    return function(req, res) {
      var tasks = {
        authenticate: function (next) {
          passport.authenticate('google', {}, function (err, user) {
            next(err, user);
          })(req, res);
        },
        user: ["authenticate",function (next, result) {
          var user = result.authenticate;
          self._saveUser(user, next);
        }]
      };

      async.auto(tasks, function (err, result) {
        var user = result.user;
        done(err, user)
      });
    }
  },

}.initialize();
