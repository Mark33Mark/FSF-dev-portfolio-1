
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

/* ======================================================================== */



