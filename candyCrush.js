
let candies = ["blue", "green", "purple", "raindow", "red", "yellow"];
let board =[];
let rows = 9;
let columns = 9;
let score = 0;

let currTile;
let otherTile;

window.onload = function () {
    startGame();
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
            tile.src  = "./img/" + randomCandy() + ".jpeg";

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
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
}