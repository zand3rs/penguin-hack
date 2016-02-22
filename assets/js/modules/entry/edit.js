// # Role update
Penguin.module("Entry.Update", function(Update, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var EntryUpdateViews = Penguin.module("Entry.Update.Views");

  this.startWithParent = false;
  Update.on("start", function() {
    new EntryUpdateViews.UpdateForm();
  });
});


Penguin.module("Entry.Update.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  var EntryEntities = Penguin.module("Entry.Entities");
  var CommonViews = Penguin.module("Common.Views");

  Views.UpdateForm = Marionette.ItemView.extend({
    el: "#update-entry-form",
    ui: {
      id: "input[name='id']",
      appId: "input[name='appId']",
      modelId: "input[name='modelId']",
      saveButton: ".save-button",
      deleteButton: ".delete-button"
    },
    events: {
      "submit": "submitForm",
      "click @ui.deleteButton": "deleteEntry"
    },
    showSuccess: function() {
      CommonViews.showGrowl("success", "Congratulations! Entry successfully updated!", function() {
        window.location.reload();
      });
    },
    showErrors: function(invalid) {
      CommonViews.showGrowl("error", "You have errors: " + invalid.join(", "));
    },
    submitForm: function(e) {
      var self = this;
      self.ui.saveButton.addClass("loading");

      var fields = self.$el.serialize();

      var update = self.model.updateEntry(fields);
      update.done(function(role){
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

    deleteEntry: function(e) {
      var self = this;
      self.ui.deleteButton.addClass("loading");

      var destroy = self.model.destroyEntry();
      destroy.done(function(role){
        CommonViews.showGrowl("success", "Congratulations! Role successfully deleted!", function() {
          window.location.href="/apps/" + self.model.get("appId") + "/models/" + self.model.get("modelId") + "/entries";
        });
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
      this.model = new EntryEntities.Entry({
        id: this.ui.id.val(),
        appId: this.ui.appId.val(),
        modelId: this.ui.modelId.val()
      });

    }

  });
});