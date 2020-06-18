var $sliderContainer = $('#content .container #slider .container');

generateSlider();

//HELPERS

function generateSlider() {
    for (var i = 0; i < 256; i++) {
        var div = document.createElement('div');
        div.className = 'div' + i.toString();
        div.style = 'background-color: rgb(' + (255 - i).toString() + ',255,' + i.toString() + ')';
        if (i == 0) {
            $sliderContainer.append(div);
        }	
        else {
            document.getElementsByClassName('div' + (i - 1).toString())[0].append(div);
        }		
    }
}