/**
* Image.js
*
*/

module.exports = {

  tableName: "images",
  attributes: {

    name: {
      type: "string",
      columnName: "name",
      required: true
    },
    description: {
      type: "string",
      columnName: "description"
    },
    uri: {
      type: "string",
      columnName: "uri",
      required: true
    },
    public: {
      type: "boolean",
      defaultsTo: false,
      columnName: "public"
    },
    appId: {
      type: "string",
      columnName: "app_id",
      required: true
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

