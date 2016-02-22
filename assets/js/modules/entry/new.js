// # Entry New
Penguin.module("Entry.Create", function(Create, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var EntryCreateViews = Penguin.module("Entry.Create.Views");

  this.startWithParent = false;
  Create.on("start", function() {
    new EntryCreateViews.AddNewForm();
  });
});


Penguin.module("Entry.Create.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  var EntryEntities = Penguin.module("Entry.Entities");
  var CommonViews = Penguin.module("Common.Views");

  Views.AddNewForm = Marionette.ItemView.extend({
    el: "#add-new-entry-form",
    ui: {
      appId: "input[name='appId']",
      modelId: "input[name='modelId']",
      saveButton: ".save-button"
    },
    events: {
      "submit": "submitForm"
    },
    showSuccess: function() {
      var self = this;
      CommonViews.showGrowl("success", "Congratulations! Entry successfully added!", function() {
        window.location.href="/apps/" + self.model.get("appId") + "/models/" + self.model.get("modelId") +"/entries";
      });
    },
    showErrors: function(invalid) {
      CommonViews.showGrowl("error", "You have errors: " + invalid.join(", "));
    },
    submitForm: function(e) {
      var self = this;
      self.ui.saveButton.addClass("loading");

      console.log("here");

      var fields = self.$el.serialize();

      var create = self.model.createEntry(fields);
      create.done(function(role){
        self.showSuccess();
      });

      create.fail(function(error, meta) {
        if (error) {
          var invalid = meta.invalidAttributes || [];
          self.showErrors(invalid);
        }
      });

      create.always(function(){
        self.ui.saveButton.removeClass("loading");
      });

      e.preventDefault();
    },

    initialize: function() {
      this.bindUIElements();
      this.model = new EntryEntities.Entry({
        appId: this.ui.appId.val(),
        modelId: this.ui.modelId.val()
      });
      console.log("here");
    }

  });
});