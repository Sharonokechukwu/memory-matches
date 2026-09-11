const gameBoard =
    document.getElementById("gameBoard");

const movesDisplay =
    document.getElementById("moves");

const matchesDisplay =
    document.getElementById("matches");

const restartButton =
    document.getElementById("restartButton");

const message =
    document.getElementById("message");


const emojis = [

    "🍎",
    "🍎",

    "🚀",
    "🚀",

    "⚽",
    "⚽",

    "🎮",
    "🎮",

    "🐱",
    "🐱",

    "💎",
    "💎",

    "🔥",
    "🔥",

    "⭐",
    "⭐"

];


let firstCard = null;

let secondCard = null;

let lockBoard = false;

let moves = 0;

let matches = 0;


// START GAME

function startGame() {

    gameBoard.innerHTML = "";

    firstCard = null;

    secondCard = null;

    lockBoard = false;

    moves = 0;

    matches = 0;

    movesDisplay.textContent = moves;

    matchesDisplay.textContent = matches;

    message.textContent = "";


    // SHUFFLE CARDS

    const shuffledCards =
        [...emojis].sort(() => Math.random() - 0.5);


    // CREATE CARDS

    shuffledCards.forEach(function(emoji) {

        const card =
            document.createElement("div");


        card.classList.add("card");

        card.textContent = emoji;

        card.classList.add("hidden");


        card.addEventListener(
            "click",
            flipCard
        );


        gameBoard.appendChild(card);

    });

}


// FLIP CARD

function flipCard() {

    if (lockBoard) {

        return;

    }


    if (this === firstCard) {

        return;

    }


    this.classList.remove("hidden");


    if (!firstCard) {

        firstCard = this;

        return;

    }


    secondCard = this;

    moves++;

    movesDisplay.textContent = moves;


    checkMatch();

}


// CHECK MATCH

function checkMatch() {

    const isMatch =
        firstCard.textContent ===
        secondCard.textContent;


    if (isMatch) {

        disableCards();

    } else {

        unflipCards();

    }

}


// MATCH FOUND

function disableCards() {

    firstCard.classList.add("matched");

    secondCard.classList.add("matched");


    firstCard.removeEventListener(
        "click",
        flipCard
    );

    secondCard.removeEventListener(
        "click",
        flipCard
    );


    matches++;

    matchesDisplay.textContent = matches;


    resetBoard();


    checkWin();

}


// NOT A MATCH

function unflipCards() {

    lockBoard = true;


    setTimeout(function() {

        firstCard.classList.add("hidden");

        secondCard.classList.add("hidden");


        resetBoard();

    }, 800);

}


// RESET

function resetBoard() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}


// CHECK WIN

function checkWin() {

    if (matches === emojis.length / 2) {

        message.textContent =
            "🎉 Congratulations! You won!";

    }

}


// RESTART

restartButton.addEventListener(
    "click",
    startGame
);


// START THE GAME

startGame();
________________________________________






