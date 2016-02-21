// # App
Penguin.module("App", function(App, Penguin, Backbone, Marionette, $, _) {

  /* Start
    --------------------------------------------------------------------------*/
  this.startWithParent = false;
  App.on("start", function() {

    var $body = $("body");
    if ($body.hasClass("app index")) {
      Penguin.module("App.Index").start();
    } else if ($body.hasClass("app new")) {
      Penguin.module("App.Create").start();
    } else if ($body.hasClass("app edit")) {
      Penguin.module("App.Update").start();
    }
  });
});