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
      }
    };

    async.auto(tasks, function (err, result) {
      var appUsers = result.appUsers;
      var totalPage = result.page;
      var payload = {};

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
    res.format({
      html: function() {
        res.view();
      },
      json: function() {
        res.notFound();
      }
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
    res.format({
      html: function() {
        res.view();
      },
      json: function() {
        res.notFound();
      }
    });
  },

  //----------------------------------------------------------------------------

  update: function(req, res) {
    res.ok();
  },

  //----------------------------------------------------------------------------

  destroy: function(req, res) {
    res.ok();
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
