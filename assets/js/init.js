Penguin.on("start", function() {
  var $body = $("body");

  Penguin.module("Common").start();

  if ($body.hasClass("app")) {
    Penguin.module("App").start();
  }
});


Penguin.start();