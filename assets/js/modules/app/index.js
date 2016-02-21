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

      var collection = new Entities.AppsCollection(listItems);
      collection.meta = listMeta;

      var listView = new Views.List({
        collection: collection
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

      var paginationModel = new Entities.Pagination(this.collection.meta);
      var pagination = new Views.Pagination({
        model: paginationModel
      }, {
        collection: self.collection
      });

      this.listenTo(pagination, "change:page", function(newPage) {
        self.collection.nextPage = newPage;
        var fetch = self.collection.getApps();
        fetch.done(function() {
          pagination.model.resetValues(self.collection.meta);
        });
      });

      var region = new Marionette.Region({
        el: ".pagination-region"
      });
      region.show(pagination);
    }
  });


  // ### Pagination
  Views.Pagination = Marionette.ItemView.extend({
    template: "#pagination-template",
    className: "pagination",
    ui: {
      prevLink: ".prev",
      nextLink: ".next",
      pageInput: ".page"
    },
    modelEvents: {
      "change": "render"
    },
    events: {
      "keypress @ui.pageInput": "changePage",
      "click @ui.prevLink": "prevPage",
      "click @ui.nextLink": "nextPage"
    },
    disableView: function() {
      this.$el.addClass("disabled");
      this.ui.pageInput.attr("readonly", true);
    },
    enableView: function() {
      this.$el.removeClass("disabled");
      this.ui.pageInput.attr("readonly", false);
    },
    changePage: function(e) {
      if (e.keyCode == 13) {
        e.preventDefault();

        if (this.$el.hasClass("disabled")) {
          return false;
        }

        var newPage = this.ui.pageInput.val();

        if (newPage > this.model.get("totalPage")) {
          this.ui.pageInput.val(this.model.get("totalPage"));
        }

        if (newPage != this.model.get("currentPage")) {
          this.disableView();
          this.trigger("change:page", newPage);
        } else {
          this.enableView();
        }
      }
    },
    prevPage: function(e) {
      this.trigger("change:page", this.model.get("previousPage"));
      e.preventDefault();
    },
    nextPage: function(e) {
      this.trigger("change:page", this.model.get("nextPage"));
      e.preventDefault();
    },
    onRender: function() {
      this.enableView();
    },
    initialize: function(model, options) {
      this.collection = options.collection;
    }
  });

});