var playing = false
var score;
var action;
var timeRemaining;
var correctAnswer;
//if we click on the start/reset
document.getElementById("startreset").onclick = function() {
    //if we are pkaying
    if (playing == true) {
        //reload the page
        location.reload();
    } else {
        //if we are not playing
        playing = true
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        //show countdown box
        document.getElementById("timeremaining").style.display = "block";
        timeRemaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;

        document.getElementById("gameover").style.display = "none";

        // change button elements content from start to reset
        document.getElementById("startreset").innerHTML = "Reset Game";

        countDown();

        //generate a new Q&A
        generateNewQA();
    }
}

//clicking on awnser box
for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function() {
        //check if we are playing
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                //correct awnser
                playCorrectAudio();
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                document.getElementById("wrong").style.display = "none";
                setTimeout(function() {
                    document.getElementById("correct").style.display = "none";
                }, 1000);

                generateNewQA();

            } else {
                playWrongAudio();
                document.getElementById("correct").style.display = "none";
                document.getElementById("wrong").style.display = "block";
                setTimeout(function() {
                    document.getElementById("wrong").style.display = "none";
                }, 1000);
            }
        }

    }
}


function countDown() {
    //reduce time by 1sec in loops
    action = setInterval(function() {
        timeRemaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        if (timeRemaining == 0) {
            stopCountDown();
            playTimesUpAudio();
            document.getElementById("gameover").style.display = "block";
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your score is " + score + "</p>";
            document.getElementById("timeremaining").style.display = "none";
            document.getElementById("correct").style.display = "none";
            document.getElementById("wrong").style.display = "none";
            playing = false;
            document.getElementById("startreset").innerHTML = "Start";

        }

    }, 1000)
}



function stopCountDown() {
    clearInterval(action);
}


//generate
function generateNewQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    var answer = [correctAnswer];

    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while (answer.indexOf(wrongAnswer) > -1)


            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answer.push(wrongAnswer);

        }


    }
}

//when called it plays correct audio sound effect
function playCorrectAudio(){
    var correctSound = new Audio("sounds/correct.mp3");
    correctSound.play();
}

// when called it plays wrong audio sound effect
function playWrongAudio(){
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
}

//when called it plays a times up audio sound effect
function playTimesUpAudio(){
    var timeUpSound = new Audio("sounds/timeup.mp3");
    timeUpSound.play();
}


