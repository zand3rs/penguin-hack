Penguin.on("start", function() {
  var $body = $("body");

  Penguin.module("Common").start();

  if ($body.hasClass("app")) {
    Penguin.module("App").start();
  } else if ($body.hasClass("role")) {
    Penguin.module("Role").start();
  }
});


Penguin.start();