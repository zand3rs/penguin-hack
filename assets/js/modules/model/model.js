// # Model
Penguin.module("Model", function(Model, Penguin, Backbone, Marionette, $, _) {

  /* Start
    --------------------------------------------------------------------------*/
  this.startWithParent = false;
  Model.on("start", function() {

    var $body = $("body");
    if ($body.hasClass("model index")) {
      Penguin.module("Model.Index").start();
    } else if ($body.hasClass("model new")) {
      Penguin.module("Model.Create").start();
    } else if ($body.hasClass("model edit")) {
      Penguin.module("Model.Update").start();
    }
  });
});