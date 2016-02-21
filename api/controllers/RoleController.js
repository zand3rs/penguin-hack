/**
 * RoleController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

  index: function(req, res) {
    var appId = req.param("app_id");
    var page = parseInt(req.param("page")) || 1;
    var limit = sails.config.limits.pageLimit;

    async.auto({
      page: function(next) {
        Role.count({appId: appId}, function(err, result) {
          if (err) {
            return next(err);
          }

          var page = _.ceil(result/limit);
          return next(null, page);
        });
      },
      roles: function(next) {
        Role.find()
        .where({appId: appId})
        .paginate({page: page, limit: limit})
        .exec(function(err, roles) {
          if (err) {
            return next(err);
          }

          return next(null, roles);
        });
      }
    }, function(err, result) {
      var roles = result.roles;
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
            req.addFlash("error", "Error loading roles");
          } else {
            payload.roles = roles;
            payload.meta = meta;
          }

          res.view(payload);
        },
        json: function() {
          payload = (err) ? err : roles;

          if (err) {
            return res.apiError(payload);
          } else {
            res.apiSuccess(payload, meta);
          }
        }
      });
    });
  },

  //--------------------------------------------------------------------------------------------------------------

  new: function(req, res) {
    res.format({
      html: function () {
        res.view()
      },
      json: function() {
        res.notFound()
      }
    });
  },

  //--------------------------------------------------------------------------------------------------------------

  create: function(req, res) {
    var params = _.omitBy({
      appId: req.param("app_id"),
      name: req.param("name"),
      description: req.param("description"),
      permission: req.param("permission"),
      manageApps: req.param("manageApps"),
      manageModels: req.param("manageModels"),
      manageMedia: req.param("manageMedia")
    }, _.isNil);

    Role.create(params, function(err, role) {
      var payload = (err) ? err : role;

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

  //--------------------------------------------------------------------------------------------------------------

  edit: function(req, res) {
    var id = req.param("id");

    Role.findOne({id: id}, function(err, role) {
      var payload = {};

      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error loading role");
          } else if (_.isEmpty(role)) {
            req.addFlash("error", "Role Not Found");
          } else {
            payload.role = role;
          }

          res.view(payload);
        },
        json: function() {
          res.notFound();
        }
      });
    });
  },

  //--------------------------------------------------------------------------------------------------------------

  update: function(req, res) {
    var id = req.param("id");

    var params = _.omitBy({
      appId: req.param("app_id"),
      name: req.param("name"),
      description: req.param("description"),
      permission: req.param("permission"),
      manageApps: req.param("manageApps"),
      manageModels: req.param("manageModels"),
      manageMedia: req.param("manageMedia")
    }, _.isNil);

    Role.update({id: id}, params, function(err, role) {
      var payload = (err) ? err : role;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(role)) {
            res.apiError(new Exception.RecordNotFound("Role Not Found"));
          } else {
            res.apiSuccess(payload);
          }
        }
      });
    });
  },

  //--------------------------------------------------------------------------------------------------------------

  destroy: function(req, res) {
    var id = req.param("id");

    Role.destroy({id: id}, function(err, role) {
      var payload = (err) ? err : role;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(role)) {
            res.apiError(new Exception.RecordNotFound("Role Not Found"));
          } else {
            res.apiSuccess(payload);
          }
        }
      })
    })
  }
};
