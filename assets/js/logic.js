const startButton = document.querySelector(".start");
const timerEl = document.querySelector(".timer");
const scoresEl = document.querySelector(".scores");
const questionsEl = document.querySelector(".questions");
const currentQuestion = document.querySelector(".question-title");
const questionChoices = document.querySelector(".choices");

var timer;
var timerCount;
var isWin;

document.getElementById('start').addEventListener('click', startGame);

function startGame() {
    isWin = false;
    timerCount = 10;
    startButton.disabled = true;
    
    startTimer();
}

function winGame() {
    startButton.disabled = false;

}

function loseGame() {
    startButton.disabled = false;

}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount >=0) {
            if (isWin && timerCount > 0) {
                
                winGame();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}
