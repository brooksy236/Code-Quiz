const startButton = document.querySelector(".start");
const timerEl = document.querySelector(".timer");
const scoresEl = document.querySelector(".scores");
const questionsEl = document.getElementById(".questions");
const currentQuestion = document.getElementById(".question-title");
const questionChoices = document.getElementById(".choices");

var timer;
var timerCount;
var isWin;

document.getElementById("start").addEventListener("click", startGame);

function startGame() {
    isWin = false;
    timerCount = 10;
    startButton.disabled = true;
    document.querySelector(".start").style.display = "none";
    startTimer();
    askQuestions(); 
}

function askQuestions() {
    document.getElementById("questions").classList.remove("hide");

    document.getElementById("question-title").innerText = questionList[0].question;
    // document.getElementById("choices").innerText = questionList[0].answerChoices;
    document.getElementById("question1").innerText = questionList[0].answerChoices[0];
    document.getElementById("question2").innerText = questionList[0].answerChoices[1];
    document.getElementById("question3").innerText = questionList[0].answerChoices[2];
    document.getElementById("question4").innerText = questionList[0].answerChoices[3];
    
}
function clickListener(event){
    console.log(event.target.id)
}
var allButtons = document.querySelectorAll(".questionButtons")
allButtons.forEach(button => {
    button.addEventListener('click', clickListener)
});

function answerButtons() {
    const button = document.createElement("button");
    button.textContent = choice
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
