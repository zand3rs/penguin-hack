/*
 * AdminHelper
 *
 */

module.exports = {

  canManageApp: function(user, app) {
    var appId = _.get(app, "id");
    var ownerRole = _.find((user || {}).roles, {id: "0"});
    var canManage = _.filter((user || {}).roles, {appId: appId, manageApps: true});

    return (ownerRole || canManage) ? true : false;
  },

  canManageModel: function(user, app) {
    var appId = _.get(app, "id");
    var ownerRole = _.find((user || {}).roles, {id: "0"});
    var canManage = _.filter((user || {}).roles, {appId: appId, manageModels: true});

    return (ownerRole || canManage) ? true : false;
  },

  canManageImage: function(user, app) {
    var appId = _.get(app, "id");
    var ownerRole = _.find((user || {}).roles, {id: "0"});
    var canManage = _.filter((user || {}).roles, {appId: appId, manageImages: true});

    return (ownerRole || canManage) ? true : false;
  },

  canAddEntry: function() {
    return true;
  },

  canEditEntry: function() {
    return true;
  },

  canViewEntry: function() {
    return true;
  },

  canDeleteEntry: function() {
    return true;
  },

  canPublishEntry: function() {
    return true;
  },

  canArchiveEntry: function() {
    return true;
  }

};
