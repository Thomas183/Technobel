const fruits = [
    {
        id: 0,
        img: '../../assets/img/products/apple.png'
    },
    {
        id: 1,
        img: '../../assets/img/products/banana.png'
    },
    {
        id: 2,
        img: '../../assets/img/products/carrot.png'
    },
    {
        id: 3,
        img: '../../assets/img/products/eggplant.png'
    },
    {
        id: 4,
        img: '../../assets/img/products/grapes.png'
    },
    {
        id: 5,
        img: '../../assets/img/products/kiwi.png'
    },
    {
        id: 6,
        img: '../../assets/img/products/onion.png'
    },
    {
        id: 7,
        img: '../../assets/img/products/orange.png'
    },
    {
        id: 8,
        img: '../../assets/img/products/tomato.png'
    }
];
// Timer variables
let timerInterval;
const progressBarElement = document.querySelector('#progressBar');
let defaultTimerSpeed = 15
// GameState
let totalTime;
let playerName = JSON.parse(localStorage.getItem('isLoggedIn'))
if (playerName) {
    playerName = playerName.pseudo
} else {
    pseudo = null
}
let pairsFound = [];
let lastCardClicked;
let timerProgress = 100; // From 100 to 0
let timerSpeed = defaultTimerSpeed;
let wrongGuesses = 1;

const checkForWin = () => {
    if (pairsFound.length === fruits.length) {
        clearInterval(timerInterval);
        totalTime = new Date().getTime() - totalTime;
        displayMenu('victory');
    }
}
const drawFoundFruits = () => {
    const fruitsContainer = document.querySelector('#fruitsFound');
    fruitsContainer.innerHTML = "";
    for (let fruit in fruits) {
        const img = document.createElement('img');
        img.src = fruits[fruit].img;
        img.style.width = '5%'
        if (pairsFound.includes(fruits[fruit].id)) {
            img.style.opacity = '100%'
        } else {
            img.style.opacity = '20%'
        }
        fruitsContainer.appendChild(img);
    }
}

const animateTimerLabel = (rightGuess) => {
    const progressLabelElement = document.querySelector('#multiplier');
    if (rightGuess) {
        progressLabelElement.classList.add('right');
    }
    if (!rightGuess) {
        progressLabelElement.classList.add('wrong');
    }
    setTimeout(() => {
        progressLabelElement.classList.remove('right');
        progressLabelElement.classList.remove('wrong');
    }, 300)
}
const refreshTimer = (reset) => {
    const progressLabelElement = document.querySelector('#multiplier')
    if (reset) {
        clearInterval(timerInterval);
        timerProgress = 100;
        timerSpeed = defaultTimerSpeed;
    }
    if (timerInterval) clearInterval(timerInterval)
    timerInterval = setInterval(frame, timerSpeed);

    function frame() {
        if (timerProgress <= 0) {
            clearInterval(timerInterval);
            displayMenu('defeat');
        } else {
            progressLabelElement.textContent = `${timerProgress.toFixed()} - X${wrongGuesses}`
            timerProgress -= 0.1;
            progressBarElement.style.width = timerProgress + "%";
        }
    }
}

//#region Main Logic
const getShuffledFruitArray = () => {
    let shuffledFruits = []
    while (shuffledFruits.length < fruits.length * 2) {
        let rnd = Math.floor(Math.random() * 9);
        if (shuffledFruits.filter(x => x === fruits[rnd]).length < 2) {
            shuffledFruits.push(fruits[rnd])
        }
    }
    return shuffledFruits;
}
const showFruit = (id) => {
    const img = document.getElementById(id.toString());
    img.classList.remove('reverse-pop');
    img.classList.add('pop');
}

const hideFruits = (id) => {
    const img = document.getElementById(id.toString());
    const img1 = document.getElementById((lastCardClicked.uniqueId).toString())
    setTimeout(() => {
        img.classList.add('reverse-pop');
        img1.classList.add('reverse-pop');
        img.classList.remove('pop');
        img1.classList.remove('pop');
        document.querySelector('#cardContainer').style.pointerEvents = 'auto';
    }, 500)
}


