// # Role Index
Penguin.module("Role.Index", function(Index, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var RoleIndexViews = Penguin.module("Role.Index.Views");

  this.startWithParent = false;
  Index.on("start", function() {
    new RoleIndexViews.Index();
  });
});


Penguin.module("Role.Index.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  /* Required Modules
    --------------------------------------------------------------------------*/
  var RoleEntities = Penguin.module("Role.Entities");
  var ListViews = Penguin.module("List.Views");

  /* Marionette Views
    --------------------------------------------------------------------------*/
  // ### Roles Index Layout
  Views.Index = Marionette.LayoutView.extend({
    el: "#roles-index-view",
    buildList: function(appId) {
      if (_.isEmpty(listItems)) {
        return;
      }

      var collection = new RoleEntities.RolesCollection(listItems, {appId: appId});
      collection.meta = listMeta;

      var listView = new ListViews.List({
        collection: collection
      }, {
        model: Views.Role,
        next: "getRoles"
      });
    },

    initialize: function(appId) {
      this.buildList(this.$el.data("app-id"));
    }
  });


  // ### Role
  Views.Role = Marionette.ItemView.extend({
    template: "#roles-item-template",
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