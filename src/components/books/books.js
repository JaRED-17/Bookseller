var $booksContainer = $('#content #books .container');

getBooks();

//HELPERS

function getBooks() {
    $.when(getData()).done(function (response) {
        var books = [];

        for (key in response) {
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
        
        $booksContainer.html(books);
    });
}