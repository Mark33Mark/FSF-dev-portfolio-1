/*=======================================================================
 *
 *   Javascript 
 *        - Works page only
 *        - This page handles the function of the picture cards.
 *   File created: 16 October 2021
 *   Created by:   Mark Watson
 *
 *=======================================================================*/ 


const recipeCard = document.getElementById("lettuce-eat");
const weatherCard = document.getElementById("weather-dashboard");
const quizCard = document.getElementById("code-quiz");
const schedulerCard = document.getElementById("workday-scheduler");
const helpfulTip = document.getElementsByClassName("helpful-tip");


hideAllCards = () => {
    recipeCard.style.display = 'none';
    weatherCard.style.display = 'none';
    quizCard.style.display = 'none';
    schedulerCard.style.display = 'none';
};

document.querySelectorAll('.project-card').forEach(card => {

    card.addEventListener('click', event => {
        
        hideAllCards();

        const cardSelected = event.target;
        let cardID = "";

        console.log(cardSelected.tagName);

        if(cardSelected.tagName === "LI") {
            cardID = cardSelected.className.slice(13);
            console.log(cardID);
        }

        if(cardSelected.tagName === "IMG") {
            cardID = cardSelected.parentElement.className.slice(13);
            console.log(cardSelected.src);
            console.log(cardID);
        }
        if(cardSelected.tagName === "P") {
            console.log(cardSelected.innerHTML);
            cardID = cardSelected.parentElement.className.slice(13);
            console.log(cardID);
        }
        showCard(cardID);
        });
    });

showCard = ( theID ) => {
    (theID === "recipe")? recipeCard.style.display = 'block':
    (theID === "weather")? weatherCard.style.display = 'block':
    (theID === "quiz")? quizCard.style.display = 'block':
    (theID === "workday")? schedulerCard.style.display = 'block':console.log(`no card`);

    /*  adding this as there was a problem on mobile devices where the cards are stacked 
        on top of each other, you can't see the project info.  With this, you can now.
    */
    const activeCardID = `${theID}-title`; 

    document.getElementById(activeCardID).scrollIntoView();

    let userScreen = userDevice();
    console.log(userScreen);
    if ( userScreen === 'isMobile' ) {
        
        console.log(helpfulTip.length);

        for (let i = 0; i < helpfulTip.length; i++) {

            helpfulTip[i].style.display = "inline-block";
         }
    }
};

// ====================================================================================

loadHTML = () => {
    for (let i = 0; i < helpfulTip.length; i++) {
        helpfulTip[i].innerHTML =  `🔼 Please select the GitHub icon for the <strong>application's 
                                    <strong>repository</strong> or the Webpage icon for the 
                                    <strong>deployed application's website</strong>.<hr>`;
    }
};

// ====================================================================================

// Through a lot of effort I worked this out for myself.  I looked for a pattern and realised
// dividing the element count by 2 and then taking the floor of the odd numbers would result
// in 2 integers the same for even and odd numbers, ie. 0, 1 = 0; 2, 3 = 1, 4, 5 = 2, 6, 7 = 3.
// This was needed as there are 2 elements trigging the tooltip.

const tooltipIcons = document.querySelectorAll('.gallery-icon');

for (let i = 0; i < tooltipIcons.length; i++) {
    tooltipIcons[i].addEventListener('mouseover', () => {
        let elementSelect = Math.floor(i/2);
        console.log(document.getElementsByClassName("helpful-tip")[elementSelect]); 
        document.getElementsByClassName("helpful-tip")[elementSelect].style.display='inline-block';
    });
}

for (let i = 0; i < tooltipIcons.length; i++) {
    tooltipIcons[i].addEventListener('mouseout', () => {
        let elementSelect = Math.floor(i/2);
        console.log(document.getElementsByClassName("helpful-tip")[elementSelect]); 
        document.getElementsByClassName("helpful-tip")[elementSelect].style.display='none';
    });
}

// ====================================================================================

// Saw this here: https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
// I like the idea although ran out of time to more broadly implement.

userDevice = () => {      
    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  
    if (isMobile) {
        console.log("User is on a small screen.");
        return 'isMobile';
    }else{
      console.log("User is on a large screen or a massive mobile phone!");
      return 'notMobile';
    }
  };

// ====================================================================================

hideAllCards();
userDevice();
loadHTML();

// ====================================================================================
