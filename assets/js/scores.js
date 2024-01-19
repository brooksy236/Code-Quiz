

function printHighscores(){
    var highscores = JSON.parse(window.localStorage.getItem("highscores") || [])

highscores.forEach(function(score) {   
    var li = document.createElement("li");
    li.textContent = score.initial + " scored: " + score.score;    
    var ol = document.getElementById("highscores");
    ol.appendChild(li);
  });
}

function clearHighScores(){
 window.localStorage.removeItem("highscores");
 window.location.reload();
}

document.getElementById("clear").onclick=clearHighScores
printHighscores()
