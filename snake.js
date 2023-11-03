
let gameOver = false;
// Board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

// Snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];

// Snake food :]
let foodX;
let foodY;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
// Draw on board
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);
}

function update () {
    if (gameOver){
        return;
    }
// Draw board
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, board.width, board.height);
// Draw food for snake
    context.fillStyle = "limegreen";
    context.fillRect(foodX, foodY, blockSize, blockSize);
// Check if snake ate food
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }
// Move body with snake
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }
// Draw snake
    context.fillStyle = "red";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
// Snake body
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
// Game over conditions
// Out of bounds
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over! :(");
        location.reload();
    }
// Eat body
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over! :(");
            location.reload();
        }
    }
}

function placeFood () {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection (e) {
    if (e.code === "ArrowUp" && velocityY !== 1){
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY !== -1){
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX !== 1){
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === "ArrowRight" && velocityX !== -1){
        velocityX = 1;
        velocityY = 0;
    }
}