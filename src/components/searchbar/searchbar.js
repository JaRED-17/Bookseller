var $searchButton = $('#searchbar .container .button.search'),
    $resetButton = $('#searchbar .container .button.reset');

$searchButton.off().on('click', function() {
    var data = $("#genre").val();
    search(data);    
});

$resetButton.off().on('click', function() {    
    search();    
});

//HELPERS

function search(param) {
    $.when(getData()).done(function (response) {
        var books = [],
            $contentContainer = $('#content .container .books');

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
            $contentContainer.html('');
            $contentContainer.append(['<div class="books">',
                                            books,
                                      '</div>'
                                    ].join(''));
        }
    });
}