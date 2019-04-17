$(document).ready(function () {
});


function mdUp() {
    if (window.matchMedia("(min-width: 960px)").matches) {
        return true;
    } else {
        return false;
    }
}

function smUp() {
    if (window.matchMedia("(min-width: 780px)").matches) {
        return true;
    } else {
        return false;
    }
}

(function ($) {
    $(window).on("load", function () {


        //services menu
        var menu = $('.menu');
        var menuOpenBtn = $('.header__menu-btn');
        var menuCloseBtn = $('.menu__close-btn');
        menuOpenBtn.click(function () {
            openMenu();
        });
        menuCloseBtn.click(function () {
            closeMenu();
        });

        function openMenu() {
            menu.addClass('menu--opened');
        }

        function closeMenu() {
            menu.removeClass('menu--opened');
        }

        $('.menu-nav__item-wrapper').hover(function () {
            var bgImage = $(this).attr('data-src');
            $('.intro-info__bg').css(
                {'background-image': 'url(' + bgImage + ')'}
            );
        });

        //popup
        $('.mfp-btn').magnificPopup({
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function () {
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
        });

        //custom scrollbar
        $(".menu-nav__inner").mCustomScrollbar({
            mouseWheel: {preventDefault: true}
        });

        function closeSubMenu() {
            $('.intro-info').find('.menu-nav__subitems').remove();
        }

        //submenu
        $('.menu-nav__item-wrapper--wc').click(function (e) {
            if (mdUp()) {
                e.preventDefault();
                var subMenu = $(this).find('.menu-nav__subitems');
                if ($(this).hasClass('menu-nav__item-wrapper--active')) {
                    $(this).removeClass('menu-nav__item-wrapper--active');
                    closeSubMenu();
                } else {
                    closeSubMenu();
                    $('.menu-nav__item-wrapper--active').removeClass('menu-nav__item-wrapper--active');
                    $(this).addClass('menu-nav__item-wrapper--active');
                    subMenu.css('height', $('.menu').outerHeight());
                    subMenu.clone().appendTo(".intro-info").show();
                }


                $('.intro-info .menu-nav__subitems').mCustomScrollbar();

            } else {
                var subMenu = $(this).find('.menu-nav__subitems');
                subMenu.addClass('menu-nav__subitems--active');
                // submenu.
                $('.menu-nav__subitems--active').mCustomScrollbar();
                if ($(this).find('.menu-nav__subitems-back').length == 0) {
                    subMenu.prepend('<div class="menu-nav__subitems-back">назад к списку услуг</div>')
                    $('.menu-nav__subitems-back').click(function (e) {
                        e.stopPropagation();
                        console.log($(this).closest('.menu-nav__subitems--active'));
                        $(this).closest('.menu-nav__subitems--active').removeClass('menu-nav__subitems--active');
                    });
                }

            }
        });


        $('.menu-nav__item-link').click(function () {
            closeSubMenu();
        });
        $('.menu-nav__subitem').click(function (e) {
            e.preventDefault();
            // alert(1);
            closeSubMenu();
        });


        // $('a[href="#"]').click(function (e) {
        //     e.preventDefault();
        // })


        function calcAboutImg() {
            if (mdUp()) {
                //about img
                var halfOfWindowWidth = $(window).outerWidth() / 2;
                var aboutImageHeight = $('.about__right').outerHeight() - $('.about__title-wrapper').outerHeight();
                var aboutImageWidth = $('.about__img').outerWidth();
                $('.about__img-wrapper').css('height', aboutImageHeight);
                $('.about__img').css('height', aboutImageHeight);

                if ($('.about__img').outerWidth() < halfOfWindowWidth) {
                    $('.about__img').css('width', halfOfWindowWidth);
                }
            } else {
                $('.about__img').css('width', '100%');
            }


        }

        calcAboutImg();

        function caclHalfOfWidth(elem) {
            if (mdUp()) {
                //about img
                var halfOfWindowWidth = $(window).outerWidth() / 2;
                var elemHeight = elem.closest('.container').outerHeight();
                // var aboutImageHeight = $('.about__right').outerHeight() - $('.about__title-wrapper').outerHeight();
                // var aboutImageWidth = $('.about__img').outerWidth();
                elem.css('height', elemHeight);

                if (elem.outerWidth() < halfOfWindowWidth) {
                    elem.css('width', halfOfWindowWidth);
                }
            } else {
                elem.css('width', '100%');
                elem.css('height', '100%');
            }
        }

        if ($('body').hasClass('service-page')) {
            $(window).resize(function () {
                caclHalfOfWidth($('.sp-intro__left-inner'));
                caclHalfOfWidth($('.sp-img-block__right-inner'));
            });
            caclHalfOfWidth($('.sp-intro__left-inner'));
            caclHalfOfWidth($('.sp-img-block__right-inner'));
        }


        if ($('body').hasClass('info-page')) {
            var headerHeight = $('.header').outerHeight();
            $('.ip-intro').mousemove(function (e) {
                var topCoord = event.pageY - headerHeight;
                $('.menu__float-btn').css('bottom', topCoord + 'px');
            });
            $('.menu__float-btn').click(function () {
                if($('.menu.ip-intro__menu-wrapper').hasClass('ip-intro__menu-wrapper--opened')) {
                    $('.menu.ip-intro__menu-wrapper').removeClass('ip-intro__menu-wrapper--opened')
                } else {
                    $('.menu.ip-intro__menu-wrapper').addClass('ip-intro__menu-wrapper--opened')
                }
            })

            $('.ip-intro__menu-close-btn').click(function () {
                $('.menu.ip-intro__menu-wrapper').removeClass('ip-intro__menu-wrapper--opened')

            });
        }

        function calcIntroImgHeight() {
            var introBg = $('.intro-info__bg');
            if (mdUp()) {
                var containerWidth = $('.intro__row').outerWidth();
                var introWidth = $('.intro').outerWidth();
                var freeSpace = (introWidth - containerWidth) / 2;
                var introBgWidth = $('.intro-info').outerWidth() + freeSpace + 60;
                introBg.css('width', introBgWidth);
                introBg.css('height', $('.intro-info').outerHeight());
            } else {
                introBg.css('width', '100%');
                introBg.css('height', '100%');
            }
        }

        var setMapWidth = function () {
            if (mdUp()) {
                var containerWidth = $('.contacts__map-inner').closest('.container').outerWidth();
                var offsetWidth = $(window).width() - containerWidth;
                var mapWidth = $('.contacts__map-inner').outerWidth() + offsetWidth / 2 + 30;
                $('.contacts__map-inner').css('width', mapWidth + 'px');
            } else {
                $('.contacts__map-inner').css('width', '100%');
            }
        }
        setMapWidth();

        function calcMenuHeight(callback) {
            $('.menu-nav__inner').height($('.intro').outerHeight() - 140);
            callback();
        }

        // calcMenuHeight(calcIntroImgHeight);
        calcIntroImgHeight();
        $(window).resize(function () {
            calcMenuHeight(calcIntroImgHeight);
            setMapWidth();
            calcAboutImg();
        });

        //lazy load for yandex map
        if ($('.contacts__map-inner iframe').length > 0) {
            var windowHeight = $(window).height();

            $(document).on('scroll', function () {
                $('.contacts__map-inner iframe').each(function () {
                    var self = $(this),
                        height = self.offset().top + self.height() - 500;
                    if ($(document).scrollTop() + windowHeight >= height) {
                        $('.contacts__map-inner iframe').attr('src', $('.contacts__map-inner iframe').attr('data-src')).removeAttr('data-src');

                    }
                });
            });
        }

        $('.menu-nav__item-wrapper[data-src]').each(function () {
            $('.menu-images').append('<div style="background-image: url(' + $(this).attr('data-src') + ')"><div>');
        });

        if (!mdUp()) {
            console.log('test');
            $('.project-item').each(function () {
                $(this).detach().appendTo('.projects__mobile-slider-inner');
            });
            var projectsSlider = $('.projects__mobile-slider-inner').slick({
                slidesToShow: 1,
                arrows: false,
                dots: false,
            });

            var prevBtn = $('#sliderPrevBtn');
            var nextBtn = $('#sliderNextBtn');

            prevBtn.click(function () {
                projectsSlider.slick('slickPrev');
            })
            nextBtn.click(function () {
                projectsSlider.slick('slickNext');
            })
        }

    });


})(jQuery);