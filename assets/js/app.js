// # Template Settings
// Use `<? ?>` to avoid conflict with ejs
_.templateSettings = {
  interpolate: /\<\?=(.+?)\?\>/g,
  escape: /\<\?-(.+?)\?\>/g,
  evaluate: /\<\?(.+?)\?\>/g
};

// # AJAX Setup
// Always set `Accept` to `application/json`
$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader("Accept", "application/json");
  }
});

// # Main App
var Penguin = new Marionette.Application();

// # Dialog Region
// For showing modal views. Uses `jquery.modals.js`.
Marionette.Region.Dialog = Marionette.Region.extend({
  onShow: function(view) {
    var self = this;

    // Use the `close:popup` event to trigger hiding the modal.
    this.listenTo(Penguin.vent, "close:popup", function() {
      self.$el.trigger("hidePopUp");
    });

    this.$el.modal({
      afterClose: function() {
        self.closeDialog();
      }
    });

    this.$el.trigger("showPopUp");
  },

  // Teardown
  closeDialog: function() {
    this.stopListening();
    this.empty();
  }
});


Penguin.addRegions({
  dialogRegion: Marionette.Region.Dialog.extend({
    el: "#dialog-region"
  }),
  growlRegion: "#growl-region"
});