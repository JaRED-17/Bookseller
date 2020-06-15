var $body = $('body'),
    $sidebar = $('#sidebar'),
    $background = $('#sidebar .background');
    $sidebarCloseButton = $('#sidebar .top .button-close');

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