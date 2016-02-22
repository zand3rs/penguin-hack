/**
* User.js
*
*/

module.exports = {

  tableName: "users",
  attributes: {
    authId: {
      type: "string",
      columnName: "auth_id"
    },
    authType: {
      type: "string",
      columnName: "auth_type"
    },
    displayName: {
      type: "string",
      columnName: "display_name"
    },
    firstName: {
      type: "string",
      columnName: "first_name"
    },
    lastName: {
      type: "string",
      columnName: "last_name"
    },
    email: {
      type: "email",
      columnName: "email"
    },
    picture: {
      type: "string",
      columnName: "picture"
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

