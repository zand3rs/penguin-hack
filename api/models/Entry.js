/**
* Entry.js
*
*/

module.exports = {

  tableName: "entries",
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

