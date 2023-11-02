let errors = 0;
let score = 0;
let cardList = [
    "puppy1",
    "puppy2",
    "puppy3",
    "puppy4",
    "puppy5",
    "puppy6",
    "puppy7",
    "puppy8",
    "puppy9",
    "puppy10"
]

let cardSet;
let board = [];

let rows = 4;
let columns = 5;

let card1Selected;
let card2Selected;


window.onload = function () {
    shuffleCards();
    startGame();
}


function shuffleCards() {
    cardSet = cardList.concat(cardList);
    // shuffle the cards
    for (let i = 0; i < cardSet.length; i++) {
        let randomNumber = Math.floor(Math.random() * cardSet.length);
        let temp = cardSet[i];
        cardSet[i] = cardSet[randomNumber];
        cardSet[randomNumber] = temp;
    }
}

function startGame() {
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let x = 0; x < columns; x++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("img");

            card.id = i.toString() + "-" + x.toString();
            card.src = "./img/" + cardImg + ".jpeg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").appendChild(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards, 1000);
}


function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "./img/backone.jpeg";
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let placeOfCards = card1Selected.id.split("-");
            let r = parseInt(placeOfCards[0]);
            let c = parseInt(placeOfCards[1]);

            card1Selected.src = "./img/" + board[r][c] + ".jpeg";
        } else if (!card2Selected && this !== card1Selected) {
            card2Selected = this;

            let placeOfCards = card2Selected.id.split("-");
            let r = parseInt(placeOfCards[0]);
            let c = parseInt(placeOfCards[1]);

            card2Selected.src = "./img/" + board[r][c] + ".jpeg";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if(card1Selected.src === card2Selected.src){
        score += 2;
        document.getElementById("score").innerText = score;
    }
    if (card1Selected.src !== card2Selected.src) {
        card1Selected.src = "./img/backone.jpeg";
        card2Selected.src = "./img/backone.jpeg";

        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
    card1Selected = null;
    card2Selected = null;
}

function restart(){
    location.reload();
}