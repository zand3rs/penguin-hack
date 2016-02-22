// # Model Index
Penguin.module("Model.Index", function(Index, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var ModelIndexViews = Penguin.module("Model.Index.Views");

  this.startWithParent = false;
  Index.on("start", function() {
    new ModelIndexViews.Index();
  });
});


Penguin.module("Model.Index.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  /* Required Modules
    --------------------------------------------------------------------------*/
  var ModelEntities = Penguin.module("Model.Entities");
  var ListViews = Penguin.module("List.Views");

  /* Marionette Views
    --------------------------------------------------------------------------*/
  // ### Models Index Layout
  Views.Index = Marionette.LayoutView.extend({
    el: "#models-index-view",
    buildList: function(appId) {
      if (_.isEmpty(listItems)) {
        return;
      }

      var collection = new ModelEntities.ModelsCollection(listItems, {appId: appId});
      collection.meta = listMeta;

      var listView = new ListViews.List({
        collection: collection
      }, {
        model: Views.Model,
        next: "getModels"
      });
    },

    initialize: function() {
      this.buildList(this.$el.data("app-id"));
    }
  });


  // ### Model
  Views.Model = Marionette.ItemView.extend({
    template: "#models-item-template",
    className: "item",
    templateHelpers: function() {
      return {
        date: function() {
          return DateFormat.format.date(this.updatedAt ? this.updatedAt : this.createdAt, "MMM d, yyyy hh:mm a");
        }
      };
    },
  });


});