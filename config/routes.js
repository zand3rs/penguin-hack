/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  "/test": {
    view: "test"
  },

  //-- Home
  "GET /"       : "Home.index",
  "GET /login"  : "Home.login",

  //-- Session / Authentication
  "GET /authenticate": "Session.authenticate",
  "GET /authorize": "Session.authorize",

  //-- App
  "GET    /apps"           : "App.index",
  "GET    /apps/new"       : "App.new"
  "POST   /apps"           : "App.create",
  "GET    /apps/:id/edit"  : "App.edit",
  "PUT    /apps/:id"       : "App.update",
  "DELETE /apps/:id"       : "App.destroy",

  //-- Role
  "GET    /roles"           : "Role.index",
  "GET    /roles/new"       : "Role.new"
  "POST   /roles"           : "Role.create",
  "GET    /roles/:id/edit"  : "Role.edit",
  "PUT    /roles/:id"       : "Role.update",
  "DELETE /roles/:id"       : "Role.destroy",

};
