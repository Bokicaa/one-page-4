$(document).ready(function() {
    
    function slider(el) {
        var $eq = el.index();
        if(el.parents('.wrapper-points').length) {
            el.find('a').addClass('active-point').parent().siblings().find('a').removeClass('active-point');
        }
        else {
            el.addClass('active').siblings().removeClass('active');
            $('.wrapper-points .single-point').eq($eq).find('a').addClass('active-point').parent().siblings().find('a').removeClass('active-point');
        }
        $('.switcher').animate({height: '100%'}, 400, function() {
            $('.images-back .single-img').eq($eq).addClass('active').siblings().removeClass('active');
            $(this).animate({height: '0%'}, 600, function() {
                $('.images-front .single-img').eq($eq).addClass('active').siblings().removeClass('active');
                $(this).animate({height: '50%'}, 400);
            });
        });

        $('.switcher-1').animate({height: '0%'}, 400, function() {
            $(this).animate({height: '100%'}, 600, function() {
                $(this).animate({height: '50%'}, 400);
            });
        });

        $('.handler').css('top', '50%');

        $('.all-descriptions .description').eq($eq).animate({opacity: 1}, 700).siblings().animate({opacity: '0'}, 700);
        $('.nav-item').eq($eq).addClass('active').siblings().removeClass('active');
    }

    $('.single-point').click(function(e) {
        e.preventDefault();
        var $this = $(this);
        slider($this);
    });

    $('.nav-item').click(function() {
        var $this = $(this);
        slider($this);
    });

    var only_once = true;
    var start = true;
    function bind_unbind() {
        
        if($(window).width() > 768 && only_once) {
            $('.wrapp-site').bind('wheel', function(event){
                var timer;
                if(start) {
                    if(event.originalEvent.deltaY < 0){
                        if($('.active-point').parent().prev().length) {
                            var $prev = $('.active-point').parent().prev();
                            slider($prev);
                            start = false;
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                            start = true;
                            }, 1600);
                        }
                    }
                    else if(event.originalEvent.deltaY > 0){
                        if($('.active-point').parent().next().length) {
                            var $next = $('.active-point').parent().next();
                            slider($next);
                            start = false;
                            clearTimeout(timer);
                                timer = setTimeout(function() {
                                start = true;
                            }, 1600);
                        }
                    }
                }
            });
            only_once = false;
        }
        else {
            $('.wrapp-site').unbind('wheel');
            only_once = true;
        }

    }

    bind_unbind();


    /*
    var start = true;
    var prev_scroll = 0;
    var curent_scroll = 0;
    $(window).scroll(function() {
        var timer;
        if(start) {
            curent_scroll = $(document).scrollTop();
            if(curent_scroll > prev_scroll) {
                if($('.active-point').parent().next().length) {
                    var $next = $('.active-point').parent().next();
                    slider($next);
                    start = false;
                    clearTimeout(timer);
                        timer = setTimeout(function() {
                        start = true;
                    }, 1600);
                }
            } else if(curent_scroll < prev_scroll) {
                if($('.active-point').parent().prev().length) {
                    var $prev = $('.active-point').parent().prev();
                    slider($prev);
                    start = false;
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                    start = true;
                    }, 1600);
                }
            }
            prev_scroll = curent_scroll;
        }  
    });*/

    /*function handler(el) {
        var top = el.offset().top;
    }*/

    $('.handler').bind('mousedown', function(e) {
        $('.wrapper-slider').bind('mousemove', function(e) {
            var $height = e.pageY - $('.switcher').offset().top;
            var $height1 = $(this).height() - $height;
            var top = e.pageY - $(this).offset().top;
            if(top > 0 && top < ($(this).offset().top + $(this).height())) {
                $('.switcher').height($height);
                $('.switcher-1').height($height1);
                $('.handler').css('top', top + 'px');
            }
        });

        $('.handler').bind('mouseup', function() {
            $('.wrapper-slider').unbind('mousemove');
        });
    });

    $('body').bind('mouseup', function() {
        $('.wrapper-slider').unbind('mousemove');
    });

    function loader_position() {
        var $top = ($(window).height() - $('.wrapp-loader').height()) / 2;
        var $left = ($(window).width() - $('.wrapp-loader').width()) / 2;
        $('.wrapp-loader').css({top: $top + 'px', left: $left + 'px'});
    }

    
    function animate_loader() {
        loader_position();
        $('.shadow').fadeIn(0);
        $('.slider-content').css('opacity', '0');
        $('.wrapp-loader').css('display', 'block');
        $('.img-g').css('left', '-260px');
        $('.img-c').css('right', '260px');
        $('.img-g, .img-c').css('opacity', '0');
        var handler_top = $('.handler').offset().top;
        var handler_left = $('.handler').offset().left;
        var handler_width = $('.handler').width();
        $('.cube').animate({width: '0px', height: '0px', left: '30px', top: '30px'}, 300, function() {
            $(this).animate({width: '100%', height: '100%', left: '0px', top: '0px', borderRadius: '0px'}, 300)
        });

        $('.cube').css( { transition: "transform 0.6s",
                  transform:  "rotate(" + -60 + "deg)" } );

            setTimeout(function() {
            $('.cube').css( { transition: "transform 0.3s",
            transform:  "rotate(" + 0 + "deg)" } );
            }, 600);
            setTimeout(function() {
                $('.shadow').fadeOut(900);
                $('.wrapp-loader').animate({width: handler_width + 'px', height: '8px', left: handler_left + 'px', top: handler_top + 'px'}, 600, function() {
                    $('.slider-content').animate({opacity: '1'}, 300, function() {
                        $('.wrapp-loader').css('display', 'none');
                    });
                });
            }, 900);

            setTimeout(function() {
            $('.img-g').animate({left: '-60px', opacity: '1'}, 700);
            $('.img-c').animate({right: '-60px', opacity: '1'}, 1100,'easeOutQuart');
            }, 900);
    }

    if($(window).width() > 768) {
        animate_loader(); 
    }

    $(window).resize(function() {
        bind_unbind();
        loader_position();
    });

});