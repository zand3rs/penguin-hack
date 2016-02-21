/**
* Role.js
*
*/

var validPermissions = ["canAdd", "canEdit", "canView", "canPublish", "canDelete", "canArchive"];
var status = ["draft", "submitted", "published", "archived"];

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
    permission: {
      type: "json",
      required: true,
      columnName: "permission"
    }
    manageApps: {
      type: "boolean",
      required: true,
      defaultsTo: false,
      columnName: "manage_apps"
    },
    manageModels: {
      type: "boolean",
      required: true,
      defaultsTo: false,
      columnName: "manage_models"
    },
    manageImages: {
      type: "boolean",
      required: true,
      defaultsTo: false,
      columnName: "manage_images"
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
