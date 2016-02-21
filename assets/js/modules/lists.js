Penguin.module("List.Views", function(Views, Penguin, Backbone, Marionette, $, _) {
  var Entities = Penguin.module("Entities");

  /* Marionette Views
    --------------------------------------------------------------------------*/
  // ### List
  Views.List = Marionette.CollectionView.extend({
    el: ".list-body",
    emptyView: "",
    initialize: function(collection, options) {
      var self = this;
      this.childView= options.model;
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
        var fetch = self.collection[options.next]();
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