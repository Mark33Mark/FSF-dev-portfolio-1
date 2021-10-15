
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

const aQuote       = document.getElementById("quote-me");
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

          let html = `<blockquote class="animate-fading">"${data[selectedQuote].text}
          <br />quoting: ${data[selectedQuote].author}</blockquote>`;
          aQuote.innerHTML = html;

        });
      }
    });
  
    setInterval( () => {
      
      let availableQuotes = quotesCalled.length;
      let selectedQuote = randomSelection( 0, availableQuotes );

      let html = `<blockquote class="animate-fading">"${quotesCalled[selectedQuote].text}"
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