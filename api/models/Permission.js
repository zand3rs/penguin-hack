/**
* Permission.js
*
*/

var status = ["draft", "submitted", "published", "archived"];
module.exports = {

  tableName: "permissions",

  status: status,

  attributes: {
    roleId: {
      type: "string",
      required: true,
      columnName: "role_id"
    },
    status: {
      type: "string",
      required: true,
      get in() {
        return status;
      },
      columnName: "status"
    },
    canAdd: {
      type: "boolean",
      required: true,
      defaultsTo: false,
      columnName: "can_add"
    },
    canEdit: {
      type: "boolean",
      required: true,
      defaultsTo: false,
      columnName: "can_edit"
    },
    canView: {
      type: "boolean",
      required: true,
      defaultsTo: false,
      columnName: "can_view"
    },
    canPublish: {
      type: "boolean",
      required: true,
      defaultsTo: false,
      columnName: "can_publish"
    },
    canDelete: {
      type: "boolean",
      required: true,
      defaultsTo: false,
      columnName: "can_delete"
    },
    canArchive: {
      type: "boolean",
      required: true,
      defaultsTo: false,
      columnName: "can_archive"
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
