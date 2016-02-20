/**
* User.js
*
*/

module.exports = {

  tableName: "users",
  attributes: {

    userId: {
      type: "string",
      columnName: "user_id"
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
      columnName: "name"
    },
    gender: {
      type: "string",
      columnName: "gender"
    },
    photo: {
      type: "string",
      columnName: "photo"
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

