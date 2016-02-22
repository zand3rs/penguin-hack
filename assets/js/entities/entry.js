Penguin.module("Entry.Entities", function(Entities, Penguin, Backbone, Marionette, $, _) {

  /* Models
    --------------------------------------------------------------------------*/
  // ### Entry
  Entities.Entry = Backbone.Model.extend({
    urlRoot: function() {
      return "/apps/" + this.get("appId") + "/" + this.get("modelId") + "/entries/";
    },

    defaults: function() {
      return {
        createdAt: "",
        updatedAt: ""
      };
    },

    getEntry: function() {
      var self = this;
      var defer = $.Deferred();

      var fetch = self.fetch();

      fetch.done(function(response, xhr) {
        if (response && _.isEmpty(response.error)) {
          return defer.resolve(response.data);
        }

        return defer.reject(response.error);
      });

      return defer.promise();
    },

    createEntry: function(fields) {
      var self = this;
      var defer = $.Deferred();

      fields = fields || {};

      var save = $.ajax({
        url: this.urlRoot(),
        type: "POST",
        data: fields
      });

      save.done(function(response, xhr) {
        if (response && _.isEmpty(response.error)) {
          return defer.resolve(response.data);
        }

        return defer.reject(response.error, response.meta);
      });

      return defer.promise();
    },

    updateEntry: function(fields) {
      var self = this;
      var defer = $.Deferred();

      fields = fields || {};

      var save = $.ajax({
        url: this.urlRoot() + this.get("id"),
        type: "PUT",
        data: fields
      });

      save.done(function(response, xhr) {
        if (response && _.isEmpty(response.error)) {
          return defer.resolve(response.data);
        }

        return defer.reject(response.error, response.meta);
      });

      return defer.promise();
    },

    destroyEntry: function() {
      var self = this;
      var defer = $.Deferred();

      var destroy = self.destroy();
      destroy.done(function(response, xhr) {
        if (response && _.isEmpty(response.error)) {
          return defer.resolve(response.data);
        }

        return defer.reject(response.error, response.meta);
      });

      return defer.promise();
    }
  });

  /* Collections
    --------------------------------------------------------------------------*/
  // ### Entry Collection
  Entities.EntryCollection = Backbone.Collection.extend({
    model: Entities.Entry,
    baseUrl: function() {
      return "/apps/" + this.appId + "/" + this.modelId + "/entries/";
    },

    nextPage: -1,

    url: function() {
      var url = this.baseUrl();

      if (this.nextPage) {
        return url + "?page=" + this.nextPage;
      }

      return url;
    },

    parse: function(response) {
      this.meta = response.meta || {};

      if (response.data && !_.isEmpty(response.data)) {
        this.nextPage++;
        return _.isArray(response.data) ? response.data : [response.data];
      }

      this.nextPage = -1;
    },

    getEntries: function() {
      var self = this;
      var defer = $.Deferred();

      var fetch = self.fetch();

      fetch.done(function(response, xhr) {
        if (response && _.isEmpty(response.error)) {
          return defer.resolve(response.data);
        }

        return defer.reject(response.error);
      });

      return defer.promise();
    },

    initialize: function(collection, options) {
      this.appId = options.appId;
      this.modelId = options.modelId;
    }

  });
});