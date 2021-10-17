/*========================================================================================
 *
 *   Javascript 
 *        - Script for contact.html
 *        - This script handles the functionality of the email form.  It works.
 *          I also got it to work on my host site using php.  Did not realise 
 *          GitHub do not provide php at the time I was doing this.  Learning!
 *           
 *   File created: 14 October 2021
 *   Created by:   Mark Watson
 *
 *=========================================================================================*/ 


const contactForm = document.getElementById("contact-form");
const submitLoader = document.getElementById("submit-loader");
const messageWarning = document.getElementById("message-warning");
const messageSuccess = document.getElementById("message-success");
const formEndpoint   = 'https://formspree.io/f/mrgrvzqw';  // done due to GitHub not having php.

submitLoader.style.opacity = 0;
messageSuccess.style.opacity = 0;

contactForm.addEventListener('submit', function( event ) {
  event.preventDefault();

  // creating a class from the form's data.
  const formData = new FormData(this); 

  // fade in
  fadeIn(submitLoader, 1500);

  //fetch('sendEmail.php', {   <= if I move this site to my host then I'll switch this on.
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
    });
});

// ====================================================================================

// I didn't want to use jQuery or CSS for fading in and out.  Thought it would be easy
// in JavaScript... I was wrong.  Ended up finding a site that talks about the need for
// fading in to be measured against a clock - it works but a lot more complicated than 
// I initially thought in my head.

 /* Fade-out function
    https://dev.to/bmsvieira/vanilla-js-fadein-out-2a6o
 */
 fadeOut = el => {

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
fadeIn = (el, time, display) => {
  
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

// ====================================================================================