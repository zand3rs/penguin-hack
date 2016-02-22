// # User New
Penguin.module("User.Create", function(Create, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var UserCreateViews = Penguin.module("User.Create.Views");

  this.startWithParent = false;
  Create.on("start", function() {
    new UserCreateViews.AddNewForm();
  });
});


Penguin.module("User.Create.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  var UserEntities = Penguin.module("User.Entities");
  var CommonViews = Penguin.module("Common.Views");

  Views.AddNewForm = Marionette.ItemView.extend({
    el: "#add-new-user-form",
    ui: {
      id: "input[name='id']",
      role: "input[name='role']",
      saveButton: ".save-button"
    },
    events: {
      "submit": "submitForm"
    },
    showSuccess: function() {
      var self = this;
      CommonViews.showGrowl("success", "Congratulations! User successfully added!", function() {
        window.location.href="/apps/" + self.model.get("appId") + "/users";
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
        role: self.ui.role.val()
      };

      var create = self.model.createUser(fields);
      create.done(function(user){
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
      this.model = new UserEntities.User({
        appId: this.ui.appId.val()
      });

    }

  });
});