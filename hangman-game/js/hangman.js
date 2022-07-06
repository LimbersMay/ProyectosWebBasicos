// Function to generate a random number 
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const countElements = (arr, value) => {
    return arr.filter(val => val == value).length;
}

// Functions to create new elements of the DOM
// Function for to create a new letter box 
const createLetterBox = (word, clas = "word") => {

    // Create the element and we add the class word
    const wordTag = document.createElement('p');
    wordTag.textContent = word;
    
    if (clas !== '') {
        wordTag.classList.add(clas);
    }

    return wordTag;
};

// Function to determinate if a choose is correct
// Generate new word to solve
class HangmanSolve {

    constructor() {
        // List of words 
        this.words = {
            1: 'MERIDA',
            2: 'SANDIA',
            3: 'CANADA',
            4: 'LEON',
            5: 'MELON',
            6: 'AVESTRUZ'
        }

        this.words = {
            1: {
                category: 'Cities',
                values: {
                    1: 'MERIDA',
                    2: 'VALLADOLID',
                    3: 'CDMX',
                    4: 'MONTERREY'
                }
            },
            2: {
                category: 'Animals',
                values: {
                    1: 'AVESTRUZ',
                    2: 'GATO',
                    3: 'ELEFANTE',
                    4: 'JIRAFA'
                }
            },
            3: {
                category: 'Countries',
                values: {
                    1: 'MEXICO',
                    2: 'CANADA',
                    3: 'BRASIL',
                    4: 'COLOMBIA'
                }
            }
        }

        this.word = '';
        this.category = '';
        this.lives = 10;
    }

    // Method that start the game
    startGame() {
        this.generateNewWord();
        this.addAlphabet();
        this.addEmptyBoxes();
        this.setClue();

        console.log(this.word);
    }

    // Method to generate a new word
    generateNewWord() {
        const randomChooseCategory = random(1, 3);
        const randomChooseWord = random(1, 4);

        this.category = this.words[randomChooseCategory].category;

        this.word = this.words[randomChooseCategory]['values'][randomChooseWord];
    }

    // Función to add new words in the words container
    addAlphabet() {

        // Get the words container
        const lettersContainer = document.getElementsByClassName('words-container');

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Put the word on the container
        alphabet.split('').forEach(letter => {
            const element = createLetterBox(letter);

            element.addEventListener('click', (event) => {
                this.chooseOption(event, this);
            });

            lettersContainer[0].appendChild(element);
        });
    };

    addEmptyBoxes() {

        const letterGuessCont = document.getElementsByClassName('words-cont-guess');

        for (let i = 0; i < this.word.length; i++) {
            const emptyBox = createLetterBox('-');
            letterGuessCont[0].appendChild(emptyBox);
        }
    }

    chooseOption(event, reference) {

        // Check if the usser chosen a correct answer
        const letter = event.target.innerHTML

        console.log(letter);

        if (reference.word.split('').includes(letter)) {

            const count = countElements(reference.word.split(''), letter);

            console.log(count)

            for (let i = 0; i < count; i++) {

                // Get the index of the letter
                const index = reference.word.indexOf(letter);

                console.log(index);
                console.log(reference.word);

                // Get the guess letters container
                const letterGuessCont = document.getElementsByClassName('words-cont-guess')[0];

                console.log(index);

                letterGuessCont.childNodes.item(index + 1).innerHTML = reference.word[index];

                reference.word = reference.word.replace(reference.word[index], '-');
            }

            return;
        }

        // If not, he loses a live
        reference.updateLives();
    }

    updateLives() {

        this.lives -= 1;
        console.log('Updating lives');

        const liveElement = document.getElementById('live');

        let msg = `You have ${this.lives} lives`;

        liveElement.innerHTML = msg;
    }

    setClue() {

        // Get the clue element from HTML
        const clueElement = document.getElementById('clue');

        let msg = `The choosen category is ${this.category}`;

        clueElement.innerHTML = msg;
    }
}

export { HangmanSolve };