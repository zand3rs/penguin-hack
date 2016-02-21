/**
* Role.js
*
*/

module.exports = {

  tableName: "roles",
  attributes: {
    name: {
      type: "string",
      required: true,
      columnName:"name"
    },
    description: {
      type: "string",
      required: true,
      columnName: "description"
    },
    manageApps: {
      type: "boolean",
      required: true,
      columnName: "manage_apps"
    },
    manageModels: {
      type: "boolean",
      required: true,
      columnName: "manage_models"
    },
    manageMedia: {
      type: "boolean",
      required: true,
      columnName: "manage_media"
    }
  },
  createdAt: {
    type: "datetime",
    columnName: "created_at"
  },
  updatedAt: {
    type: "datetime",
    columnName: "updated_at"
  }

};
