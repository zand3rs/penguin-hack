// # Model New
Penguin.module("Model.Create", function(Create, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var ModelCreateViews = Penguin.module("Model.Create.Views");

  this.startWithParent = false;
  Create.on("start", function() {
    new ModelCreateViews.AddNewForm();
  });
});


Penguin.module("Model.Create.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  var ModelEntities = Penguin.module("Model.Entities");
  var CommonViews = Penguin.module("Common.Views");

  Views.AddNewForm = Marionette.ItemView.extend({
    el: "#add-new-model-form",
    ui: {
      appId:"input[name='appId']",
      name: "input[name='name']",
      description: "input[name='description']",
      saveButton: ".save-button"
    },
    events: {
      "submit": "submitForm"
    },
    showSuccess: function() {
      var self = this;
      CommonViews.showGrowl("success", "Congratulations! Model successfully added!", function() {
        window.location.href="/apps/" + self.model.get("appId") + "/models";
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

      var create = self.model.createModel(fields);
      create.done(function(model){
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
      this.model = new ModelEntities.Model({
        appId: this.ui.appId.val()
      });

    }

  });
});