const handleClickedCard = (uniqueId, fruitId) => {
    if (!lastCardClicked && !pairsFound.includes(fruitId)) { // First card clicked
        lastCardClicked = {uniqueId: uniqueId, fruitId: fruitId}
        showFruit(uniqueId)
        return;
    } else if (uniqueId === lastCardClicked.uniqueId) return // Early exit if the same card is clicked twice

    // Second card logic
    document.querySelector('#cardContainer').style.pointerEvents = 'none'
    if (fruitId === lastCardClicked.fruitId) { // Pair matching
        pairsFound.push(fruitId);
        drawFoundFruits();
        wrongGuesses = 1;
        animateTimerLabel(true);
        refreshTimer(true);

        showFruit(uniqueId);
        showFruit(lastCardClicked.uniqueId);
        document.querySelector('#cardContainer').style.pointerEvents = 'auto';
    } else { // Pair not matching
        wrongGuesses++;
        animateTimerLabel(false);
        timerSpeed--;
        if (timerProgress > 0) refreshTimer();
        showFruit(uniqueId);
        hideFruits(uniqueId);
    }
    checkForWin();
    lastCardClicked = null;
}
const startNewGame = () => {
    pairsFound = [];
    lastCardClicked = null;
    wrongGuesses = 1;
    generateCardElements();
    refreshTimer(true);
    drawFoundFruits();
    totalTime = new Date().getTime();
}


const generateCardElements = () => {
    const shuffledFruits = getShuffledFruitArray();
    const gameContainer = document.querySelector('#cardContainer')
    gameContainer.innerHTML = "";
    shuffledFruits.forEach((fruit, i) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = fruit.img;
        img.draggable = false;
        img.id = i.toString();

        img.hidden = true

        card.appendChild(img)

        card.addEventListener('click', () => {
            img.hidden = false
            handleClickedCard(i, fruit.id)
        })

        gameContainer.appendChild(card)
    })
}
//#endregion
//#region Logic for menus
const menus = {
// Menu to set difficulty
    setDifficulty: {
        title: 'Choisissez une difficulté :',
        content: [],
        buttons: [
            {
                text: 'Facile',
                action: 'setDifficultyEasy',
            },
            {
                text: 'Normal',
                action: 'setDifficultyNormal',
            },
            {
                text: 'Difficile',
                action: 'setDifficultyHard',
            },

        ],
    },
// Menu for wins
    victory: {
        title: 'GG !',
        content: [
            {'content': 'finishTime'}
        ],
        buttons: [
            {
                text: 'Rejouer',
                action: 'startNewGame',
            }
        ]
    },
// Menu for loses
    defeat: {
        title: 'Perdu !',
        content: [],
        buttons: [
            {
                text: 'Rejouer',
                action: 'startNewGame',
            }
        ]
    },
};


// Create a menu to display
const displayMenu = (menuToDisplay) => {
    const menu = document.querySelector('#menu');
    menu.innerHTML = "";

    menu.style.display = 'flex';
    menuToDisplay = menus[menuToDisplay];

    const title = document.createElement('p')
    title.textContent = menuToDisplay.title;
    menu.appendChild(title);
    if (menuToDisplay.content.length > 0) {
        menuToDisplay.content.forEach(content => {
            const p = document.createElement('p')
            p.textContent = getMenuContent(content.content);
            menu.appendChild(p);
        })
    }
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';
    menu.appendChild(buttonContainer);

    menuToDisplay.buttons.forEach(button => {
        const elButton = document.createElement('button');
        elButton.textContent = button.text;

        elButton.addEventListener('click', () => {
            handleMenuButtonAction(button.action);
        })

        buttonContainer.appendChild(elButton);
    })
}

const handleMenuButtonAction = (action) => {
    const loadDifficulty = (speed, defaultSpeed) => {
        timerSpeed = speed;
        defaultTimerSpeed = defaultSpeed;
        startNewGame();
        document.querySelector('#menu').style.display = 'none';
    }
    switch (action) {
        case 'setDifficultyEasy':
            loadDifficulty(20, 20);
            break;
        case 'setDifficultyNormal':
            loadDifficulty(15, 15);
            break;
        case 'setDifficultyHard':
            loadDifficulty(10, 10);
            break;
        case 'startNewGame':
            displayMenu('setDifficulty');
            break;
    }

}
const getMenuContent = (content) => {
    switch (content) {
        case 'finishTime':
            return 'Fini en : ' + (totalTime/1000).toFixed() + 's';
        default:
            return 'Failed to load menu content'
    }
}
//#endregion

displayMenu('setDifficulty');
