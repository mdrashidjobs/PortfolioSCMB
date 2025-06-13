/*
 * Basic sample
*/

function addPage(page, book) {

	var id, pages = book.turn('pages');

	// Create a new element for this page
	var element = $('<div />', {});

	// Add the page to the flipbook
	if (book.turn('addPage', element, page)) {

		// Add the initial HTML
		// It will contain a loader indicator and a gradient
		element.html('<div class="gradient"></div><div class="loader"></div>');

		// Load the page
		loadPage(page, element);
	}

}

function loadPage(page, pageElement) {

	// Create an image element

	var img = $('<img />');

	img.mousedown(function(e) {
		e.preventDefault();
	});

	img.load(function() {
		
		// Set the size
		$(this).css({width: '100%', height: '100%'});

		// Add the image to the page after loaded

		$(this).appendTo(pageElement);

		// Remove the loader indicator
		
		pageElement.find('.loader').remove();
	});

	// Load the page

	img.attr('src', 'pages/' +  page + '.jpg');

}


function loadLargePage(page, pageElement) {
	
	var img = $('<img />');

	img.load(function() {

		var prevImg = pageElement.find('img');
		$(this).css({width: '100%', height: '100%'});
		$(this).appendTo(pageElement);
		prevImg.remove();
		
	});

	// Loadnew page
	
	img.attr('src', 'pages/' +  page + '-large.jpg');
}


function loadSmallPage(page, pageElement) {
	
	var img = pageElement.find('img');

	img.css({width: '100%', height: '100%'});

	img.unbind('load');
	// Loadnew page

	img.attr('src', 'pages/' +  page + '.jpg');
}



// http://code.google.com/p/chromium/issues/detail?id=128488
function isChrome() {

	return navigator.userAgent.indexOf('Chrome')!=-1;

}

pageSound.volume = 1.0;
bgMusic.volume = 0.5; // or 1.0 if you want full volume

let musicOn = false;
musicToggle.addEventListener('click', () => {
    if (musicOn) {
        bgMusic.pause();
        musicToggle.textContent = "🔇 Music Off";
    } else {
        bgMusic.play().catch((e) => {
            console.log("Music play failed:", e);
        });
        musicToggle.textContent = "🔊 Music On";
    }
    musicOn = !musicOn;
});
when: {
    turning: function() {
        pageSound.currentTime = 0;
        pageSound.play().catch((e) => {
            console.log("Page sound failed:", e);
        });
    },
    turned: function(event, page) {
        pageSlider.value = page;
    }
}
