/**
* Model.js
*
*/

module.exports = {

  tableName: "models",
  attributes: {
    appId: {
      type: "string",
      required: true,
      columnName: "app_id"
    },
    name: {
      type: "string",
      required: true,
      columnName: "name"
    },
    attrs: {
      type: "json",
      required: true,
      columnName: "attrs"
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
