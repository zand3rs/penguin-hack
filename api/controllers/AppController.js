/**
 * AppController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

  index: function(req, res) {
    async.auto({
      apps: function(next) {
        App.find({}, function(err, apps) {
          if (err) {
            return next(err);
          }

          return next(null, apps);
        });
      }
    }, function(err, result) {
      var apps = result.apps;
      var payload = {};

      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error loading apps");
          } else {
            payload.apps = apps;
          }

          res.view(payload);
        },
        json: function() {
          payload = (err) ? err : apps;

          if (err) {
            return res.apiError(payload);
          } else {
            res.apiSuccess(payload);
          }
        }
      });
    });
  },

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

  create: function(req, res) {
    var params = _.omitBy({
      name: req.param("name"),
      description: req.param("description")
    }, _.isNil);

    App.create(params, function(err, app) {
      var payload = (err) ? err : app;

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

    App.findOne({id: id}, function(err, app) {
      var payload = {};

      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error loading app");
          } else if (_.isEmpty(app)) {
            req.addFlash("error", "App Not Found");
          } else {
            payload.app = app;
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
      description: req.param("description")
    }, _.isNil);

    App.update({id: id}, params, function(err, app) {
      var payload = (err) ? err : app;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(app)) {
            res.apiError(new Exception.RecordNotFound("App Not Found"));
          } else {
            res.apiSuccess(payload);
          }
        }
      });
    });
  },

  destroy: function(req, res) {
    var id = req.param("id");

    App.destroy({id: id}, function(err, app) {
      var payload = (err) ? err : app;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(app)) {
            res.apiError(new Exception.RecordNotFound("App Not Found"));
          } else {
            res.apiSuccess(payload);
          }
        }
      })
    })
  }
};
