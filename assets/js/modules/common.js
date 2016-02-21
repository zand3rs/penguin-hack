// # Common
Penguin.module("Common", function(Common, Penguin, Backbone, Marionette, $, _) {

  /* Start
    --------------------------------------------------------------------------*/
  this.startWithParent = false;
  Common.on("start", function() {
    new Common.Views.SiteNav();
  });
});


// # Views
Penguin.module("Common.Views", function(Views, Penguin, Backbone, Marionette, $, _) {

  var Helpers = Penguin.module("Helpers");

  /* Marionette Views
    --------------------------------------------------------------------------*/
  // ### Site Nav
  Views.SiteNav = Marionette.ItemView.extend({
    el: "#site-nav",
    ui: {
      drawerLink: "#drawer-menu-link",
      drawer: "#drawer",
      drawerOverlay: ".drawer-overlay"
    },

    events: {
      "click @ui.drawerLink": "toggleDrawer",
      "click @ui.drawerOverlay": "hideDrawer"
    },

    toggleDrawer: function(e) {
      this.ui.drawer.toggleClass("expanded");

      if (this.ui.drawer.hasClass("expanded")) {
        Helpers.disableScrolling();
      } else {
        Helpers.enableScrolling();
      }

      e.preventDefault();
    },

    hideDrawer: function(e) {
      this.ui.drawer.removeClass("expanded");
      Helpers.enableScrolling();
      e.preventDefault();
    },

    initialize: function() {
      this.bindUIElements();
    }
  });
});