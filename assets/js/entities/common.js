// # Common Entities
Penguin.module("Entities", function(Entities, Penguin, Backbone, Marionette, $, _) {

  Entities.Pagination = Backbone.Model.extend({
    defaults: function() {
      return {
        nextPage: 0,
        previousPage: 0,
        currentPage: 1,
        totalPage: 1
      }
    },
    resetValues: function(newValues){
      var meta = _.defaults(newValues, {
        nextPage: 0,
        previousPage: 0,
        currentPage: 1,
        totalPage: 1}
      );
      this.set(meta);
    }
  });
});