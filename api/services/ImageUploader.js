var fs = require("fs");
var path = require("path");
var cuttingboard = require("cuttingboard");

module.exports = ImageUploader;

function ImageUploader (options) {

  var _options = options || {};
  var _imageField = _options.imageField || sails.config.image.defaultField;
  var _maxBytes = _options.maxBytes || sails.config.image.maxBytes;
  var _uploadPath = _options.uploadPath || process.cwd() + sails.config.image.uploadPath;

  //-- cuttingboard
  var _board = new cuttingboard({
    folder: "static_files/uploads",
    baseUrl: "/uploads",
    name: _options.name
  });

  _board.style("cover", {size: "480x320", method: "resize"})
       .style("thumb", {size: "50x50", method: "resize"})
       .style("large", {size: "683x273", method: "resize"});

  Object.defineProperty(this, "board", {
    get: function() {
      return _board;
    }
  })

  Object.defineProperty(this, "imageField", {
    get: function () {
      return _imageField;
    }
  });

  Object.defineProperty(this, "maxBytes", {
    get: function () {
      return _maxBytes;
    }
  });

  Object.defineProperty(this, "uploadPath", {
    get: function () {
      return _uploadPath;
    }
  });

}


ImageUploader.prototype.create = function (params, done) {
  var self = this;

  return function (req) {

    async.auto({
      upload: function(next) {
        req.file(self.imageField).upload({
          maxBytes: self.maxBytes,
          dirname: self.uploadPath,
        }, function (err, uploadedFiles) {
          if (err) {
            return next(err);
          }

          var file = _.first(uploadedFiles) || {};

          return next(null, file.fd || "");
        });
      },
      process: ["upload", function(next, result) {
        var filePath = result.upload;
        self.process({src: filePath, name: params.name}, next);
      }]
    }, function(err, result) {
      if (err) {
        sails.log.error('ImageUploader.create:' + err);
        return done(err);
      }

      var images = result.process;

      if (!_.isEmpty(images) ) {
        params.uri = path.join(sails.config.image.uploadPath, images.original);
      }

      Image.create(params, function (err, newImage) {
        if (err) {
          sails.log.error(err);
          return done(err);
        }
        return done(null, newImage);
      });
    });
  }
}

ImageUploader.prototype.process = function (params, done) {
  var self = this;

  self.board.process({ src: params.src, name: params.name}, function(err, images) {
    if (err) {
      return done(err);
    }

    //-- delete photo after successful process
    fs.unlink(params.src, function (err) {
      if (err) {
        sails.log.error("ImageUploader#process: ", err);
        sails.log.error("ImageUploader#process: Unable to delete photo source: ", params.src);
      }
    });

    return done(null, images);
  });
}
