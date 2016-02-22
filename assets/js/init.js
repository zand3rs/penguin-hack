Penguin.on("start", function() {
  var $body = $("body");

  Penguin.module("Common").start();

  if ($body.hasClass("app")) {
    Penguin.module("App").start();
  } else if ($body.hasClass("role")) {
    Penguin.module("Role").start();
  } else if ($body.hasClass("user")) {
    Penguin.module("User").start();
  } else if ($body.hasClass("model")) {
    Penguin.module("Model").start();
  }
});


Penguin.start();