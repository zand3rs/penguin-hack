/**
* UserRole.js
*
*/

module.exports = {

  tableName: "user_roles",
  attributes: {
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

