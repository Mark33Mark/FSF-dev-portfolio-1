
const contactForm = document.getElementById("contact-form");
const submitLoader = document.getElementById("submit-loader");
const messageWarning = document.getElementById("message-warning");
const messageSuccess = document.getElementById("message-success");
const formEndpoint   = 'https://formspree.io/f/mrgrvzqw';

submitLoader.style.opacity = 0;
messageSuccess.style.opacity = 0;

contactForm.addEventListener('submit', function( event ) {
  event.preventDefault();

  const formData = new FormData(this);  // creating a class from the form's data.

  // fade in
  fadeIn(submitLoader, 1500);

//fetch('sendEmail.php', {
  fetch(formEndpoint, {
      method: 'post',
      mode: "no-cors",
      body: formData

    }).then( function ( response ) {
      return response.text();

    }).then(function( text ) {
      messageWarning.style.opacity = 0;
      fadeOut(submitLoader);
      fadeOut(contactForm);
      fadeIn(messageSuccess, 2000);
      console.log( text );

    }).catch(function( error ) {
      fadeOut(submitLoader);
      messageWarning.innerHTML(error);
      fadeIn(messageWarning, 1000);
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

