var menuFlag = false;
$(window).on('load', function () {
  //----------PageLoad animation-----------------------------

    $("#loader-wrapper").fadeOut("slow");
    $('body').removeClass('no-scroll');
});

$(document).ready(function () {

  //-------------------Visitor Counter--------------------------
      var n = localStorage.getItem("counter");

      if(n===null){
        n = 0
      }

      n++;

      localStorage.setItem("counter", n);
      $('#total-visits').append(n);

//-------------Disabling arrows on menuopen--------------
      var ar = new Array(37, 39);
      var disableArrowKeys = function(e) {
        if ($.inArray(e.keyCode, ar)>=0) {
            e.preventDefault();
        }
      }

//-----------Menu Open Effects---------------------
    $('#menu-bar').click(function(){
        $('#menu-bar').toggleClass('open');
        $('.menu-overlay').toggleClass('menu-overlay-active');
        $('.logo').toggleClass('menu-overlay-active');
        $('.menu').toggleClass('menu-overlay-active');
        $('body').toggleClass('no-scroll');
        $('.menu-overlay-logo').toggleClass('menu-overlay-active');
        menuFlag = menuFlag?false:true;
    });

//-----------Page indicatorfunction----------------------------
      var indicator = function(){

        $('.page-indicator-wrapper').addClass('page-indicator-active');
        $('.page-indicator p:first-child').html(active_container_pagecount);
        setTimeout(function() {
          $('.page-indicator-wrapper').removeClass('page-indicator-active');
        }, 500);
      };


//-----------Left Right Arrows Functions---------------
    var active_container;
    var active_menu_item;

    var active_container_pagecount=$('#container-wrapper > div.container-active').data('pagecount');
    console.log(active_container_pagecount);

    document.onkeydown = checkKey;

    function checkKey(e) {
      e = e || window.event;

      active_container=$('#container-wrapper > div.container-active')
      active_menu_item=$('.menu > ul li.active-menu-item')

      if (e.keyCode == '37' && !menuFlag) {//left arrow

        if($(active_container).prev().length === 0 ){
          console.log($(active_container).last());

      /*    $(active_container)    // for looping next container
          .last()
          .addClass('container-active')
          .fadeIn(4000)
          .siblings()
          .removeClass('container-active');*/
        }

        $(active_container)    // for making container visible
        .prev()
        .addClass('container-active')
        .fadeIn(4000)
        .siblings()
        .removeClass('container-active');

        $('html, body').animate({ scrollTop: 0 }, 'fast');
        // page indicator
        active_container_pagecount=$('#container-wrapper > div.container-active').data('pagecount');

        indicator();

        $(active_menu_item)   // menu active
        .prev()
        .addClass('active-menu-item')
        .siblings()
        .removeClass('active-menu-item');
      }
      else if (e.keyCode == '39' && !menuFlag) {//right arrow

        $(active_container)
        .next()
        .addClass('container-active')
        .fadeIn(4000)
        .siblings()
        .removeClass('container-active');

        $('html, body').animate({ scrollTop: 0 }, 'fast');

        active_container_pagecount=$('#container-wrapper > div.container-active').data('pagecount');

        indicator();

        $(active_menu_item)
        .next()
        .addClass('active-menu-item')
        .siblings()
        .removeClass('active-menu-item');
     }
   }


//------------Menu Navigation-------------------------
    $(".menu-item").click(function(){
      var target_container = $(this).data('target');

      $(target_container)
      .addClass('container-active')
      .siblings()
      .removeClass('container-active');

      $('#menu-bar').toggleClass('open');
      $('.menu-overlay').toggleClass('menu-overlay-active');
      $('.logo').toggleClass('menu-overlay-active');
      $('.menu').toggleClass('menu-overlay-active');
      $('body').toggleClass('no-scroll');
    });

//-------------Navbar Scroll CSS change-------------------
    $(window).bind('scroll', function() {

       if ($(window).scrollTop() > 1) {
				 $('header').css({ "background": "rgba(0,0,0,0.7)"});
			 }
			 else{
				 $('header').css({"background": "transparent"});
       }
		});

//-------------Smooth Scrolling anchor link---------------
    $(document).on('click', 'a', function(event){
      event.preventDefault();

      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top-75
      }, 500);
    });

});
