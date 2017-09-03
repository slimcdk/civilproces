$(window).scroll(function() {
    var topMenu = $("#top-menu");
    var addRemClass = $(window).scrollTop() > 0 ? 'addClass' : 'removeClass';
    if ($("#top-menu-btn").is(":visible")) {
        if (!$("#navbar-collapse-1").is(":visible")) {
            topMenu[addRemClass]('top-nav-scroll');
        }
    } else {
        topMenu[addRemClass]('top-nav-scroll');
    }

    if ($(window).scrollTop() > 0) {
        if (!topMenu.hasClass("top-nav-scroll")) {
            topMenu.addClass("top-nav-scroll");
        }
    }
});


$(window).resize(function() {
    if ($("#top-menu-btn").is(":visible")) {
        if ($("#navbar-collapse-1").is(":visible")) {
            $("#top-menu").addClass('top-nav-scroll');
        }
    } else {
        if ($(window).scrollTop() < 2) {
            $("#top-menu").removeClass('top-nav-scroll');
        }
    }
});


function menuBtnClick() {
    var canSee = $("#navbar-collapse-1").is(":visible");
    var topMenu = $("#top-menu");

    if (canSee) {
        if ($(window).scrollTop() < 2) {
            if (canSee) {
                topMenu.removeClass("top-nav-scroll");
            }
        }
    } else {
        if (!topMenu.hasClass("top-nav-scroll")) {
            topMenu.addClass("top-nav-scroll");
        }
    }
}