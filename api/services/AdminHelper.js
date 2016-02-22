/*
 * AdminHelper
 *
 */

module.exports = {

  canManageApp: function(user, app) {
    var appId = _.get(app, "id");
    var userApp = _.find((user || {}).apps, {id: appId});
    var ownerRole = _.find((user || {}).roles, {id: "0"});
    var canManage = _.filter((user || {}).roles, {appId: appId, manageApps: true});

    if (!userApp) return false;
    if (ownerRole) return true;
    if (canManage) return true;

    return false;
  },

  canManageModel: function(user, app) {
    var appId = _.get(app, "id");
    var userApp = _.find((user || {}).apps, {id: appId});
    var ownerRole = _.find((user || {}).roles, {id: "0"});
    var canManage = _.filter((user || {}).roles, {appId: appId, manageModels: true});

    if (!userApp) return false;
    if (ownerRole) return true;
    if (canManage) return true;

    return false;
  },

  canManageImage: function(user, app) {
    var appId = _.get(app, "id");
    var userApp = _.find((user || {}).apps, {id: appId});
    var ownerRole = _.find((user || {}).roles, {id: "0"});
    var canManage = _.find((user || {}).roles, {appId: appId, manageImages: true});

    if (!userApp) return false;
    if (ownerRole) return true;
    if (canManage) return true;

    return false;
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
