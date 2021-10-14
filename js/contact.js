
const contactForm = document.getElementById("contact-form");
const submitLoader = document.getElementById("submit-loader");

submitLoader.style.opacity = 0;

contactForm.addEventListener('submit', function( event ) {
  event.preventDefault();

  const formData = new FormData(this);  // creating a class from the form's data.
  const formEndpoint = 'https://formspree.io/f/mrgrvzqw';

  // fade in
  fadeIn(submitLoader, 3000);

//fetch('sendEmail.php', {
  fetch(formEndpoint, {
      method: 'post',
      body: formData

    }).then( function ( response ) {
      return response.text();

    }).then(function( text ) {
      fadeOut(submitLoader);
      console.log( text );

    }).catch(function( error ) {
      fadeOut(submitLoader);
      console.error(error);
    })
});


 /* Fade-out function
    https://dev.to/bmsvieira/vanilla-js-fadein-out-2a6o
 */
 let fadeOut = el => {

  el.style.opacity = 1;

  (function fade() {
      if ((el.style.opacity -= 0.1) < 0) {
          el.style.display = "none";
      } else {
          requestAnimationFrame(fade);
      }
  })();
};

 /* Fade-in function
    https://dev.to/bmsvieira/vanilla-js-fadein-out-2a6o
 */
let fadeIn = (el, time, display) => {
  
  el.style.opacity = 0;
  el.style.display = display || "block";
  
  let last = +new Date();
  let tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
};

