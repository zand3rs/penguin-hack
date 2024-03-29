Penguin.module("App.Entities", function(Entities, Penguin, Backbone, Marionette, $, _) {

  /* Models
    --------------------------------------------------------------------------*/
  // ### App
  Entities.App = Backbone.Model.extend({
    urlRoot: function() {
      return "/apps/";
    },

    defaults: function() {
      return {
        name: "",
        description: "",
        createdAt: "",
        updatedAt: "",
        picture: ""
      };
    },

    getApp: function() {
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

    createApp: function(fields) {
      var self = this;
      var defer = $.Deferred();

      fields = fields || {};

      var save = self.save(fields);
      save.done(function(response, xhr) {
        if (response && _.isEmpty(response.error)) {
          return defer.resolve(response.data);
        }

        return defer.reject(response.error, response.meta);
      });

      return defer.promise();
    },

    updateApp: function(fields) {
      var self = this;
      var defer = $.Deferred();

      fields = fields || {};

      var save = self.save(fields);
      save.done(function(response, xhr) {
        if (response && _.isEmpty(response.error)) {
          return defer.resolve(response.data);
        }

        return defer.reject(response.error, response.meta);
      });

      return defer.promise();
    },

    destroyApp: function() {
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
  // ### Apps Collection
  Entities.AppsCollection = Backbone.Collection.extend({
    model: Entities.App,
    baseUrl: "/apps/",

    nextPage: -1,

    url: function() {
      var url = this.baseUrl;

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

    getApps: function() {
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
    }

  });
});