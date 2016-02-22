/**
 * AppController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

  index: function(req, res) {
    var page = parseInt(req.param("page")) || 1;
    var limit = sails.config.limits.pageLimit;

    async.auto({
      page: function(next) {
        App.count({}, function(err, result) {
          if (err) {
            return next(err);
          }

          var page = _.ceil(result/limit);
          return next(null, page);
        });
      },
      apps: function(next) {
        App.find()
        .paginate({page: page, limit: limit})
        .exec(function(err, apps) {
          if (err) {
            return next(err);
          }

          return next(null, apps);
        });
      }
    }, function(err, result) {
      var apps = result.apps;
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
            req.addFlash("error", "Error loading apps");
          } else {
            payload.apps = apps;
            payload.meta = meta;
          }

          res.view(payload);
        },
        json: function() {
          payload = (err) ? err : apps;

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

  //--------------------------------------------------------------------------------------------------------------

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

  //--------------------------------------------------------------------------------------------------------------

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

  //-----------------------------------------------------------------------------

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
  },

  //-----------------------------------------------------------------------------

  show: function(req, res) {
    var id = req.param("id");

    App.findOne({id: id}, function(err, app) {
      if (err) {
        req.addFlash("error", "Unable to load app!");
      }
      if (app) {
        req.session.currentApp = app;
      }
      return res.redirect("/");
    });
  }

};
