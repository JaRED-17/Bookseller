//MAIN

var $body = $('body'),
    $header = $('#header'),
    $sidebar = $('#sidebar'),
    $footer = $('#footer'),
    $preloader = $('#preloader'),
    $content = $('#content'),
    $notification = $('#notification'),
    $popup = $('#popup'),
    $languageSelector = $('#language');

var url = new URL(window.location.href),
    pathname = url.pathname.replace(/\//g,''),
    componentsData = {},
    defaultLanguage = 'en',
    allTranslations = {};

$.when(getData('components'), getTranslations()).done(function (response, translations) {
    componentsData = response[0];
    allTranslations = translations[0];

    appendComponent('preloader', $preloader, showPreloader);
    appendComponent('header', $header);
    appendComponent('sidebar', $sidebar);
    appendComponent('footer', $footer);
    appendComponent('notification', $notification);
    appendComponent('popup', $popup);
    $(document).off().on('scroll', onScrollEvent);
    if (pathname) {
        appendComponent(pathname, $content, hidePreloader);
    }
    else {
        appendComponent('main', $content, hidePreloader);
    }
    //translateAll();
});

//HELPERS

function getComponent(name) {
    return $.ajax({
        method: "GET",
        url: "src/components/" + name + "/" + name + ".html",
        dataType: "html",
        async: false,
        success: function(response) {
            return response;
        },
        error: function() {
            console.log('a request has been failed: ' + name);
        }
    });
}

function appendComponent(componentName, componentId, callback) {
    var allowDoubleUploadFor = ['login'],
        componentData = componentsData[componentName];

    callback = callback || function () {};

    if (window['component' + componentName + 'hasBeenAdded']) {
        if (allowDoubleUploadFor.indexOf(componentName) == -1) {
            callback();
        }
        else {
            if (shouldItbeAdded(componentData, 'html')) {
                $.when(getComponent(componentName)).done(function (response) {
                    if (response) {
                        $(componentId).html(response);
                        callback();
                    }
                });
            }
        }
    }
    else {
        var proceedCallback = function () {
            if (shouldItbeAdded(componentData, 'html')) {
                $.when(getComponent(componentName)).done(function (response) {
                    if (response) {
                        $(componentId).html(response);
                        callback();
                        if (shouldItbeAdded(componentData, 'js')) {
                            includeElementAsync("src/components/" + componentName + "/" + componentName + ".js", 'script');
                        }
                    }
                });
            }
        };

        if (shouldItbeAdded(componentData, 'css')) {
            includeElementAsync("src/components/" + componentName + "/" + componentName + ".css", 'link', proceedCallback); 
        }
        else {
            proceedCallback();     
        }
        window['component' + componentName + 'hasBeenAdded'] = true;
    }
}

function getData(fileName) {
    var fileName = fileName || "books";

    return $.ajax({
        url: "src/data/" + fileName + ".json",
        dataType: "json",
        success: function(response) {
            return response;
        },
        error: function() {
            console.log('a request has been failed: ' + fileName + '.json');
        }
    });   
}

function onScrollEvent() {
    var posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (posTop >= 0 && posTop <= 50) {
        $header.removeClass('scrolled');
    }
    else {
        $header.addClass('scrolled');
    }
}

function shouldItbeAdded(array, name) {
    if (array) {
        return array.indexOf(name) != -1;
    }
    else return true;    
}

//Preloader

function showPreloader() {
    $body.addClass('no-overflow');
    $preloader.show(); 
}

function hidePreloader() {
    setTimeout(function() {
        $preloader.hide();
        $body.removeClass('no-overflow');
    }, 1000);    
}

//Async include

function includeElementAsync(url, type, onload) {
    url = url || '';
    type = type || 'script';
    onload = onload || function() {};
    var parent = type === 'link' ? document.head : document.body,
        elem = document.createElement(type);

    elem.onload = function () {
        elem.onload = null;
        onload.apply(null, arguments);
    };    

    if (type === 'link') {
        elem.rel = 'stylesheet';
        elem.type = 'text/css';
        elem.href = url;            
    }
    else {
        elem.type = 'text/javascript';
        elem.src = url;
    }

    parent.append(elem);
}

function showNotification(message) {
    if($notification.hasClass('close')) {
        $notification.find('p').html(message);
        $notification.show();
        $notification.addClass('open');
        $notification.removeClass('close');
        setTimeout(function() {
            $notification.hide();
            $notification.addClass('close');
            $notification.removeClass('open');
        }, 6000);
    }    
}

//Translations

function getTranslations() {
    return getData('translations');
}

function translateComponent(name, language) {
    var language = language || defaultLanguage,
        componentTranslation = allTranslations[name][language];

    for (key in componentTranslation) {
        $('*[translate_code=' + key + ']').text(componentTranslation[key]);            
    }
}

function getSelectedLanguage() {
    return $languageSelector.val() || defaultLanguage;
}

function translateAll() {
    var language = getSelectedLanguage();

    translateComponent('header', language);
    translateComponent('sidebar', language);
    translateComponent('footer', language);
    translateComponent('searchbar', language);
}