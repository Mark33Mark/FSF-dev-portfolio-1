/*=======================================================================
 *
 *   Javascript 
 *        - Script common to all 3 pages: main.html, works.html, contact.html
 *        - This script handles a number of actions - function names adopted
 *          descripe the function.
 *   File created: 14 October 2021
 *   Created by:   Mark Watson
 *
 *=======================================================================*/ 

  
const toggle  = document.getElementById( "theme-control" ),
      text    = document.querySelector( ".b-site--theme-text" );
      
themeOff = () => {

  document.body.classList.add( "t-dark" );
  toggle.classList.remove( "icon-moon" );
  toggle.classList.add( "icon-sun" );
  text.innerHTML = `<br />lights on?`;
}

if (localStorage.getItem( "t-dark" )) {
  themeOff();
} else {
  toggle.classList.add( "icon-moon" );
  toggle.classList.remove( "icon-sun" );
}

toggle.addEventListener( "click", function ( event ) {
  event.preventDefault();

  if (document.body.classList.contains( "t-dark" )) {
    document.body.classList.remove( "t-dark" );
    toggle.classList.remove( "icon-sun" );
    toggle.classList.add( "icon-moon");
    text.innerHTML        = "<br />lights off?";
    localStorage.removeItem( "t-dark" );

  } else {
    themeOff();
    localStorage.setItem( "t-dark", true );
  }
});

/* =========================================================================================== */
// Found this idea at: https://www.creativebloq.com/inspiration/css-animation-examples
// Part of my exploration of fun animation effects. 
const moveableEl = document.getElementById("movable");

handleMouseMove = e => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const yAxisDegree = e.pageX / width * 100 - 20;
  const xAxisDegree = e.pageY / height * -1 * 80 + 20;

  moveableEl.style.transform = `rotateY(${yAxisDegree}deg) rotateX(${xAxisDegree}deg)`;
  // Set the sheen position
  setSheenPosition(e.pageX / width, e.pageY / width);
};

setSheenPosition = (xRatio, yRatio) => {
 
  // This creates a "distance" up to 400px each direction to offset the sheen
  const xOffset = 1 - (xRatio - 0.5) * 800;
  const yOffset = 1 - (yRatio - 0.5) * 800;
 
  moveableEl.style.setProperty( '--sheenX', `${xOffset}px` );
  moveableEl.style.setProperty( '--sheenY', `${yOffset}px` );
};

clearCoOrdinates = () =>{
  const xReset = 0;
  const yReset = 0;

  moveableEl.style.transform = `rotateY(${yReset}deg) rotateX(${xReset}deg)`;
};

/* =========================================================================================== */

const aQuote       = document.getElementById("b-quote-me");
let quotesCalled = []; 

quoteGenerator = () => {
  // Running this once to avoid delay from the setInterval for the 1st run.
  // User should see a quote as quickly as possible from opening the page.
  
  fetch("https://type.fit/api/quotes")  
    .then(response => {
    if (response.ok) {
      response
        .json()
  
        .then(function (data) {
          console.log(data);
          
          quotesCalled = data;
          let availableQuotes = data.length;

          console.log(`Array length = ${availableQuotes}`);

          let selectedQuote = randomSelection( 0, availableQuotes );

          console.log(`Random number returned = ${selectedQuote}`);

          let html = `<blockquote class="b-vertical-centre animate-fading">"${data[selectedQuote].text}"
          <br /><span class="quote-by"><strong>quoting:</strong> ${quotesCalled[selectedQuote].author}</span></blockquote>`;
          aQuote.innerHTML = html;

        });
      }
    });
  
    setInterval( () => {
      
      let availableQuotes = quotesCalled.length;
      let selectedQuote = randomSelection( 0, availableQuotes );

      let html = `<blockquote class="b-vertical-centre animate-fading">"${quotesCalled[selectedQuote].text}"
      <br /><span class="quote-by"><strong>quoting:</strong> ${quotesCalled[selectedQuote].author}</span></blockquote>`;
      aQuote.innerHTML = html;
    }, 14000);  // align this setting with the CSS fade, line 567 of the style.css file.

    randomSelection = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      //The maximum is inclusive and the minimum is inclusive
      return Math.floor(Math.random() * (max - min + 1) + min); 
    };
  };

 /* =========================================================================================== */

const closeTip     = document.getElementById("close-me"),
      tooltipLabel = document.getElementById("tooltip-label"),
      logoHover    = document.getElementById("watson-logo");

closeTip.addEventListener('click', event => {
  tooltipLabel.style.visibility = "hidden";
  closeTip.style.visibility = "hidden";
  localStorage.setItem( "tooltip-off", true );
});

logoHover.addEventListener('mouseover', event => {
  tooltipLabel.style.visibility = "visible"; 
  closeTip.style.visibility = "hidden";
});

logoHover.addEventListener('mouseout', event => {
  tooltipLabel.style.visibility = "hidden"; 
});

 /* =========================================================================================== */

// Doing this to avoid the resume prompt every time the user opens the page - you only need it 
// once.  I implemented this to be user friendly for mobile phone users.

checkTooltipStatus = () => {
  localStorage.getItem( "tooltip-off" ) ? tooltipLabel.style.visibility = "hidden" 
                                        : console.log(`resume tooltip off`)
};


 /* =========================================================================================== */

checkTooltipStatus();
quoteGenerator();

// ====================================================================================
