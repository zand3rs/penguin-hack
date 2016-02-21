// # Role New
Penguin.module("Role.Create", function(Create, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var RoleCreateViews = Penguin.module("Role.Create.Views");

  this.startWithParent = false;
  Create.on("start", function() {
    new RoleCreateViews.AddNewForm();
  });
});


Penguin.module("Role.Create.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  var RoleEntities = Penguin.module("Role.Entities");
  var CommonViews = Penguin.module("Common.Views");

  Views.AddNewForm = Marionette.ItemView.extend({
    el: "#add-new-role-form",
    ui: {
      name: "input[name='name']",
      description: "input[name='description']",
      appId: "input[name='appId']",
      manageApps: "input[name='manageApps']",
      manageModels: "input[name='manageModels']",
      manageImages: "input[name='manageImages']",
      permission: ".roles input[type='checkbox']",
      saveButton: ".save-button"
    },
    events: {
      "submit": "submitForm"
    },
    showSuccess: function() {
      var self = this;
      CommonViews.showGrowl("success", "Congratulations! Role successfully added!", function() {
        window.location.href="/apps/" + self.model.get("appId") + "/roles";
      });
    },
    showErrors: function(invalid) {
      CommonViews.showGrowl("error", "You have errors: " + invalid.join(", "));
    },
    submitForm: function(e) {
      var self = this;
      self.ui.saveButton.addClass("loading");

      var fields = {
        name: self.ui.name.val(),
        description: self.ui.description.val()
      };

      var create = self.model.createRole(fields);
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
      this.model = new RoleEntities.Role({
        appId: this.ui.appId.val()
      });

    }

  });
});