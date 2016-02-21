/**
* Category.js
*
*/

module.exports = {

  tableName: "categories",
  attributes: {
    appId: {
      type: "string",
      columnName: "app_id"
    },
    crumbs: {
      type: "array",
      columnName: "crumbs",
      defaultsTo: []
    },

    name: function() {
      return this.crumbs.join("/");
    },

    createdAt: {
      type: "datetime",
      columnName: "created_at"
    },
    updatedAt: {
      type: "datetime",
      columnName: "updated_at"
    }
  }

};

