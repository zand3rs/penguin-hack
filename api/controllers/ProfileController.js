/**
 * ProfileController
 *
 */

module.exports = {

  show: function(req, res) {
    var payload = { user: req.user || {} };

    res.format({
      html: function() {
        res.view(payload);
      },
      json: function() {
        res.apiSuccess(payload);
      }
    });
  }

};
