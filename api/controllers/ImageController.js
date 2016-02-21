/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {

    var page = parseInt(req.param("page")) || 1;
    var limit = sails.config.limits.pageLimit;
    var appId = req.param("app_id");

    var tasks = {
      page: function(next) {
        Image.count({appId: appId}, function(err, result) {
          if (err) {
            return next(err);
          }
          var page = _.ceil(result/limit);
          return next(null, page);
        });
      },      
      images: function (next) {
        var criteria = {
          or: [
            {appId: appId}, 
            {public: true}
          ]
        };

        Image.find()
          .where(criteria)
          .paginate({page: page, limit: limit})
          .exec(function(err, images) {
            if (err) {
              return next(err);
            }
            return next(null, images);
          });
      }
    };

    async.auto(tasks, function (err, result) {
      var images = result.images;
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
            req.addFlash("error", "Error loading images");
          } else {
            payload.images = images;
            payload.meta = meta;
          }

          res.view(payload);
        },
        json: function() {
          payload = (err) ? err : images;

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

  create: function (req, res) {

    var newImage = {
      name: req.param("name"),
      description : req.param("description"),
      public: req.param("public"),
      appId: req.param("app_id")
    };
    var uploader = new ImageHelper({
      imageField: "picture"
    });

    uploader.create(newImage, function (err, image) {
      var payload = {};      
      res.format({
        html: function() {
          return res.notFound();
        },
        json: function() {
          payload = (err) ? err : image;
          if (err) {
            return res.apiError(payload);
          } else {
            return res.apiSuccess(payload);
          }
        }
      });             
    })(req);
  },

  //--------------------------------------------------------------------------------------------------------------  
  edit: function (req, res) {
    var id = req.param("id");
    var appId = req.param("app_id");

    Image.findOne({id: id, appId: appId}, function (err, image) {
      var payload = {};
      res.format({
        html: function() {
          if (err) {
            req.addFlash("error", "Error loading image details");
          } else if (_.isEmpty(image)) {
            req.addFlash("error", "Image not found!");
          } else {
            payload.image = image;
          }
          return res.view(payload);
        },
        json: function() {
          return res.apiSuccess(image);
        }
      });      
    });
  },

  //--------------------------------------------------------------------------------------------------------------  
  update: function (req, res) {
    var id = req.param("id");
    var appId = req.param("app_id");
    var params = _.omitBy({
      name: req.param("name"),
      description : req.param("description"),
      public: req.param("public"),
      appId: appId
    }, _.isNil);

    Image.update({id: id}, params, function(err, image) {
      var payload = (err) ? err : image;
      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(image)) {
            res.apiError(new Exception.RecordNotFound("Image Not Found"));
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
    var appId = req.param("app_id");

    Image.destroy({id: id, appId: appId}, function(err, image) {
      var payload = (err) ? err : image;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(image)) {
            res.apiError(new Exception.RecordNotFound("Image Not Found"));
          } else {
            res.apiSuccess(payload);
          }
        }
      })
    });
  }  
	
};

