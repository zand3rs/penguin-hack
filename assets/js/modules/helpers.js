// # Helpers
Penguin.module("Helpers", function(Helpers, Penguin, Backbone, Marionette, $, _) {

  /* Start
    --------------------------------------------------------------------------*/
  this.startWithParent = false;

  Helpers.disableScrolling = function() {
    var $body = $("body");
    if (!$body.hasClass("kill-scroll")) {
      $body.addClass("kill-scroll")
        .data("last-scroll", $(window).scrollTop());
    }
  };


  Helpers.enableScrolling = function() {
    var $body = $("body");
    if ($body.hasClass("kill-scroll")) {
      $body.removeClass("kill-scroll");
      $(window).scrollTop($("body").data("last-scroll"));
    }
  };
});