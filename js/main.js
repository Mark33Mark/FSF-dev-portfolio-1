
/* =========================================================================================== */      

const toggle          = document.getElementById( "theme-control" ),
      text            = document.querySelector( ".b-site--theme-text" );
      
let themeOff = () => {

  document.body.classList.add( "t-dark" );
  toggle.classList.remove( "icon-moon" );
  toggle.classList.add( "icon-sun" );
  text.innerText = "lights on?";
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
    text.innerText        = "dim lights?";
    localStorage.removeItem( "t-dark" );

  } else {
    themeOff();
    localStorage.setItem( "t-dark", true );
  }
});

/* =========================================================================================== */
// Found at: https://www.creativebloq.com/inspiration/css-animation-examples
// Part of my exploration of fun animation effects.
const moveableEl = document.getElementById("movable");

let handleMouseMove = e => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const yAxisDegree = e.pageX / width * 100 - 20;
  const xAxisDegree = e.pageY / height * -1 * 80 + 20;

  moveableEl.style.transform = `rotateY(${yAxisDegree}deg) rotateX(${xAxisDegree}deg)`;
  // Set the sheen position
  setSheenPosition(e.pageX / width, e.pageY / width);
}

function setSheenPosition(xRatio, yRatio) {
 
  // This creates a "distance" up to 400px each direction to offset the sheen
  const xOffset = 1 - (xRatio - 0.5) * 800;
  const yOffset = 1 - (yRatio - 0.5) * 800;
 
  moveableEl.style.setProperty('--sheenX', `${xOffset}px`);
  moveableEl.style.setProperty('--sheenY', `${yOffset}px`);
}

let clearCoOrdinates = () =>{
  const xReset = 0;
  const yReset = 0;

  moveableEl.style.transform = `rotateY(${yReset}deg) rotateX(${xReset}deg)`;
}

/* =========================================================================================== */

const aQuote       = document.getElementById("b-quote-me");
let quotesCalled = []; 

let quoteGenerator = () => {
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

          let html = `<blockquote class="b-vertical-centre animate-fading">"${data[selectedQuote].text}
          <br />quoting: ${data[selectedQuote].author}</blockquote>`;
          aQuote.innerHTML = html;

        });
      }
    });
  
    setInterval( () => {
      
      let availableQuotes = quotesCalled.length;
      let selectedQuote = randomSelection( 0, availableQuotes );

      let html = `<blockquote class="b-vertical-centre animate-fading">"${quotesCalled[selectedQuote].text}"
      <br />quoting: ${quotesCalled[selectedQuote].author}</blockquote>`;
      aQuote.innerHTML = html;
    }, 11000);

    function randomSelection(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      //The maximum is inclusive and the minimum is inclusive
      return Math.floor(Math.random() * (max - min + 1) + min); 
    }
  }

 /* =========================================================================================== */

 quoteGenerator();