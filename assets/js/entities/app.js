// # App
Penguin.module("Entities", function(Entities, Penguin, Backbone, Marionette, $, _) {


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
    }
  });



  /* Collections
    --------------------------------------------------------------------------*/
  // ### Apps Collection
  Entities.AppsCollection = Backbone.Collection.extend({
    model: Entities.App,
    baseUrl: "/apps/",

    url: function() {
      var url = this.baseUrl;

      if (this.nextPage) {
        return url + "?page=" + this.nextPage;
      }

      return url;
    },

    parse: function(response) {
      if (response.data && !_.isEmpty(response.data)) {
        this.nextPage++;
        return _.isArray(response.data) ? response.data : [response.data];
      }

      this.nextPage = -1;
    },

    getApps: function(fetchOptions) {
      var defer = $.Deferred();

      var options = {
        data: {},
        success: function(data, response) {
          if (response.status == "success") {
            defer.resolve(data);
          } else {
            defer.reject(response.data);
          }
        },

        error: function(data, response) {
          defer.reject(response.data);
        }
      };

      if (!_.isEmpty(fetchOptions)) {
        options = _.extend(options, fetchOptions);
      }

      this.fetch(options);
      return defer.promise();
    }

  });
});