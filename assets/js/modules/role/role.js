// # Role
Penguin.module("Role", function(Role, Penguin, Backbone, Marionette, $, _) {

  /* Start
    --------------------------------------------------------------------------*/
  this.startWithParent = false;
  Role.on("start", function() {

    var $body = $("body");
    if ($body.hasClass("role index")) {
      Penguin.module("Role.Index").start();
    } else if ($body.hasClass("role new")) {
      Penguin.module("Role.Create").start();
    } else if ($body.hasClass("role edit")) {
      Penguin.module("Role.Update").start();
    }
  });
});