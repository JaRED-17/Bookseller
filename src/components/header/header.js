var $body = $('body'),
    $sidebar = $('#sidebar'),
    $login = $('#header .header_right .button'),
    $loginContent = $('#popup .container .content'),
    $sidebarOpenButton = $('#header .header_left .button'),
    $preloader = $('#preloader');

addEventHandlerForOpeningSidebar();

//HELPERS

function addEventHandlerForOpeningSidebar() {
    $sidebarOpenButton.off().on('click', function () {
        if ($sidebar.hasClass('close')) {
            $sidebar.removeClass('close');
            $sidebar.addClass('open');
            $body.addClass('no-overflow')     
        }
    });
}

$login.off().on('click', function() {
    $loginContent.html($preloader[0].innerHTML);
    $('#popup').removeClass('close');
    $('#popup').addClass('open');
    $('#popup').addClass('loading');
    $body.addClass('no-overflow');

    setTimeout(function() {
        appendComponent('login', $loginContent, function() {
            $('#popup').removeClass('loading');
        });
    }, 500)
});
