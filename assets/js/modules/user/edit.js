// # User update
Penguin.module("User.Update", function(Update, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var UserUpdateViews = Penguin.module("User.Update.Views");

  this.startWithParent = false;
  Update.on("start", function() {
    new UserUpdateViews.UpdateForm();
  });
});


Penguin.module("User.Update.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  var UserEntities = Penguin.module("User.Entities");
  var CommonViews = Penguin.module("Common.Views");

  Views.UpdateForm = Marionette.ItemView.extend({
    el: "#update-user-form",
    ui: {
      id: "input[name='id']",
      name: "input[name='name']",
      description: "input[name='description']",
      appId: "input[name='appId']",
      manageUsers: "input[name='manageApps']",
      manageModels: "input[name='manageModels']",
      manageImages: "input[name='manageImages']",
      permission: ".users input[type='checkbox']",
      saveButton: ".save-button",
      deleteButton: ".delete-button"
    },
    events: {
      "submit": "submitForm",
      "click @ui.deleteButton": "deleteUser"
    },
    showSuccess: function() {
      CommonViews.showGrowl("success", "Congratulations! User successfully updated!", function() {
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

      var update = self.model.updateUser(fields);
      update.done(function(user){
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

    deleteUser: function(e) {
      var self = this;
      self.ui.deleteButton.addClass("loading");

      var destroy = self.model.destroyUser();
      destroy.done(function(user){
        CommonViews.showGrowl("success", "Congratulations! User successfully deleted!", function() {
          window.location.href="/apps/" + self.model.get("appId") + "/users/";
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
      this.model = new UserEntities.User({
        id: this.ui.id.val(),
        appId: this.ui.appId.val()
      });

    }

  });
});