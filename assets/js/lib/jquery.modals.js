/* M O D A L S */  
;( function($) {
  $.modal = function( el, userOptions ){

    var $popup = $(el);  
    var $modal = $(el).find(".modal");
    var $overlay = $(el).find(".overlay");
    var $closeButton = $(el).find(".close-button");

    // Options
    var defaultOptions = {
      beforeClose : "",
      afterClose : ""
    };

    var options = $.extend( {}, defaultOptions, userOptions );
    
    var beforeCloseCb = options.beforeClose;
    var afterCloseCb = options.afterClose;


    // Events
    var events = {
      doc:{
        escape: function(event){
          //On pressing ESC, hide all PopUps
          if(event && event.keyCode  == 27 ) {
            view.hide();
          }  
        }  
      },
      

      overlays:{
        click: function(){
          view.hide();
        }
      }
    };


    var view = {
      close: function(){
        $overlay.removeClass("overlay-show");
        $popup.removeClass("modal-show"); 

        setTimeout(function(){
          $popup.hide(); 
          $("body").removeClass("popup-open");

          if( afterCloseCb && $.isFunction( afterCloseCb ) ){
            afterCloseCb();
          }
        },150);
      },


      hide: function( e, params ){
        var params = params || {};
        var speed = params.speed || "";

        if( beforeCloseCb && $.isFunction( beforeCloseCb ) ){
          beforeCloseCb();
        }

        if( speed == "slow" ){
          setTimeout( function(){
            view.close();
          }, 900 );
        }
        else{
          view.close();
        }
      },

      show: function(){
        $("body").addClass("popup-open");

        $popup.show();
        $overlay.addClass("overlay-show");

        var newHeight = $modal.outerHeight() - $modal.find(".modal-header").outerHeight();

        if( $modal.find(".scrollable").length && newHeight > 0 ){
          $modal.find(".scrollable").css( "max-height", newHeight);
        }

        setTimeout(function(){
          $popup.addClass("modal-show");
        },100);

      }
    };


    function init(){
      $popup.on("hidePopUp", view.hide);
      $popup.on("showPopUp", view.show);

      $overlay.on("click", events.overlays.click);
      $(document).on("keyup", events.doc.escape );

      $popup.on("click", ".close-button", function(e){
        view.hide();
        e.preventDefault();
      });      
    }

    init();
  };  
  

  // Init 
  $.fn.modal = function( userOptions ) {
    return $(this).each( function(){
      new $.modal( this, userOptions );
    });
  };
})(window.jQuery);