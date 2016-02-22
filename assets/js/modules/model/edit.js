// # Model update
Penguin.module("Model.Update", function(Update, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var ModelUpdateViews = Penguin.module("Model.Update.Views");

  this.startWithParent = false;
  Update.on("start", function() {
    new ModelUpdateViews.UpdateForm();
  });
});


Penguin.module("Model.Update.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  var ModelEntities = Penguin.module("Model.Entities");
  var CommonViews = Penguin.module("Common.Views");

  Views.UpdateForm = Marionette.ItemView.extend({
    el: "#update-model-form",
    ui: {
      id: "input[name='id']",
      name: "input[name='name']",
      appId: "input[name='appId']",
      saveButton: ".save-button",
      deleteButton: ".delete-button"
    },
    events: {
      "submit": "submitForm",
      "click @ui.deleteButton": "deleteModel"
    },
    showSuccess: function() {
      CommonViews.showGrowl("success", "Congratulations! Model successfully updated!", function() {
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
        name: self.ui.name.val()
      };

      var fieldObj = {};
      $(".sort-item").each(function(index, item) {
        var name = $(item).find("input[name='fieldName']").val();
        var type = $(item).find("select[name='type']").val();
        var required = $(item).find("input[name='required']").is(":checked") ? true : false;
        fieldObj[name] = {
          type: type
        };

        if(required) {
          fieldObj[name]["required"] = true;
        }
      });

      fields.attrs = fieldObj;

      var update = self.model.updateModel(fields);
      update.done(function(model){
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

    deleteModel: function(e) {
      var self = this;
      self.ui.deleteButton.addClass("loading");

      var destroy = self.model.destroyModel();
      destroy.done(function(model){
        CommonViews.showGrowl("success", "Congratulations! Model successfully deleted!", function() {
          window.location.href="/apps/" + self.model.get("appId") + "/models/";
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
      this.model = new ModelEntities.Model({
        id: this.ui.id.val(),
        appId: this.ui.appId.val()
      });

      this.$el.on("click", ".delete-sortable", function() {
        $(this).parent().parent().parent().remove();
      });

      this.$el.on("click", ".add-new-model-link", function(e) {
        var html = $("#new-field-template").html();
        $("#sortable").append(html);

        e.preventDefault();
      });
    }

  });
});