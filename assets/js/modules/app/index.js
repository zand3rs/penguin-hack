// # App Index
Penguin.module("App.Index", function(Index, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var AppIndexViews = Penguin.module("App.Index.Views");

  this.startWithParent = false;
  Index.on("start", function() {
    new AppIndexViews.Index();
  });
});


Penguin.module("App.Index.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  /* Required Modules
    --------------------------------------------------------------------------*/
  var AppEntities = Penguin.module("App.Entities");
  var ListViews = Penguin.module("List.Views");

  /* Marionette Views
    --------------------------------------------------------------------------*/
  // ### Apps Index Layout
  Views.Index = Marionette.LayoutView.extend({
    el: "#apps-index-view",
    buildList: function() {
      if (_.isEmpty(listItems)) {
        return;
      }

      var collection = new AppEntities.AppsCollection(listItems);
      collection.meta = listMeta;

      var listView = new ListViews.List({
        collection: collection
      }, {
        model: Views.App,
        next: "getApps"
      });
    },

    initialize: function() {
      this.buildList();
    }
  });


  // ### App
  Views.App = Marionette.ItemView.extend({
    template: "#apps-item-template",
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