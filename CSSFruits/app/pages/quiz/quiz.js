const Questions = [
    {
        question: 'Quel fruit est surnommé "le roi des fruits" ?',
        answers: [
            'La pomme',
            'Le durian',
            'La fraise',
            'L\'orange',
        ],
        rightAnswer: 1
    },
    {
        question: 'Quel légume a le plus de vitamine C ?',
        answers: [
            'Le poivron rouge',
            'La carotte',
            'La laitue',
            'Le chou-fleur',
        ],
        rightAnswer: 0
    },
    {
        question: 'Quel légume est le principal ingrédient dans le houmous ?',
        answers: [
            'Les épinards',
            'Le chou',
            'Les pois chiches',
            'Les courgettes',
        ],
        rightAnswer: 2
    },
    {
        question: 'Quel fruit est connu pour aider à la digestion ?',
        answers: [
            'L\'ananas',
            'La cerise',
            'La banane',
            'La framboise',
        ],
        rightAnswer: 0
    },
    {
        question: 'Quel légume peut être rouge, jaune, ou verte ?',
        answers: [
            'L\'épinard',
            'Le poivron',
            'Le chou-fleur',
            'Le céleri',
        ],
        rightAnswer: 1
    },
    {
        question: 'Quel fruit est techniquement une baie, selon la classification botanique ?',
        answers: [
            'La pomme',
            'La banane',
            'La pêche',
            'La prune',
        ],
        rightAnswer: 1
    },
    {
        question: 'Quel légume est principalement utilisé pour faire du ketchup ?',
        answers: [
            'La carotte',
            'Le poivron',
            'La tomate',
            'Le concombre',
        ],
        rightAnswer: 2
    },
    {
        question: 'Quel fruit a la peau la plus épaisse ?',
        answers: [
            'Le citron',
            'La noix de coco',
            'La fraise',
            'La pêche',
        ],
        rightAnswer: 1
    },
]

// Game
const Question = document.querySelector('#question');
const Answers = document.querySelectorAll('#answers button');

// Progress bar
const Speed = 8 // Lower == Faster
let progressInterval;
let progress = 100;
const elProgressBar = document.querySelector('#progressBar')

// Game state
let currentQuestion = -1;
let score = 0;
const userGuess = (guess) => {
    if (guess === Questions[currentQuestion].rightAnswer) {
        score++;
    }
    updateTimer(true);
    displayNextQuestion();
    updateScore();
}
const displayNextQuestion = () => {
    currentQuestion++
    if (currentQuestion === Questions.length) {
        displayMainMenu(true, true);
        clearInterval(progressInterval);
        return;
    }
    Question.textContent = Questions[currentQuestion].question
    Answers.forEach((button, i) => {
        button.textContent = Questions[currentQuestion].answers[i];
    })
}

const updateScore = () => {
    const elScore = document.querySelector('#score')
    elScore.textContent = `Bonnes réponses :  ${score}/${Questions.length}`
}
const updateTimer = (reset) => {
    if (reset) {
        clearInterval(progressInterval);
        progress = 100;
    }
    progressInterval = setInterval(frame, Speed);

    function frame() {
        if (progress <= 0) {
            updateTimer(true);
            displayNextQuestion();
        } else {
            progress -= 0.1;
            elProgressBar.style.width = progress + "%";
        }
    }
}
const displayMainMenu = (show, replay) => {
    const mainMenu = document.querySelector("#mainMenu")
    if (!show) {
        mainMenu.style.display = 'none';
    } else {
        mainMenu.style.display = 'flex';
        if (replay) {
            mainMenu.querySelector('p').textContent = `Score: ${score}/${Questions.length}`
            mainMenu.querySelector('button').textContent = 'Rejouer'
        }
    }
}

const startQuiz = () => {
    score = 0;
    currentQuestion = -1;
    displayMainMenu(false);
    updateTimer(true);
    displayNextQuestion();
    updateScore();
}