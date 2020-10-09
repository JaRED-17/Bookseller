var $title = $('head title'),
    $itemHeader = $('.item-header');

$title.html('My account | Bookseller');

if (userIsLoggedIn) {
    translateComponent('my-account');
    $.when(getUserData()).done(function(response) {
        for (key in response.user1.data) {
            $('#my-account_' + key).val(response.user1.data[key]);
        }
    });
}
else {
    window.location.href = '/';
}

$itemHeader.off().on('click', function() {
    var $parent = $(this).parent('.item');

    $parent.find('.item-content').slideToggle({
        duration: 300, 
        easing: 'swing'
    });
    if ($parent.hasClass('open')) {
        $parent.removeClass('open');
        $parent.addClass('close');
    }
    else {
        $parent.removeClass('close');
        $parent.addClass('open');    
    }
});
