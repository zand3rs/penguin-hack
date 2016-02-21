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
    attributes: {
      type: "string",
      required: true,
      columnName: "attributes"
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
