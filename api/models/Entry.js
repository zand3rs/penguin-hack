/**
* Entry.js
*
*/

var validStatus = ["draft", "submitted", "published", "archived"];

module.exports = {

  status: validStatus,

  tableName: "entries",
  attributes: {
    appId: {
      type: "string",
      required: true,
      columnName: "app_id"
    },
    modelId: {
      type: "string",
      required: true,
      columnName: "model_id",
    },
    attrs: {
      type: "json",
      required: true,
      columnName: "attrs"
    },
    categories: {
      type: "array",
      defaultsTo: [],
      columnName: "categories"
    },
    tags: {
      type: "array",
      defaultsTo: [],
      columnName: "tags"
    },
    status: {
      type: "string",
      defaultsTo: "draft",
      get in() {
        return validStatus;
      },
      columnName: "status"
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
