// # Entry
Penguin.module("Entry", function(Entry, Penguin, Backbone, Marionette, $, _) {

  /* Start
    --------------------------------------------------------------------------*/
  this.startWithParent = false;
  Entry.on("start", function() {

    var $body = $("body");
    if ($body.hasClass("entry show")) {
      Penguin.module("Entry.Index").start();
    } else if ($body.hasClass("entry new")) {
      Penguin.module("Entry.Create").start();
    } else if ($body.hasClass("entry edit")) {
      Penguin.module("Entry.Update").start();
    }
  });
});