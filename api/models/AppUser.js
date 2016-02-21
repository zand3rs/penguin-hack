/**
* AppUser.js
*
*/

module.exports = {

  tableName: "app_users",
  attributes: {
    appId: {
      type: "string",
      required: true,
      columnName: "app_id"
    },
    userId: {
      type: "string",
      required: true,
      columnName: "user_id"
    },
    roleId: {
      type: "string",
      required: true,
      columnName: "role_id"
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

