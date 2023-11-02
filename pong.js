
let board;
let boardHeight = 500;
let boardWidth = 500;
let context;

let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
    x : 10,
    y: boardHeight/ 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y: boardHeight/ 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}
// the ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x: ballWidth/2,
    y: ballHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 1,
    velocityY: 2
}

let player1Score = 0;
let player2Score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // draw player 1 on board
    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    // game loop
    requestAnimationFrame(update);

    document.addEventListener("keyup", movePlayer);
}

function update (){
    requestAnimationFrame(update);
    // clear the board after moving
    context.clearRect(0, 0, board.width, board.height);
    // player 1
    context.fillStyle = "skyblue";
    // player1.y += player1.velocityY;
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)){
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    // player 2
    // player2.y += player2.velocityY;
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)){
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
    // the ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
    // if ball touches bottom or top of canvas - reverse direction
    if (ball.y <= 0 || (ball.y + ballHeight >= boardHeight)){
        ball.velocityY *= -1;
    }
    // bounce the ball back
    if (detectHit(ball, player1)) {
        if (ball.x <= player1.x + player1.width) { // left side of ball touches right side of player1
            ball.velocityX *= -1; // flip x direction
        }
    } else if (detectHit(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) { // right side of ball touches left side of player2
            ball.velocityX *= -1; // flip x direction
        }
    }
    // Game over
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    } else if (ball.x + ballWidth > boardWidth){
        player1Score++;
        resetGame(-1);
    }
    // Score
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth/5, 45);
    context.fillText(player2Score, boardWidth * 4/5 - 45, 45);
    //dotted line in center of canvas
    for (let i = 10; i < board.height; i += 25){
        context.fillRect(board.width/2 - 10, i, 5, 5);
    }
}

// to check if paddles are out of bounds
function outOfBounds (yPosition){
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayer(e){
    // player 1
    if (e.code === "KeyW"){
        player1.velocityY = -3;
    } else if (e.code === "KeyS"){
        player1.velocityY = 3;
    }
    // player 2
    if (e.code === "ArrowUp"){
        player2.velocityY = -3;
    } else if (e.code === "ArrowDown"){
        player2.velocityY = 3;
    }
}

function detectHit(a, b){
    return a.x < b.x + b.width &&  // a's top left corner doesn't reach b's top right corner.
        a.x + a.width > b.x && // a's top right passes b's top left corner.
        a.y < b.y + b.height && // a's top left corner doesn't reach b's bottom left corner.
        a.y + a.height > b.y; // a's bottom left passes b's top left corner.
}

function resetGame(direction) {
    ball = {
        x: ballWidth/2,
        y: ballHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction,
        velocityY: 2
    }
}