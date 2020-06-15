var $body = $('body'),
    $closeButton = $('#popup .container .top .button-close');

$closeButton.off().on('click', function() {
    $('#popup').removeClass('open');
    $('#popup').addClass('close');
    $body.removeClass('no-overflow');
});
