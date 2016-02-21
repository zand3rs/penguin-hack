// # Role update
Penguin.module("Role.Update", function(Update, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var RoleUpdateViews = Penguin.module("Role.Update.Views");

  this.startWithParent = false;
  Update.on("start", function() {
    new RoleUpdateViews.UpdateForm();
  });
});


Penguin.module("Role.Update.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  var RoleEntities = Penguin.module("Role.Entities");
  var CommonViews = Penguin.module("Common.Views");

  Views.UpdateForm = Marionette.ItemView.extend({
    el: "#update-role-form",
    ui: {
      id: "input[name='id']",
      name: "input[name='name']",
      description: "input[name='description']",
      appId: "input[name='appId']",
      manageRoles: "input[name='manageApps']",
      manageModels: "input[name='manageModels']",
      manageImages: "input[name='manageImages']",
      permission: ".roles input[type='checkbox']",
      saveButton: ".save-button",
      deleteButton: ".delete-button"
    },
    events: {
      "submit": "submitForm",
      "click @ui.deleteButton": "deleteRole"
    },
    showSuccess: function() {
      CommonViews.showGrowl("success", "Congratulations! Role successfully updated!", function() {
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

      var update = self.model.updateRole(fields);
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

    deleteRole: function(e) {
      var self = this;
      self.ui.deleteButton.addClass("loading");

      var destroy = self.model.destroyRole();
      destroy.done(function(role){
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
      this.model = new RoleEntities.Role({
        id: this.ui.id.val(),
        appId: this.ui.appId.val()
      });

    }

  });
});