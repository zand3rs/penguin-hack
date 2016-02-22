/**
 * EntryController
 *
 */

module.exports = {

  index: function(req, res) {
    var appId = req.param("app_id");
    Model.find()
      .where({appId: appId})
      .exec(function (err, models) {
        if (err) {
          req.addFlash("error", "Error loading entries");
        }
        if (_.isEmpty(models)) {
          return res.view();
        } else {
          var model = _.first(models) || {};
          return res.redirect("/apps/" + appId + "/models/" + model.id + "/" + "entries");
        }
      });
  },

  //----------------------------------------------------------------------------

  new: function(req, res) {

    var modelId = req.param("model_id");
    var appId = req.param("app_id");

    Model.find({appId: appId})
      .exec(function (err, models) {
        var payload = {};
        res.format({
          html: function() {
            payload.models = models;
            payload.model = _.find(models, {id: modelId});
            res.view(payload);
          },
          json: function() {
            res.notFound();
          }
        });
      });

  },

  //----------------------------------------------------------------------------

  create: function(req, res) {
    var params = _.omitBy({
      appId: req.param("app_id"),
      modelId: req.param("model_id"),
      attrs: req.param("attrs"),
      status: req.param("status"),
      categories: req.param("categories"),
      tags: req.param("tags")
    }, _.isNil);

    Entry.create(params, function(err, entry) {
      var payload = (err) ? err : entry;

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
    var appId = req.param("app_id");
    var modelId = req.param("model_id");
    var id = req.param("id");

    var tasks = {
      models: function (next) {
        Model.find({appId: appId}, next);
      },
      entry: function (next) {
        Entry.findOne({id: id}, next);
      }
    };

    async.auto(tasks, function (err, result) {
      var entry = result.entry || {};
      var models = result.models || [];
      var payload = {};
      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error loading entry");
          } else if (_.isEmpty(entry)) {
            req.addFlash("error", "Entry Not Found");
          } else {
            payload.entry = entry;
            payload.models = models;
            payload.model = _.find(models, {id: modelId});
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
      modelId: req.param("model_id"),
      attrs: req.param("attrs"),
      status: req.param("status"),
      categories: req.param("categories"),
      tags: req.param("tags")
    }, _.isNil);

    Entry.update({id: id}, params, function(err, entry) {
      var payload = (err) ? err :  entry;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(entry)) {
            res.apiError(new Exception.RecordNotFound("Entry Not Found"));
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

    Entry.destroy({id: id}, function(err, entry) {
      var payload = (err) ? err : entry;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(entry)) {
            res.apiError(new Exception.RecordNotFound("Entry Not Found"));
          } else {
            res.apiSuccess(payload);
          }
        }
      })
    })
  },

  //----------------------------------------------------------------------------

  show: function(req, res) {
    var page = parseInt(req.param("page")) || 1;
    var limit = sails.config.limits.pageLimit;
    var appId = req.param("app_id");
    var modelId = req.param("model_id");
    var id = req.param("id");

    var tasks = {

      models: function (next) {
        Model.find({appId: appId}, next);
      },
      page: function(next) {
        Entry.count({modelId: modelId, appId: appId}, function(err, result) {
          if (err) {
            return next(err);
          }
          var page = _.ceil(result/limit);
          return next(null, page);
        });
      },
      entries: function (next) {
        Entry.find()
          .where({modelId: modelId, appId: appId})
          .paginate({page: page, limit: limit})
          .exec(next);
      }
    };

    async.auto(tasks, function (err, result) {
      var entries = result.entries || {};
      var models = result.models || [];
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
            req.addFlash("error", "Error loading entries");
          } else {
            payload.entries = entries;
            payload.models = models;
            payload.meta = meta;
          }
          res.view(payload);
        },
        json: function() {
          res.notFound();
        }
      });
    });

  }

};
