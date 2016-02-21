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
    async.auto({
      user: function(next) {
        User.findOne({id: userId}, next);
      },
      userApps: ["user", function(next, result) {
        var userId = _.get(result.user, "id");
        AppUser.find({userId: userId}, next);
      }],
      apps: ["userApps", function(next, result) {
        var appIds = _.map(result.userApps, "appId");
        App.find({id: appIds}, next);
      }],
      roles: ["userApps", function(next, result) {
        var roleIds = _.map(result.userApps, "roleId");
        Role.find({id: roleIds}, next);
      }]
    }, function(err, result) {
      var user = result.user || {};
      var apps = result.apps || [];
      var roles = result.roles || [];

      if (!err) {
        user.apps = apps;
        user.roles = roles;
      }
      done(err, user);
    });
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
