
/* Game logic */

const colors = ['#393E46', '#00ADB5', '#F8B500', '#1C1124', '#F94C66', '#7BC74D'];

const cards = {}

let positions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
//

/* Cards structure

cards = {
    1: '#393E46',
    2: '#7BC74D',
    3: '#393E46'
}

*/

// Put the colors in cards in random positions 

/* 
    12 positions 
*/

const createCard = () => {
    const card = document.createElement('div');

    // Add the class card to the card element
    card.classList.add('card');

    return card;
}

// Method to get a card randomly (0 - 12)
const randomValueFromArray = () => {

    let value = positions[Math.floor(Math.random() * positions.length)];

    positions = positions.filter(num => num != value);

    return value;
}


// Method to put the color of all cards
const setCardsColor = () => {


    colors.forEach(color => {

        let position1 = randomValueFromArray();

        let position2 = randomValueFromArray();

        cards[position1] = color;
        cards[position2] = color;
    });
}

// Cards selected
let attemptsCount = 0;

let selectedCards = [];

// References of the selected cards
let selectedCardsRef = [];

let time = 0;

let firstTimePlaying = 1;

// When the player choose a card, the counter will start
const updateCounter = () => {
    // Get the element 
    const counterElement = document.getElementById('counter');

    counterElement.innerHTML = time;
    time += 1;
}


// Función for to choose an option 
const chooseOption = (event = PointerEvent) => {

    if (firstTimePlaying == 1) {
        setInterval(updateCounter, 1000);
        firstTimePlaying += 1;
    }

    // Add the animation to the div
    event.target.classList.remove('guessed');
    event.target.classList.add('guessed');
    console.log(event.target.classList);

    // Change the color 1 second after

    // Get the cards container
    const cardsContainer = document.getElementById('cards-container');

    // we look for the index of the child
    cardsContainer.childNodes.forEach((child, i) => {
        if (child === event.target) {

            // Set the background color
            event.target.style.backgroundColor = cards[i];

            selectedCards.push(cards[i]);
            selectedCardsRef.push(event.target);
        }
    });

    attemptsCount += 1;
}

// Function that determinate if a pair choose is correct
const isCorrect = async () => {

    let selectedCard1Ref = selectedCardsRef[0];
    let selectedCard2Ref = selectedCardsRef[1];

    let selectedCard1 = selectedCards[0];
    let selectedCard2 = selectedCards[1];

    console.log('Chooses: ', selectedCards);

    attemptsCount = 0;
    selectedCards = [];
    selectedCardsRef = [];

    // If the choose is not correct
    if (selectedCard1 !== selectedCard2) {
        console.log('removing');

        const removeClass = new Promise((resolve) => {

            setTimeout(() => {
                selectedCard1Ref.classList.remove('guessed');
                selectedCard2Ref.classList.remove('guessed');

                resolve('first')
            }, 500);
        });

        const addCardColor = new Promise((resolve) => {

            setTimeout(() => {
                selectedCard1Ref.classList.add('guessed');

                selectedCard2Ref.classList.add('guessed');

                selectedCard1Ref.style.backgroundColor = '#F2F4F6';
                selectedCard2Ref.style.backgroundColor = '#F2F4F6';

                // Clean the options lists
                resolve('Done');
            }, 800);
        });

        const removeClassAgain = new Promise((resolve) => {

            setTimeout(() => {
                selectedCard1Ref.classList.remove('guessed');

                selectedCard2Ref.classList.remove('guessed');

                selectedCard1Ref.style.backgroundColor = '#F2F4F6';
                selectedCard2Ref.style.backgroundColor = '#F2F4F6';

                // Clean the options lists
                resolve('Class removed');
            }, 1200);
        });

        let promises = [removeClass, addCardColor, removeClassAgain];

        await Promise.all(promises).then(arr => console.log(arr));



        return new Promise(resolve => {
            

            resolve('Completed');
        });
    }
}


// Funcion to controll the chooses
const chooseController = async (event) => {

    // Choose an option
    chooseOption(event);

    // If the cards selected is 2, we check if the player chose the correct cards
    if (attemptsCount == 2) {

        msg = await isCorrect();
        console.log(msg)
    }
}


// Functión to create the first 12 cards
const createCards = () => {

    // Get the cards container
    const cardsContainer = document.getElementById('cards-container');

    for (let i = 0; i < 12; i++) {
        let card = createCard();


        // Add an action event listener for every card
        card.addEventListener('click', chooseController);

        cardsContainer.appendChild(card);
    }
}

setCardsColor()
createCards();