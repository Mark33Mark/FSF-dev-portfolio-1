
const recipeCard = document.getElementById("lettuce-eat");
const weatherCard = document.getElementById("weather-dashboard");
const quizCard = document.getElementById("code-quiz");
const schedulerCard = document.getElementById("workday-scheduler");


hideAllCards = () => {
    recipeCard.style.display = 'none';
    weatherCard.style.display = 'none';
    quizCard.style.display = 'none';
    schedulerCard.style.display = 'none';
}

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
        })
    })

showCard = ( theID ) => {
    (theID === "recipe")? recipeCard.style.display = 'block':
    (theID === "weather")? weatherCard.style.display = 'block':
    (theID === "quiz")? quizCard.style.display = 'block':
    (theID === "workday")? schedulerCard.style.display = 'block':console.log(`no card`);
}

hideAllCards();