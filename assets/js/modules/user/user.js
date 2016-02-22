// # User
Penguin.module("User", function(User, Penguin, Backbone, Marionette, $, _) {

  /* Start
    --------------------------------------------------------------------------*/
  this.startWithParent = false;
  User.on("start", function() {

    var $body = $("body");
    if ($body.hasClass("user index")) {
      Penguin.module("User.Index").start();
    } else if ($body.hasClass("user new")) {
      Penguin.module("User.Create").start();
    } else if ($body.hasClass("user edit")) {
      Penguin.module("User.Update").start();
    }
  });
});