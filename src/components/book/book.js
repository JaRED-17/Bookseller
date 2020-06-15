var $contentContainer = $('#content .container'),
    $title = $('head title'),
    href = window.location.href,
    param = href.split('?=');

$.when(getData()).done(function (response) {
    var book = [
        '<div class="book">',
            '<h3>' + response[param[1]].title + '</h3>',
            '<div class="book-info">',
                '<div class="book-img">',
                    '<img src="' + response[param[1]].img + '">', 
                    '<p>Cost: ' + response[param[1]].cost + '</p>',
                '</div>',
                '<div class="book-description">' + response[param[1]].description + '</div>',
            '</div>',
        '</div>'
    ].join('');

    $title.html(response[param[1]].title + ' | Bookseller');
    $contentContainer.html(book);
});