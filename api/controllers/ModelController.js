/**
 * ModelController
 *
 */

module.exports = {

  index: function(req, res) {
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
    res.ok();
  },

  //----------------------------------------------------------------------------

  edit: function(req, res) {
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

  update: function(req, res) {
    res.ok();
  },

  //----------------------------------------------------------------------------

  destroy: function(req, res) {
    res.ok();
  }

};
