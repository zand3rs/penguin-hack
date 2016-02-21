/**
 * ModelController
 *
 */

module.exports = {

  index: function(req, res) {
    var appId = req.param("app_id");
    var page = parseInt(req.param("page")) || 1;
    var limit = sails.config.limits.pageLimit;

    async.auto({
      page: function(next) {
        Model.count({}, function(err, result) {
          if (err) {
            return next(err);
          }

          var page = _.ceil(result/limit);
          return next(null, page);
        });
      },
      models: function(next) {
        Model.find()
        .where({appId: appId})
        .paginate({page: page, limit: limit})
        .exec(function(err, model) {
          if (err) {
            return next(err);
          }

          return next(null, models);
        });
      }
    }, function(err, result) {
      var apps = result.models;
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
            req.addFlash("error", "Error loading models");
          } else {
            payload.models = models;
            payload.meta = meta;
          }

          res.view(payload);
        },
        json: function() {
          payload = (err) ? err : models;

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
      name: req.param("name"),
      attrs: req.param("attrs")
    }, _.isNil);

    Model.create(params, function(err, model) {
      var payload = (err) ? err : model;

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

    Model.findOne({id: id}, function(err, model) {
      var payload = {};

      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error loading model");
          } else if (_.isEmpty(model)) {
            req.addFlash("error", "Model Not Found");
          } else {
            payload.model = model;
          }

          res.view(payload);
        },
        json: function() {
          res.notFound();
        }
      });
    });
  },

  //----------------------------------------------------------------------------

  update: function(req, res) {
    var id = req.param("id");

    var params = _.omitBy({
      appId: req.param("app_id"),
      name: req.param("name"),
      attrs: req.param("attrs")
    }, _.isNil);

    Model.update({id: id}, params, function(err, model) {
      var payload = (err) ? err :  model;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(model)) {
            res.apiError(new Exception.RecordNotFound("Model Not Found"));
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

    Model.destroy({id: id}, function(err, model) {
      var payload = (err) ? err : model;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(model)) {
            res.apiError(new Exception.RecordNotFound("Model Not Found"));
          } else {
            res.apiSuccess(payload);
          }
        }
      })
    })
  }

};
