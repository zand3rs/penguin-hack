/**
 * UserController
 *
 */

module.exports = {

  index: function(req, res) {
    var page = parseInt(req.param("page")) || 1;
    var limit = sails.config.limits.pageLimit;
    var appId = req.param("app_id");

    var tasks = {
      page: function(next) {
        AppUser.count({appId: appId}, function(err, result) {
          if (err) {
            return next(err);
          }
          var page = _.ceil(result/limit);
          return next(null, page);
        });
      },
      appUsers: function (next) {
        AppUser.find({appId: appId})
        .paginate({page: page, limit: limit})
        .exec(function(err, appUsers) {
          if (err) {
            return next(err);
          }
          return next(null, appUsers);
        });        
      },
      roles: ["appUsers", function (next, result) {
        var appUsers = result.appUsers;
        var roleIds = _.map(appUsers, "roleId");
        Role.find({id: roleIds}, next);
      }],
      users: ["appUsers", function (next, result) {
        var users = result.appUsers;
        var userIds = _.map(users, "userId");
        User.find({id: userIds}, next);
      }]
    };

    async.auto(tasks, function (err, result) {
      var _appUsers = result.appUsers;
      var _roles = result.roles;
      var _users = result.users;
      var totalPage = result.page;
      var payload = {};

      var appUsers = [];

      _.each(_appUsers, function (appUser) {
        appUser.role = _.find(_roles, {id: appUser.roleId});
        appUser.user = _.find(_users, {id: appUser.userId});
        appUsers.push(appUser);
      });

      var meta = {
        currentPage: page,
        totalPage: totalPage
      };
      if (_.gt(page, 1)) {
        meta.previousPage = page - 1;
      }

      if (_.lt(page, totalPage)) {
        meta.nextPage = page + 1;
      }      

      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error loading App Uses");
          } else {
            payload.appUsers = appUsers;
            payload.meta = meta;
          }
          res.view(payload);
        },
        json: function() {
          payload = (err) ? err : appUsers;

          if (err) {
            return res.apiError(payload);
          } else {
            res.apiSuccess(payload, meta);
          }
        }
      });      
    });
  },

  //----------------------------------------------------------------------------

  new: function(req, res) {

    var appId = req.param("app_id");

    var tasks = {
      users: function (next) {
        User.find({}, next);
      },
      roles: function (next) {
        Role.find({appId: appId}, next);
      }
    };

    async.auto(tasks, function (err, result) {
      var payload = {};

      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error Loading User Lists");
          } else {
            payload = result;
          }
          return res.view(payload);
        },
        json: function() {
          return res.apiSuccess(payload);
        }        
      });
    });

  },

  //----------------------------------------------------------------------------

  create: function(req, res) {
    var params = _.omitBy({
      appId: req.param("app_id"),
      userId: req.param("user_id"),
      roleId: req.param("role_id")
    }, _.isNil);

    AppUser.create(params, function(err, appUser) {
      var payload = (err) ? err : appUser;
      res.format({
        html: function () {
          res.notFound();
        },
        json: function () {
          if (err) {
            return res.apiError(payload);
          } else {
            res.apiSuccess(payload);
          }
        }
      });
    });
  },

  //----------------------------------------------------------------------------

  edit: function(req, res) {
    var id = req.param("id");
    var appId = req.param("app_id");

    var tasks = {
      appUser: function (next) {
        AppUser.findOne({id: id, appId: appId}, next);
      },
      user: ["appUser", function (next, result) {
        var appUser = result.appUser || {};
        User.findOne({id: appUser.userId}, next);
      }],
      users: function (next) {
        User.find({}, next);
      },
      roles: function (next) {
        Role.find({appId: appId}, next);
      }
    };

    async.auto(tasks, function (err, result) {
      var payload = {};
      var appUser = result.appUser || {};
      var roles = result.roles || [];
      var users = result.users || [];
      appUser.user = result.user || {};

      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error loading app user details");
          } else if (_.isEmpty(appUser)) {
            req.addFlash("error", "Application user not found!");
          } else {
            payload.appUser = appUser;
            payload.roles = roles;
            payload.users = users;
          }

          return res.view(payload);
        },
        json: function() {
          return res.apiSuccess(appUser);
        }
      });   
    });
  },

  //----------------------------------------------------------------------------

  update: function(req, res) {
    var id = req.param("id");
    var params = _.omitBy({
      appId: req.param("app_id"),
      userId: req.param("user_id"),
      roleId: req.param("role_id")
    }, _.isNil);

    AppUser.update({id: id}, params, function(err, appUser) {
      var payload = (err) ? err : appUser;
      res.format({
        html: function () {
          res.notFound();
        },
        json: function () {
          if (err) {
            return res.apiError(payload);
          } else {
            res.apiSuccess(payload);
          }
        }
      });
    });
  },

  //----------------------------------------------------------------------------

  destroy: function(req, res) {
    var id = req.param("id");
    var appId = req.param("app_id");

    AppUser.destroy({id: id, appId: appId}, function(err, appUser) {
      var payload = (err) ? err : appUser;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(appUser)) {
            res.apiError(new Exception.RecordNotFound("Application User Not Found"));
          } else {
            res.apiSuccess(payload);
          }
        }
      })
    });
  },

  //----------------------------------------------------------------------------

  search: function(req, res) {
    var keyword = req.param("keyword");
    var criteria = {
      or: [
        { displayName: {startsWith: keyword} },
        { lastName: {startsWith:  keyword} },
        { firstName: {startsWith:  keyword}}
      ]
    };

    User.find(criteria, function (err, foundUsers) {
      var payload = (err) ? err : foundUsers;
      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            return res.apiError(payload);
          } else {
            return res.apiSuccess(payload);
          }
        }
      });
    });

  }

};
