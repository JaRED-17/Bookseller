var $searchButton = $('#searchbar .container .button.search'),
    $resetButton = $('#searchbar .container .button.reset'),
    $preloader = $('#preloader');

$searchButton.off().on('click', function() {
    var genre = $("#genre").val(),
        searchWord = $("#searchWord").val();

    search(genre, searchWord);    
});

$resetButton.off().on('click', function() {    
    search();    
});

//HELPERS

function search(genre, searchWord) {
    var $booksContainer = $('#content #books .container');
    $booksContainer.html($preloader[0].innerHTML);
    $booksContainer.addClass('loading');

    $.when(getData()).done(function (response) {
        var books = [],
            regex = new RegExp(searchWord, );

        for (key in response) {
            if (genre || searchWord) {
                if (genre !== '' && searchWord === '') {
                    if (response[key].genre === genre) {
                        books += bookHtml(response, key).join('');
                    }
                }
                else if (genre === '' && searchWord !== '') {
                    if (regex.test(response[key].title)) {
                        books += bookHtml(response, key).join('');
                    }                   
                }
                else if (genre !== '' && searchWord !== '') {
                    if (response[key].genre === genre && regex.test(response[key].title)) {
                        books += bookHtml(response, key).join('');
                    }                   
                }
            }
            else {
                books += bookHtml(response, key).join(''); 
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

function bookHtml(book, key) {
    return [
        '<div class="book">',
            '<h3>' + book[key].title + '</h3>',
            '<a href="book?=' + key + '">',
                '<img src="' + book[key].img + '">',
            '</a>',    
            '<p>Cost: ' + book[key].cost + '</p>',
        '</div>'
    ];
}

translateComponent('searchbar', getSelectedLanguage());