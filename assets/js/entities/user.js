Penguin.module("User.Entities", function(Entities, Penguin, Backbone, Marionette, $, _) {

  /* Models
    --------------------------------------------------------------------------*/
  // ### User
  Entities.User = Backbone.Model.extend({
    urlRoot: function() {
      return "/apps/" + this.get("appId") + "/users/";
    },

    defaults: function() {
      return {
        userId: "",
        roleId: "",
        createdAt: "",
        updatedAt: "",
        appId: ""
      };
    },

    getUser: function() {
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

    createUser: function(fields) {
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

    updateUser: function(fields) {
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

    destroyUser: function() {
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
  // ### Users Collection
  Entities.UsersCollection = Backbone.Collection.extend({
    model: Entities.User,
    baseUrl: function() {
      return "/apps/" + this.appId + "/users/";
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

    getUsers: function() {
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
    }

  });
});