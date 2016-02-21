// # App Index
Penguin.module("App.Index", function(Index, Penguin, Backbone, Marionette, $, _) {
  /* Start
    --------------------------------------------------------------------------*/
  var AppIndexViews = Penguin.module("App.Index.Views");
  var Entities = Penguin.module("Entities");

  this.startWithParent = false;
  Index.on("start", function() {
    new AppIndexViews.Index();
  });
});


Penguin.module("App.Index.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  /* Required Modules
    --------------------------------------------------------------------------*/
  var Entities = Penguin.module("Entities");


  /* Marionette Views
    --------------------------------------------------------------------------*/
  // ### Apps Index Layout
  Views.Index = Marionette.LayoutView.extend({
    el: "#apps-index-view",
    buildList: function() {
      if (_.isEmpty(listItems)) {
        return;
      }

      var listView = new Views.List({
        collection: new Entities.AppsCollection(listItems)
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



  // ### List
  Views.List = Marionette.CollectionView.extend({
    el: ".list-body",
    emptyView: "",
    childView: Views.App,
    initialize: function(options) {
      var self = this;
      this.bindUIElements();
      this.render();

      var pagination = new Views.Pagination(this.collection);
      this.listenTo(pagination, "change:page", function(newPage) {

      });
    }
  });


  // ### Pagination
  Views.Pagination = Marionette.ItemView.extend({
    el: ".pagination",
    ui: {
      prevLink: ".prev",
      nextLink: ".next",
      pageInput: ".page"
    },
    events: {
      "change @ui.pageInput": "changePage",
      "click @ui.prevLink": "prevPage",
      "click @ui.nextLink": "nextPage"
    },
    changePage: function() {
      var self = this;
      var newPage = self.ui.pageInput.val();
      this.trigger("change:page", newPage);

      e.preventDefault();
    },
    prevPage: function() {

    },
    nexPage: function() {

    },
    initialize: function(collection) {
      this.bindUIElements();
      this.collection = collection;
    }
  });

});