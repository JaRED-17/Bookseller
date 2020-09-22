var $title = $('head title');

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