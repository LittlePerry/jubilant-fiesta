var buttonColors = ["red", "blue", "green", "yellow"];
var lvl = 0;
var gamePattern = [];
var userClickedPattern = [];
var started = false;

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    animatePress("#" + userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

$("body").keypress(function() {
    if (!started) {
        $("h1").text("Level " + lvl);
        nextSequence();
        started = true;   
    }
})


function nextSequence() {
    userClickedPattern = [];
    lvl++;
    $("h1").text("Level " + lvl);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").attr("class", "game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $(currentColour).addClass("pressed");
    setTimeout(function() {
        $(currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    lvl = 0;
    gamePattern = [];
    started = false;
}