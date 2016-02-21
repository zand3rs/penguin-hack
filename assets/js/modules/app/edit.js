// # App update
Penguin.module("App.Update", function(Update, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var AppUpdateViews = Penguin.module("App.Update.Views");

  this.startWithParent = false;
  Update.on("start", function() {
    new AppUpdateViews.UpdateForm();
  });
});


Penguin.module("App.Update.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  var AppEntities = Penguin.module("App.Entities");
  var CommonViews = Penguin.module("Common.Views");

  Views.UpdateForm = Marionette.ItemView.extend({
    el: "#update-app-form",
    ui: {
      id: "input[name='id']",
      name: "input[name='name']",
      description: "input[name='description']",
      saveButton: ".save-button",
      deleteButton: ".delete-button"
    },
    events: {
      "submit": "submitForm",
      "click @ui.deleteButton": "deleteApp"
    },
    showSuccess: function() {
      CommonViews.showGrowl("success", "Congratulations! App successfully updated!", function() {
        window.location.reload();
      });
    },
    showErrors: function(invalid) {
      CommonViews.showGrowl("error", "You have errors: " + invalid.join(", "));
    },
    submitForm: function(e) {
      var self = this;
      self.ui.saveButton.addClass("loading");

      var fields = {
        id: self.ui.id.val(),
        name: self.ui.name.val(),
        description: self.ui.description.val()
      };

      var update = self.model.updateApp(fields);
      update.done(function(app){
        self.showSuccess();
      });

      update.fail(function(error, meta) {
        if (error) {
          var invalid = meta.invalidAttributes || [];
          self.showErrors(invalid);
        }
      });

      update.always(function(){
        self.ui.saveButton.removeClass("loading");
      });

      e.preventDefault();
    },

    deleteApp: function(e) {
      var self = this;
      self.ui.deleteButton.addClass("loading");

      var destroy = self.model.destroyApp();
      destroy.done(function(app){
        self.showSuccess();
      });

      destroy.fail(function(error, meta) {
        if (error) {
          var invalid = meta.invalidAttributes || [];
          self.showErrors(invalid);
        }
      });

      destroy.always(function(){
        self.ui.deleteButton.removeClass("loading");
      });

      e.preventDefault();
    },

    initialize: function() {
      this.bindUIElements();
      this.model = new AppEntities.App({
        id: this.ui.id.val()
      });

    }

  });
});