/**
 * RoleController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

  create: function(req, res) {
    var params = _.omitBy({
      roleId: req.param("roleId"),
      status: req.param("status"),
      canAdd: req.param("canAdd"),
      canEdit: req.param("canEdit"),
      canView: req.param("canView"),
      canPublish: req.param("canPublish"),
      canDelete: req.param("canDelete"),
      canArchive: req.param("canArchive"),
    }, _.isNil);

    Permission.create(params, function(err, permission) {
      var payload = (err) ? err : permission;

      res.format({
        html: function () {
          res.notFound();
        },
        json: function () {
          if (err) {
            return res.apiError(payload);
          } else {
            res.apiSuccess(payload);
          }
        }
      });
    });
  },

  update: function(req, res) {
    var id = req.param("id");

    var params = _.omitBy({
      roleId: req.param("roleId"),
      status: req.param("status"),
      canAdd: req.param("canAdd"),
      canEdit: req.param("canEdit"),
      canView: req.param("canView"),
      canPublish: req.param("canPublish"),
      canDelete: req.param("canDelete"),
      canArchive: req.param("canArchive"),
    }, _.isNil);

    Permission.update({id: id}, params, function(err, permission) {
      var payload = (err) ? err : permission;

      res.format({
        html: function() {
          res.notFound();
        },
        json: function() {
          if (err) {
            res.apiError(payload);
          } else if (_.isEmpty(permission)) {
            res.apiError(new Exception.RecordNotFound("Permission Not Found"));
          } else {
            res.apiSuccess(payload);
          }
        }
      });
    });
  }
};
