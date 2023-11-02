
let currPumpkinTile;
let currGhostTile;

let score = 0;
let gameOver = false;

let startButton = document.getElementById("startButton");
let pumpkinInt = 1000;
let ghostInt = 2000;

let highScore = localStorage.getItem("highScore") || 0; // Load high score from localStorage
let highScoreElement = document.getElementById("highScoreValue");


window.onload = function () {
    setGame();
    updateHighScore();
}

// let gameStarted = false;
//
// startButton.addEventListener("click", () => {
//     if (!gameStarted){
//         setGame();
//         gameStarted = true;
//
//         startButton.style.display = "none";
//     }
// })


// set up grid for the game board
function setGame (){
    for (let i = 0; i < 9; i ++){

        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setInterval(setPumpkin, pumpkinInt);
    setInterval(setGhost, ghostInt);
}

function getRandomTile (){
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setPumpkin (){
    if(gameOver){
        return;
    }
// clears the tile//
    if (currPumpkinTile){
        currPumpkinTile.innerHTML = "";
    }

    let pumpkin = document.createElement("img");
    pumpkin.src = "./img/pumpkin.jpeg";

    let num = getRandomTile();

    if (currGhostTile && currGhostTile.id === num) {
        return;
    }

    currPumpkinTile = document.getElementById(num);
    currPumpkinTile.appendChild(pumpkin);
}


function setGhost () {
    if(gameOver){
        return;
    }

    if (currGhostTile){
        currGhostTile.innerHTML = "";
    }

    let ghost = document.createElement("img");
    ghost.src = "./img/gost.jpg";

    let num = getRandomTile();
    if (currPumpkinTile && currPumpkinTile.id === num){
        return;
    }
    currGhostTile = document.getElementById(num);
    currGhostTile.appendChild(ghost);

}

function selectTile (){
    if(gameOver){
        return
    }

    if (this === currPumpkinTile){
        score += 5;
        document.getElementById("score").innerText = score.toString();
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore); // Save the high score to localStorage
            updateHighScore(); // Update the high score display
        }

        if (score >= 20){
            pumpkinInt = 500;
            ghostInt = 1000;
        } else if (score >= 75){
            pumpkinInt = 200;
            ghostInt = 500;
        } else if (score >= 100){
            pumpkinInt = 100;
            ghostInt = 300;
        } else if ( score >= 150){
            pumpkinInt = 50;
            ghostInt = 200;
        } else if (score >= 200){
            pumpkinInt = 20;
            ghostInt = 60;
        } else if (score >= 250){
            pumpkinInt = 5;
            ghostInt = 20;
        } else if (score >= 300){
            pumpkinInt = 3;
            ghostInt = 10;
        } else if (score >= 350){
            pumpkinInt = 1;
            ghostInt = 5;
        } else if (score >= 400){
            pumpkinInt = 0.5;
            ghostInt = 3;
        } else if (score >= 450){
            ghostInt = 1;
        }
    }
    else if (this === currGhostTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
        // endGame();
    }
}

function updateHighScore () {
    highScoreElement.innerText = highScore.toString();
}

// function endGame () {
//     gameStarted = false;
//     startButton.style.display = "block";
//     gameOver = true;
// }

function restart (){
    location.reload();
}