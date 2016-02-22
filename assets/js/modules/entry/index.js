// # Entries Index
Penguin.module("Entry.Index", function(Index, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var EntryIndexViews = Penguin.module("Entry.Index.Views");

  this.startWithParent = false;
  Index.on("start", function() {
    new EntryIndexViews.Index();
  });
});


Penguin.module("Entry.Index.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  /* Required Modules
    --------------------------------------------------------------------------*/
  var EntryEntities = Penguin.module("Entry.Entities");
  var ListViews = Penguin.module("List.Views");

  /* Marionette Views
    --------------------------------------------------------------------------*/
  // ### Entrys Index Layout
  Views.Index = Marionette.LayoutView.extend({
    el: "#entries-index-view",
    buildList: function(appId, modelId) {
      if (_.isEmpty(listItems)) {
        return;
      }

      var collection = new EntryEntities.EntrysCollection(listItems, {appId: appId, modelId: modelId});
      collection.meta = listMeta;

      var listView = new ListViews.List({
        collection: collection
      }, {
        model: Views.Entry,
        next: "getEntries"
      });
    },

    initialize: function(appId) {
      this.buildList(this.$el.data("app-id"), this.$el.data("model-id"));
    }
  });


  // ### Entry
  Views.Entry = Marionette.ItemView.extend({
    template: "#entries-item-template",
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