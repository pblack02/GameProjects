const buttonColor = [
    "red",
    "blue",
    "green",
    "yello"
];

var gamePlay = [];
var userClickPattern =[];
var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatedPress(userChosenColor);

    checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if(gamePlay[currentLevel] === userClickPattern[currentLevel]) {
        if(userClickPattern.length === gamePlay.length){
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        $("#level-title").text("Game Over, Press Any Key to Restart.");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
};

function nextSequence(){
    userClickPattern = [];
    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];

    gamePlay.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatedPress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePlay = [];
    started = false;
}



