var path = require("path");
module.exports = ImageHelper;


function ImageHelper (options) {

  var _options = options || {};
  var _imageField = _options.imageField || sails.config.image.defaultField;
  var _maxBytes = _options.maxBytes || sails.config.image.maxBytes;
  var _uploadPath = _options.uploadPath || process.cwd() + sails.config.image.uploadPath

  Object.defineProperty(this, 'imageField', {
    get: function () {
      return _imageField;
    }
  });

  Object.defineProperty(this, 'maxBytes', {
    get: function () {
      return _maxBytes;
    }
  });

  Object.defineProperty(this, 'uploadPath', {
    get: function () {
      return _uploadPath;
    }
  });

}


ImageHelper.prototype.create = function (params, next) {
  var self = this;

  return function (req) {
    
    req.file(self.imageField).upload({
      maxBytes: self.maxBytes,
      dirname: self.uploadPath,
      // saveAs: function (__newFileStream,cb) { console.log(__newFileStream); cb(null, 'theUploadedFile.foo'); }  //experiment on this!!!
    }, function (err, uploadedFiles) {
      if (err) {
        sails.log.error('ImageHelper.create:' + err);
        return next(err);
      }

      var filename = path.basename( _.first(uploadedFiles).fd);
      params.uri = sails.config.image.uploadPath + "/" + filename;
      Image.create(params, function (err, newImage) {
        if (err) {
          sails.log.error(err);
          return next(err);
        }
        return next(null, newImage);
      });
    });
  }
}


ImageHelper.prototype.saveImage = function (params, cb) {

  console.log("saveImage");
  console.log(params);
  cb();
}