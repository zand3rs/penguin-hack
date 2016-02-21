// # App New
Penguin.module("App.Create", function(Create, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var AppCreateViews = Penguin.module("App.Create.Views");

  this.startWithParent = false;
  Create.on("start", function() {
    new AppCreateViews.AddNewForm();
  });
});


Penguin.module("App.Create.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  var AppEntities = Penguin.module("App.Entities");

  Views.AddNewForm = Marionette.ItemView.extend({
    el: "#add-new-app-form",
    ui: {
      name: "input[name='name']",
      description: "input[name='description']",
      saveButton: ".save-button"
    },
    events: {
      "submit": "submitForm"
    },
    showSuccess: function() {
      console.log("success!");
    },
    showErrors: function(invalid) {
      console.log("error", invalid);
    },
    submitForm: function(e) {
      var self = this;
      self.ui.saveButton.addClass("loading");

      var fields = {
        name: self.ui.name.val(),
        description: self.ui.description.val()
      };

      var create = self.model.createApp(fields);
      create.done(function(app){
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
      this.model = new AppEntities.App();
      this.bindUIElements();
    }

  });
});