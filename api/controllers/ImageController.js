/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {
    res.ok();
  },

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
      console.log(err);
      console.log(image);
    })(req);
  }
	
};

