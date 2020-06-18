var $searchButton = $('#searchbar .container .button.search'),
    $resetButton = $('#searchbar .container .button.reset'),
    $booksContainer = $('#content .container #books'),
    $preloader = $('#preloader');

$searchButton.off().on('click', function() {
    var data = $("#genre").val();
    search(data);    
});

$resetButton.off().on('click', function() {    
    search();    
});

//HELPERS

function search(param) {
    $booksContainer.html($preloader[0].innerHTML);
    $booksContainer.addClass('loading');

    $.when(getData()).done(function (response) {
        var books = [];

        for (key in response) {
            if (param) {
                if (response[key].genre === param) {
                    books += [
                        '<div class="book">',
                            '<h3>' + response[key].title + '</h3>',
                            '<a href="book?=' + key + '">',
                                '<img src="' + response[key].img + '">',
                            '</a>',    
                            '<p>Cost: ' + response[key].cost + '</p>',
                        '</div>'
                    ].join('');
                }
            }
            else {
                books += [
                    '<div class="book">',
                        '<h3>' + response[key].title + '</h3>',
                        '<a href="book?=' + key + '">',
                            '<img src="' + response[key].img + '">',
                        '</a>',    
                        '<p>Cost: ' + response[key].cost + '</p>',
                    '</div>'
                ].join('');   
            }
        }

        if (books) {
            setTimeout(function() { 
                $booksContainer.html('');
                $booksContainer.append(books);                                                   
                $booksContainer.removeClass('loading');
            }, 500);
        }
    });
}