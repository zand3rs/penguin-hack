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
  },

  //----------------------------------------------------------------------------

  show: function(req, res) {
    var modelId = req.param("model_id");
    var appId = req.param("app_id");

    Entry.find()
      .where({modelId: modelId, appId: appId})
      .exec(function (err, entries) {
        var payload = {};
        res.format({
          html: function() {
            if (err) {
              req.addFlash("error", "Error loading entries");
            } else {
              payload.entries = entries;
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
