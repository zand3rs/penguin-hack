/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {
    var criteria = {};
    var appId = req.param("app_id");

    if (!_.isEmpty(appId)) {
      criteria = {
        or: [
          {appId: appId}, 
          {public: true}
        ]
      }
    }

    Image.find()
      .where(criteria)
      .sort("updatedAt desc")
      .exec(function (err, imageList) {
        var payload = {};
        res.format({
          html: function() {
            if (err) {
              req.addFlash("error", "Error loading images / media");
            } else {
              payload.images = imageList;
            }
            return res.view(payload);
          },
          json: function() {
            payload = (err) ? err : imageList;
            if (err) {
              return res.apiError(payload);
            } else {
              return res.apiSuccess(payload);
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
          if (err) {
            req.addFlash("error", "Uploading Images");
          } else {
            payload.image = image;
          }
          return res.view(payload);
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

    Image.findOne({id: id}, function (err, image) {
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
    var params = _.omitBy({
      name: req.param("name"),
      description : req.param("description"),
      public: req.param("public"),
      appId: req.param("app_id")
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

    Image.destroy({id: id}, function(err, image) {
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
    })
  }  
	
};

