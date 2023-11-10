let candies = ["blue", "green", "purple", "pink", "orange", "yellow"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;

let currTile;
let otherTile;

window.onload = function () {
    startGame();

    window.setInterval(function () {
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./img/" + randomCandy() + ".png";

            // Drag functionality
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").appendChild(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart() {
    // Refers to the tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    // Refers to the target tile that was dragged on
    otherTile = this;
}

function dragEnd() {

    if (currTile.src.includes("black") || otherTile.src.includes("blank")) {
        return;
    }

    let currCords = currTile.id.split("-");
    let r = parseInt(currCords[0]);
    let c = parseInt(currCords[1]);

    let otherCords = otherTile.id.split("-");
    let r2 = parseInt(otherCords[0]);
    let c2 = parseInt(otherCords[1]);

    let moveLeft = c2 === c - 1 && r === r2;
    let moveRight = c2 === c + 1 && r === r2;

    let moveUp = r2 === r - 1 && c === c2;
    let moveDown = r2 === r + 1 && c === c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}

function crushThree() {
    // check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./img/blank.jpeg";
                candy2.src = "./img/blank.jpeg";
                candy3.src = "./img/blank.jpeg";
                score += 30;
            }
        }
    }
    // check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./img/blank.jpeg";
                candy2.src = "./img/blank.jpeg";
                candy3.src = "./img/blank.jpeg";
                score += 30;
            }
        }
    }
}

function crushFour() {
    // check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("black")) {
                candy1.src = "./img/blank.jpeg";
                candy2.src = "./img/blank.jpeg";
                candy3.src = "./img/blank.jpeg";
                candy4.src = "./img/blank.jpeg";
                score += 40;
            }
        }
    }
    // check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "./img/blank.jpeg";
                candy2.src = "./img/blank.jpeg";
                candy3.src = "./img/blank.jpeg";
                candy4.src = "./img/blank.jpeg";
                score += 40;
            }
        }
    }
}

function crushFive() {
    // check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 4; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];
            let candy5 = board[r][c + 4];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && candy4 === candy5 && !candy1.src.includes("blank")) {
                candy1.src = "./img/blank.jpeg";
                candy2.src = "./img/blank.jpeg";
                candy3.src = "./img/blank.jpeg";
                candy4.src = "./img/blank.jpeg";
                candy5.src = "./img/blank.jpeg";
                score += 50;
            }
        }
    }
    // check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 4; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];
            let candy5 = board[r + 4][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && candy4.src === candy5.src && !candy1.src.includes("blank")) {
                candy1.src = "./img/blank.jpeg";
                candy2.src = "./img/blank.jpeg";
                candy3.src = "./img/blank.jpeg";
                candy4.src = "./img/blank.jpeg";
                candy5.src = "./img/blank.jpeg";
                score += 50;
            }
        }
    }
}

function crushCandy() {
    crushFive();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score;
}

function checkValid() {
    // check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    // check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let index = rows -1;  // Starts at the bottom of the column and then goes up.
        for (let r = columns -1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[index][c].src = board[r][c].src;
                index -= 1;
            }
        }
        for (let r = index; r >= 0; r--) {
            board[r][c].src = "./img/blank.jpeg";
        }
    }
}

// Only generating 'candies' for the first row.
function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./img/" + randomCandy() + ".png";
        }
    }
}