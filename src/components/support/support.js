var $submitButton = $('#content #contactForm .button'),
    $title = $('head title');

$title.html('Contact us | Bookseller');   

$submitButton.off().on('click', function() {
    var hasError = false,
        fields = ['first_name','last_name','email', 'subject','message'];

    for (var i = 0; i < fields.length; i++) {
        var $field = $('#contact_' + fields[i]),
            $error = $('#contact_' + fields[i] + '_error');

        if ($field.val()) {
            $field.addClass('success');
            $field.removeClass('error');
            $error.hide();
        }
        else {
            hasError = true;
            $field.addClass('error');
            $field.removeClass('success');
            showNotification(allTranslations.error[1][currentLanguage]);
            $error.text(allTranslations.error[2][currentLanguage]);
            $error.show();
        }        
    }  

    if (!hasError) {
        showPreloader();
        var data = $("#contactForm").serialize({});
        for (var i = 0; i < fields.length; i++) {
            var $field = $('#contact_' + fields[i]);
            $field.removeClass('success');
        }
        $('#contactForm').trigger('reset');
        hidePreloader();
        setTimeout(function() {
            showNotification(allTranslations.success[1][currentLanguage]);
        },1000);        
    }
});

translateComponent('support');

if (userIsLoggedIn) {
    $.when(getUserData()).done(function(response) {
        for (key in response.user1.data) {
            $('#contact_' + key).val(response.user1.data[key]);
        }
    });   
}