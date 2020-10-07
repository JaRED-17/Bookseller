var $languageSelector = $('#language-selector');
    $languageSelectorButton = $('#language-selector .selector'),
    $languageSelectorOption = $('#language-selector .option');

setLanguage();

//HELPERS

$languageSelectorButton.off().on('click', function() {
    if ($languageSelector.hasClass('open')) {
        $languageSelector.removeClass('open');
        $languageSelector.addClass('close');
    }
    else {
        $languageSelector.removeClass('close');
        $languageSelector.addClass('open');
    }
});

$languageSelectorOption.off().on('click', function() {
    if ($(this).hasClass('en')) {
        $languageSelectorButton.removeClass('ru');
        $languageSelectorButton.addClass('en');
    }
    else if ($(this).hasClass('ru')) {        
        $languageSelectorButton.removeClass('en');
        $languageSelectorButton.addClass('ru');
    }
    $languageSelectorButton.trigger('click');
    setCookie('language', getSelectedLanguage());
    setCurrentLanguage();
    translateAll();
});

function setLanguage() {
    if (currentLanguage == 'ru') {
        $languageSelectorButton.removeClass('en');
        $languageSelectorButton.addClass('ru');       
    }
}