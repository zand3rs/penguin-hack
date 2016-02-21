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
  afterCreate: function(values, next) {
    var appId = values.id;

    var editor = {
      appId: appId,
      name: "editor",
      description: "editor",
      permission: {
        draft: {
          canEdit: true,
          canView: true
        },
        submitted: {
          canDelete: true,
          canArchive: true
        }
      },
      manageModels: true,
      manageImages: true
    };

    var contributor = {
      appId: appId,
      name: "contributor",
      description: "contributor",
      permission: {
        draft: {
          canAdd: true,
          canEdit: true,
          canView: true,
          canDelete: true
        },
        submitted: {
          canView: true
        }
      },
      manageImages: true
    };

    var publisher = {
      appId: appId,
      name: "publisher",
      description: "publisher",
      permission: {
        submitted: {
          canView: true,
          canPublish: true
        },
        published: {
          canArchive: true
        }
      }
    };

    var roles = [editor, contributor, publisher];

    Role.create(roles, next);
  }

};
