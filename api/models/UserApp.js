/**
* UserApp.js
*
*/

module.exports = {

  tableName: "user_apps",
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

