/**
* Model.js
*
*/

module.exports = {

  tableName: "models",
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

