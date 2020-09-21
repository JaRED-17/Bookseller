var $login = $('#submit'),
    $message = $('.message');

$login.off().on('click', function() {
    var userLogin = getFormData('login'),
        userPassword = getFormData('password');

    login(userLogin, userPassword, $message);
});

//HELPERS

function getFormData(name) {
    return $('#' + name).val();
}