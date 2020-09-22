var $body = $('body'),
    $sidebar = $('#sidebar'),
    $background = $('#sidebar .background');
    $sidebarCloseButton = $('#sidebar .top .button-close'),
    $logout = $('#sidebar .bottom .button.logout'),

addEventHandlerForClosingSidebar();

//HELPERS

function addEventHandlerForClosingSidebar() {
    $background.off().on('click', closeSideBar);
    $sidebarCloseButton.off().on('click', closeSideBar);
}

function closeSideBar() {
    if ($sidebar.hasClass('open')) {
        $sidebar.addClass('animation');
        $sidebar.removeClass('open');
        $sidebar.addClass('close');
        $body.removeClass('no-overflow');
        setTimeout(function () {
            $sidebar.removeClass('animation'); 
        },500);
    }
}

$logout.off().on('click', function() {
    setCookie('isLoggedIn', false);
    window.location.href = '/';
});

translateComponent('sidebar');

if (!userIsLoggedIn) {
    $logout.remove();
}