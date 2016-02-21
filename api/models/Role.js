/**
* Role.js
*
*/

var validPermission = ["canAdd", "canEdit", "canView", "canPublish", "canDelete", "canArchive"];
var validStatus = ["draft", "submitted", "published", "archived"];

module.exports = {

  tableName: "roles",
  attributes: {
    appId: {
      type: "string",
      required: true,
      columnName: "app_id"
    },
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
    },
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
    },
    createdAt: {
      type: "datetime",
      columnName: "created_at"
    },
    updatedAt: {
      type: "datetime",
      columnName: "updated_at"
    }
  },

  //-- lifecycle callbacks
  beforeValidate: function(values, next) {
    var permission = values.permission;

    var newPermission = _.transform(permission, function(result, value, key) {
      if (_.includes(validStatus, key)) {
        result[key] = _.pick(value, validPermission);
      }
    }, {});

    values.permission = newPermission;
    next();
  }

};
