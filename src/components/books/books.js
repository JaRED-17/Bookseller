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

        $container.pagination({
            dataSource: books,
            pageSize: 10,
            showPrevious: true,
            showNext: true,
            autoHidePrevious: true,
            autoHideNext: true,
            callback: function(data) {
                var html = generateHtmlTemplate(data);                

                $booksContainer.html(html);
            }
        })
    });
}