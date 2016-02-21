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
      drawerOverlay: ".drawer-overlay",
      userMenuLink: "#user-menu-link",
      userMenu: "#user-menu"
    },

    events: {
      "click @ui.drawerLink": "toggleDrawer",
      "click @ui.drawerOverlay": "hideDrawer",
      "click @ui.userMenuLink": "toggleUserMenu"
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

    toggleUserMenu: function(e) {
      this.ui.userMenu.toggleClass("expanded");
      e.preventDefault();
    },

    initialize: function() {
      this.bindUIElements();
    }
  });


  Views.showGrowl = function(type, message, callback) {
    var view = new Views.Growl({
      model: new Backbone.Model({
        type: type,
        message: message
      })
    }, {
      callback: callback
    });
    Penguin.growlRegion.show(view);
  };


  Views.Growl = Marionette.ItemView.extend({
    template: "#growl-template",
    ui: {
      closeButton: ".close-button"
    },
    events: {
      "click @ui.closeButton": "destroyGrowl"
    },
    destroyGrowl: function() {
      var self = this;
      self.$el.fadeOut(function() {
        Penguin.growlRegion.empty();
        if(self.callback) {
          self.callback();
        }
      });
    },
    initialize: function(model, options) {
      var self = this;
      console.log(options);

      if( _.isFunction(options.callback)) {
        self.callback = options.callback;
      }

      _.delay(function() {
        self.$el.fadeOut(function() {
          Penguin.growlRegion.empty();

          if(self.callback) {
            self.callback();
          }

        });
      }, 2000);
    }
  });

});