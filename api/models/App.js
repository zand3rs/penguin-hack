/**
* App.js
*
*/

module.exports = {

  tableName: "apps",
  attributes: {
    name: {
      type: "string",
      required: true,
      columnName: "name"
    },
    description: {
      type: "string",
      required: true,
      columnName: "description"
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
