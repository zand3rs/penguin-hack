/**
 * Middleware: powered-by
 */

module.exports = function() {
  return function(req, res, next) {
    res.set("X-Powered-By", "Anbu");
    next();
  };
};
