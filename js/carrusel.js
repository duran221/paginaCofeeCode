$(function() {
     var menu_ul = $('.menu > li > ul'),
        menu_a  = $('.menu > li > a');
    
    menu_ul.hide();

    menu_a.click(function(e) {
        e.preventDefault();
        if(!$(this).hasClass('active')) {
            menu_a.removeClass('active');
            menu_ul.filter(':visible').slideUp('normal');
            $(this).addClass('active').next().stop(true,true).slideDown('normal');
        } else {
            $(this).removeClass('active');
            $(this).next().stop(true,true).slideUp('normal');
        }
    });


$("#slidebox").jCarouselLite({
    vertical: false,
    hoverPause:true,
    btnPrev: ".previous",
    btnNext: ".next",
    visible: 1,
    start: 0,
    scroll: 1,
    circular: true,
    auto:5000,
    speed:500,        
    btnGo:
        [".1", ".2",
        ".3", ".4",".5",".6",".7"],
    
    afterEnd: function(a, to, btnGo) {
        if(btnGo.length <= to){
          to = 0;
        }
        $(".thumbActive").removeClass("thumbActive");
        $(btnGo[to]).addClass("thumbActive");
        }
  });
  });