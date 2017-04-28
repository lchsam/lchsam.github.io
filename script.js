//Smooth scrolling when jumping to different sections
$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});

//Change opacity for navigation buttons when scrolling to different parts of page
function changeNavOpacity() {
  if($(this).scrollTop()>=$('.resume').position().top){
    $('#nav-resume').animate({
      opacity: '0.3'
    });
    $('#nav-about').animate({
      opacity: '1'
    });
    $('#nav-portfolio').animate({
      opacity: '1'
    });
  } else if ($(this).scrollTop()>=$('.portfolio').position().top){
    $('#nav-portfolio').animate({
      opacity: '0.3'
    });
    $('#nav-about').animate({
      opacity: '1'
    });
    $('#nav-resume').animate({
      opacity: '1'
    });
  } else if ($(this).scrollTop()>=$('#about').position().top){
    $('#nav-about').animate({
      opacity: '0.3'
    });
    $('#nav-portfolio').animate({
      opacity: '1'
    });
    $('#nav-resume').animate({
      opacity: '1'
    });
  }
}

//Change navigation buttons based on whichever place the site loads.
$(document).one('ready', changeNavOpacity());

/*
$('.nav-link').click(function(event) {

    if ($(event.target).is('#nav-about')) {
       $('#nav-about').animate({
         opacity: '0.3'
       });
       $('#nav-portfolio').animate({
         opacity: '1'
       });
       $('#nav-resume').animate({
         opacity: '1'
       });
    } else if ($(event.target).is('#nav-portfolio')) {
      $('#nav-portfolio').animate({
        opacity: '0.3'
      });
      $('#nav-about').animate({
        opacity: '1'
      });
      $('#nav-resume').animate({
        opacity: '1'
      });
    } else if ($(event.target).is('#nav-resume')) {
      $('#nav-resume').animate({
        opacity: '0.3'
      });
      $('#nav-about').animate({
        opacity: '1'
      });
      $('#nav-portfolio').animate({
        opacity: '1'
      });
    }
});
*/

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

//Change opacity of navigation button checking where is scrolled.
//Weird how changeNavOpacity doesn't need parenthsis here.
$(document).on('scroll', debounce(changeNavOpacity, 100));

//Still fixing autoslide.
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
