/**
 * RoleController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

  index: function(req, res) {
    async.auto({
      roles: function(next) {
        Role.find({}, function(err, roles) {
          if (err) {
            return next(err);
          }

          return next(null, roles);
        });
      }
    }, function(err, result) {
      var roles = result.roles;
      var payload = {};

      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error loading roles");
          } else {
            payload.roles = roles;
          }

          res.view(payload);
        },
        json: function() {
          payload = (err) ? err : roles;

          if (err) {
            return res.apiError(payload);
          } else {
            res.apiSuccess(payload);
          }
        }
      });
    });
  },

  create: function(req, res) {
    var params = _.omitBy({
      name: req.param("name"),
      description: req.param("description"),
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

  update: function(req, res) {
    var id = req.param("id");

    var params = _.omitBy({
      name: req.param("name"),
      description: req.param("description"),
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
