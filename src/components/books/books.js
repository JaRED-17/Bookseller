getBooks();

//HELPERS

function getBooks() {
    $.when(getData()).done(function (response) {
        var books = [],
            $container = $('#content #books .container');
            $booksContainer = $('#content #books .container .books');

        for (key in response) {
            books.push(response[key]);            
        }

        paginationInit($container, books, function(data) {
            var html = generateHtmlTemplate(data);                

            $booksContainer.html(html);
        });
    });
}