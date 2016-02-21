/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {
    var page = parseInt(req.param("page")) || 1;
    var limit = sails.config.limits.pageLimit;

    var tasks = {
      page: function(next) {
        Category.count({}, function(err, result) {
          if (err) {
            return next(err);
          }
          var page = _.ceil(result/limit);
          return next(null, page);
        });
      },      
      categories: function (next) {
        Category.find()
        .paginate({page: page, limit: limit})
        .exec(function(err, categories) {
          if (err) {
            return next(err);
          }
          return next(null, categories);
        });        
      }
    };

    async.auto(tasks, function (err, result) {
      var categories = result.categories;
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
            req.addFlash("error", "Error loading categories");
          } else {
            payload.categories = categories;
            payload.meta = meta;
          }

          res.view(payload);
        },
        json: function() {
          payload = (err) ? err : categories;

          if (err) {
            return res.apiError(payload);
          } else {
            res.apiSuccess(payload, meta);
          }
        }
      });      
    });
  },

  new: function (req, res) {
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
  create: function (req, res) {
    var params = _.omitBy({
      appId: req.param("app_id"),
      crumbs: req.param("crumbs")
    }, _.isNil);

    Category.create(params, function(err, category) {
      var payload = (err) ? err : category;
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
  edit: function (req, res) {
    var id = req.param("id");

    Category.findOne({id: id}, function (err, category) {
      var payload = {};
      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error loading category details");
          } else if (_.isEmpty(category)) {
            req.addFlash("error", "Category not found!");
          } else {
            payload.category = category;
          }
          return res.view(payload);
        },
        json: function() {
          return res.apiSuccess(category);
        }
      });      
    });
  },

  //--------------------------------------------------------------------------------------------------------------  
  update: function (req, res) {
    var id = req.param("id");
    var params = _.omitBy({
      appId: req.param("app_id"),
      crumbs : req.param("crumbs")
    }, _.isNil);

    Category.update({id: id}, params, function(err, category) {
      var payload = (err) ? err : category;
      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(category)) {
            res.apiError(new Exception.RecordNotFound("Category Not Found"));
          } else {
            res.apiSuccess(payload);
          }
        }
      });
    });    
  },

  destroy: function (req, res) {
    var id = req.param("id");

    Category.destroy({id: id}, function(err, category) {
      var payload = (err) ? err : category;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(category)) {
            res.apiError(new Exception.RecordNotFound("Category Not Found"));
          } else {
            res.apiSuccess(payload);
          }
        }
      })
    });
  }
	
};

