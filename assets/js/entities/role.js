Penguin.module("Role.Entities", function(Entities, Penguin, Backbone, Marionette, $, _) {

  /* Models
    --------------------------------------------------------------------------*/
  // ### Role
  Entities.Role = Backbone.Model.extend({
    urlRoot: function() {
      return "/apps/" + this.get("appId") + "/roles/";
    },

    defaults: function() {
      return {
        name: "",
        appId: "",
        description: "",
        createdAt: "",
        updatedAt: "",
        permission: {},
        manageApps: false,
        manageModels: false,
        manageImages: false
      };
    },

    getRole: function() {
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

    createRole: function(fields) {
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

    updateRole: function(fields) {
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

    destroyRole: function() {
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
  // ### Roles Collection
  Entities.RolesCollection = Backbone.Collection.extend({
    model: Entities.Role,
    baseUrl: function() {
      return "/apps/" + this.appId + "/roles/";
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

    getRoles: function() {
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