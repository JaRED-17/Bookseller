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
    var $container = $('#content #books .container'),
        $booksContainer = $('#content #books .container .books');

    $booksContainer.html($preloader[0].innerHTML);
    $booksContainer.addClass('loading');

    $.when(getData()).done(function (response) {
        var books = [],
            regex = new RegExp(searchWord, );

        for (key in response) {
            if (genre || searchWord) {
                if (genre !== '' && searchWord === '') {
                    if (response[key].genre === genre) {
                        books.push(response[key]); 
                    }
                }
                else if (genre === '' && searchWord !== '') {
                    if (regex.test(response[key].title)) {
                        books.push(response[key]); 
                    }                   
                }
                else if (genre !== '' && searchWord !== '') {
                    if (response[key].genre === genre && regex.test(response[key].title)) {
                        books.push(response[key]); 
                    }                   
                }
            }
            else {
                books.push(response[key]);
            }
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

                if (html) {
                    setTimeout(function() { 
                        $booksContainer.html(html);                                                  
                        $booksContainer.removeClass('loading');
                    }, 500);
                }
            }
        })       
    });
}

translateComponent('searchbar');