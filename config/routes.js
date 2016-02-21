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
  "GET /signin"       : "Session.signin",
  "GET /authenticate" : "Session.authenticate",
  "GET /authorize"    : "Session.authorize",
  "GET /logout"       : "Session.destroy",

  //-- Profile
  "GET /profile"      : "Profile.show",

  //-- App
  "GET    /apps"           : "App.index",
  "GET    /apps/new"       : "App.new",
  "POST   /apps"           : "App.create",
  "GET    /apps/:id/edit"  : "App.edit",
  "PUT    /apps/:id"       : "App.update",
  "DELETE /apps/:id"       : "App.destroy",

  //-- Role
  "GET    /apps/:app_id/roles"           : "Role.index",
  "GET    /apps/:app_id/roles/new"       : "Role.new",
  "POST   /apps/:app_id/roles"           : "Role.create",
  "GET    /apps/:app_id/roles/:id/edit"  : "Role.edit",
  "PUT    /apps/:app_id/roles/:id"       : "Role.update",
  "DELETE /apps/:app_id/roles/:id"       : "Role.destroy",

  //-- models
  "GET    /apps/:app_id/models"           : "Model.index",
  "GET    /apps/:app_id/models/new"       : "Model.new",
  "POST   /apps/:app_id/models"           : "Model.create",
  "GET    /apps/:app_id/models/:id/edit"  : "Model.edit",
  "PUT    /apps/:app_id/models/:id"       : "Model.update",
  "DELETE /apps/:app_id/models/:id"       : "Model.destroy",

  //-- Image | media
  "GET    /apps/:app_id/images"            : "Image.index",
  "GET    /apps/:app_id/images/new"        : "Image.new",
  "POST   /apps/:app_id/images"            : "Image.create",
  "GET    /apps/:app_id/images/:id/edit"   : "Image.edit",
  "PUT    /apps/:app_id/images/:id"        : "Image.update",
  "DELETE /apps/:app_id/images/:id"        : "Image.destroy",

  //-- Categories
  "GET    /apps/:app_id/categories"           : "Category.index",
  "GET    /apps/:app_id/categories/new"       : "Category.new",
  "POST   /apps/:app_id/categories"           : "Category.create",
  "GET    /apps/:app_id/categories/:id/edit"  : "Category.edit",
  "PUT    /apps/:app_id/categories/:id"       : "Category.update",
  "DELETE /apps/:app_id/categories/:id"       : "Category.destroy",

  //-- Users
  "GET    /users/search"                      : "User.search",
  "GET    /apps/:app_id/users"                : "User.index",
  "POST   /apps/:app_id/users"                : "User.create",
  "GET    /apps/:app_id/users/:id/edit"       : "User.edit",
  "PUT    /apps/:app_id/users/:id"            : "User.update",
  "DELETE /apps/:app_id/users/:id"            : "User.destroy",


};
