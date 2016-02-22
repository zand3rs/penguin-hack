// # User Index
Penguin.module("User.Index", function(Index, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var UserIndexViews = Penguin.module("User.Index.Views");

  this.startWithParent = false;
  Index.on("start", function() {
    new UserIndexViews.Index();
  });
});


Penguin.module("User.Index.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  /* Required Modules
    --------------------------------------------------------------------------*/
  var UserEntities = Penguin.module("User.Entities");
  var ListViews = Penguin.module("List.Views");

  /* Marionette Views
    --------------------------------------------------------------------------*/
  // ### Users Index Layout
  Views.Index = Marionette.LayoutView.extend({
    el: "#users-index-view",
    buildList: function(appId) {
      if (_.isEmpty(listItems)) {
        return;
      }

      var collection = new UserEntities.UsersCollection(listItems, {appId: appId});
      collection.meta = listMeta;

      var listView = new ListViews.List({
        collection: collection
      }, {
        model: Views.User,
        next: "getUsers"
      });
    },

    initialize: function() {
      this.buildList(this.$el.data("app-id"));
    }
  });


  // ### User
  Views.User = Marionette.ItemView.extend({
    template: "#users-item-template",
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