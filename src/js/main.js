//MAIN

var $body = $('body'),
    $header = $('#header'),
    $sidebar = $('#sidebar'),
    $footer = $('#footer'),
    $preloader = $('#preloader'),
    $content = $('#content'),
    $notification = $('#notification'),
    $popup = $('#popup');

var url = new URL(window.location.href),
    pathname = url.pathname.replace(/\//g,'');

appendComponent('preloader', $preloader, showPreloader);
appendComponent('header', $header);
appendComponent('sidebar', $sidebar);
appendComponent('footer', $footer);
appendComponent('notification', $notification);
appendComponent('popup', $popup);
$(document).off().on('scroll', onScrollEvent);
if (pathname) {
    appendComponent(pathname, $content);
}
else {
    generateMainPage();
}
hidePreloader();

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
    callback = callback || function () {};

    includeElementAsync("src/components/" + componentName + "/" + componentName + ".css", 'link', function () {
        $.when(getComponent(componentName)).done(function (response) {
            if (response) {
                $(componentId).html(response);
                callback();
                includeElementAsync("src/components/" + componentName + "/" + componentName + ".js", 'script');
            }
        });
    });    
}

function generateMainPage() {
    for (var i = 0; i < 256; i++) {
        var div = document.createElement('div');
        if (i == 0) {
            div.className = 'container';
            document.getElementById('content').append(div);
        }
        else {
            div.className = 'div' + i.toString();
            div.style = 'background-color: rgb(' + (255 - i).toString() + ',255,' + i.toString() + ')';
            if (i - 1 == 0) {
                $('#content .container').append(div);
            }	
            else {
                document.getElementsByClassName('div' + (i - 1).toString())[0].append(div);
            }
        }				
    }

    $.when(getData()).done(function (response) {
        var books = [],
            $contentContainer = $('#content .container');

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

        $contentContainer.append('<div id="searchbar"></div>');
        $contentContainer.append(['<div class="books">',
                                    books,
                                  '</div>'
                                ].join(''));

        appendComponent('searchbar', $('#searchbar'));
    });
}

function getData() {
    return $.ajax({
        url: "src/data/books.json",
        dataType: "json",
        success: function(response) {
            return response;
        },
        error: function() {
            console.log('a request has been failed: data.json');
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
    onload = onload || function () {};
    var parent = type === 'link' ? document.head : document.body;

    if(!isElemExist(type, url)) {
        $.get(url).done(function() {
        
            var elem = document.createElement(type);
    
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
        });
    }
    else {
        onload.apply(null, arguments);        
    }
}

function isElemExist(type, url) {
    var $elem = $(type + "[" + (type === "link" ? "href" : "src") + "='" + url + "']");
    if ($elem.length > 0) {
        return true;
    }
    return false;
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