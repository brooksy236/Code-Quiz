const startScreen = document.querySelector(".start");
const timerEl = document.getElementById("time");
const feedback = document.getElementById("feedback");
const questionsEl = document.getElementById("questions");
const currentQuestion = document.getElementById("question-title");
const questionChoices = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");            //consts being assigned to the elements I'll use in the code 
const loseScreen = document.getElementById("lose-screen");
const finalScore = document.getElementById("final-score"); 
const userInitial = document.getElementById("initials");

var timerCount;
var isWin;
var isLose;
var score = 0;
var timer = null;

document.getElementById("start").addEventListener("click", startGame);          //listens for the 'start' button being clicked
document.getElementById("submit").addEventListener("click", submitScore);       //listens for the 'submit' button being clicked

//-----------------Start Game-------------------

function startGame() {  //function to start the game on clicking the 'start' button
    isWin = false;          
    timerCount = 61;                        //game timer set to number of seconds
    startScreen.classList.add("hide");      //hides the start screen div
    questionsEl.classList.remove("hide");   //shows the questions div
    startTimer();                           //calls the startTimer function
    askQuestions();                         //calls the askQuestions function
}

let questionIndex = 0;      //set to 0 to start at the first question of the questionList array

//-----------------Question Display-------------------

function askQuestions() {  //This function creates all the queston text and all the buttons with the answers.
    document.getElementById("question-number").innerText = questionList[questionIndex].questionNumber;
    document.getElementById("question-title").innerText = questionList[questionIndex].question;
    document.getElementById("answer0").innerText = questionList[questionIndex].answerChoices[0];
    document.getElementById("answer1").innerText = questionList[questionIndex].answerChoices[1];
    document.getElementById("answer2").innerText = questionList[questionIndex].answerChoices[2];
    document.getElementById("answer3").innerText = questionList[questionIndex].answerChoices[3];
    }   

var correctAnswer = new Audio("./assets/sfx/correct.wav");      // These two vars are assigned to the sfx that play whether a right or wrong answer is selected.
var wrongAnswer =  new Audio("./assets/sfx/incorrect.wav");
    
//-----------------Game Functionality-------------------

function clickListener(event){    
    if (questionList[questionIndex].correctAnswer == event.target.id.substr(event.target.id.length-1)){ //compares the correctAnswer object to the users choice
        feedback.classList.remove("hide");  //removes the 'hide' class from the 'feedback' div so the... 
        feedback.textContent = "Correct!";  //... message 'Correct!' can be displayed
        correctAnswer.play();               //Plays the audio for picking the correct choice        
    } else {  
        timerCount -=10;
        feedback.classList.remove("hide");  //removes the 'hide' class from the 'feedback' div so the... 
        feedback.textContent = "Wrong!";    //... message 'Wrong!' can be displayed
        wrongAnswer.play();                 //Plays the audio for picking the wrong choice
    }
    if (questionList.length-1 > questionIndex){ //Checks if there are still questions left to ask by comparing the length or the array to the current question index
        questionIndex++  //moves to the next question
        askQuestions()  //calls askQuestions function again
    } else {
        if (timerCount >= 0) {  //if the end of the questionsList is reached...
            isWin = true;       //... you won so...
        }
        feedback.classList.add("hide");         //... feedback is hidden...
        questionsEl.classList.add("hide");      //... question list is hidden...
        endScreen.classList.remove("hide");     //... and the endscreen is displayed.
    }
}
var allButtons = document.querySelectorAll(".questionButtons")  
allButtons.forEach(button => {                          //this is adding a click listener to each of the answer buttons...
    button.addEventListener('click', clickListener)         
});

var newScore = {initial: "", score: ""};        //initialises the newScore variable as an object

//-----------------Win Game-------------------

function winGame() {                        //winGame function for win the player completes before the time runs out
    questionsEl.classList.add("hide");      //Hides the questions div
    endScreen.classList.remove("hide");     //Shows the end-screen div
    document.getElementById("time").innerHTML = timerCount;     //sets the remaining timerCount text to the time innertext
    document.getElementById("final-score").innerHTML = timerCount;      //sets the remaining timerCount text to the final-score innertext so it displays on the end screen
    clearInterval(timer);
    newScore.score = timerCount;        //sets the score key in the newScore object to the timerCount value
}

//-----------------Lose Game-------------------

function loseGame() {                       //lose game function, called when the time runs to zero
    questionsEl.classList.add("hide");      //hides the questions div
    loseScreen.classList.remove("hide");    //makes the loseScreen div visible
    feedback.classList.add("hide");         //hides the feedback div
}

//-----------------Submit Score-------------------

function submitScore() {                
    newScore.initial = userInitial.value;   //sets the initial key in the newScore object to the users entered initials
    var scores = JSON.parse(localStorage.getItem("highscores")) || [];  //this get the information from the keys of the highscores object
    console.log(scores);
    scores.push(newScore);  //adds another score to the array
    localStorage.setItem("highscores", JSON.stringify(scores));  //passes the scores to localstorage
}

//-----------------Timer-------------------

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (isWin && timerCount >=0) {
                clearInterval(timer);                
                winGame();                  // Calls the winGame function if the player wins so they can enter their initials
        }
        if (timerCount <= 0) {
            timerCount = 0;
            clearInterval(timer);
            loseGame();                     // Calls the loseGame screen if the player runs out of time and can start again
        }
    }, 1000);
}
