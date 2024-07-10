$(document).ready(function () {
    // click hide show nav bar in mobile device and tablet
    $('.menu-btn').click(function () {
        $('.navbar-left').css('left', '0');
        $('.navbar-left').css('opacity', '1');
        $('.menu-btn').hide();
        $('.close-btn').show();

        $('.navbar-left').click(function (event) {
            event.stopPropagation();
        });

    });
    $('.close-btn').click(function () {
        $('.navbar-left').css('left', '-245px');
        $('.navbar-left').css('opacity', '0');
        $('.menu-btn').show();
        $('.close-btn').hide();
    })

    $('.navbar-left').click(function (event) {
        event.stopPropagation();
    });
})
