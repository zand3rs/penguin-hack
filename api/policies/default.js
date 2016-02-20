/**
 * default policy
 *
 * @module :: Policy
 *
 */

module.exports = function(req, res, next) {

  //-- add layout option
  req.options.layout = {
    folder: "",
    file: ""
  };

  //-- layout helper
  res.useLayout = function(layout) {
    req.options.layout.file = layout;
    res.locals.layout = req.options.layout.folder + req.options.layout.file;
  };

  //-- workaround for missing res.view on HEAD request (sails bug)
  var err = (!res.view) ? new Exception.InternalServerError() : null;

  res.locals._ = _;

  next(err);
};
