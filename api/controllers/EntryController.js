/**
 * EntryController
 *
 */

module.exports = {

  index: function(req, res) {
    var appId = req.param("app_id");
    var modelId = req.param("model_id");
    var page = parseInt(req.param("page")) || 1;
    var limit = sails.config.limits.pageLimit;

    async.auto({
      page: function(next) {
        Entry.count({appId: appId, modelId: modelId}, function(err, result) {
          if (err) {
            return next(err);
          }

          var page = _.ceil(result/limit);
          return next(null, page);
        });
      },
      entries: function(next) {
        Entry.find()
        .where({appId: appId, modelId: modelId})
        .paginate({page: page, limit: limit})
        .exec(function(err, entries) {
          if (err) {
            return next(err);
          }

          return next(null, entries);
        });
      }
    }, function(err, result) {
      var entries = result.entries;
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
            payload.meta = meta;
          }

          res.view(payload);
        },
        json: function() {
          payload = (err) ? err : entries;

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
      modelId: req.param("model_id"),
      attrs: req.param("attrs"),
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
    var id = req.param("id");

    Entry.findOne({id: id}, function(err, entry) {
      var payload = {};

      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error loading entry");
          } else if (_.isEmpty(entry)) {
            req.addFlash("error", "Entry Not Found");
          } else {
            payload.entry = entry;
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
  }

};
