document.getElementById("timerEl").innerHTML = "0";

// COUNTDOWN TIMER
var initialTime;

function timer() {
  initialTime = 3;
  var setTime = setInterval(function () {
    document.getElementById("timerEl").innerHTML = initialTime;
    initialTime--;
    if (initialTime < 0) {
      clearInterval(setTime);
    }
  }, 1000);
}

// START TIMER WITH BUTTON
document.getElementById("start-btn").addEventListener("click", timer);

// APPEND QUESTIONS TO QUESTION FIELD
document.getElementById("question").innerHTML = questionSet[0].question; // OMG IT WORKED!

document.getElementById("answer1").innerHTML = questionSet[0].answers[0];
document.getElementById("answer2").innerHTML = questionSet[0].answers[1];
document.getElementById("answer3").innerHTML = questionSet[0].answers[2];
document.getElementById("answer4").innerHTML = questionSet[0].answers[3];
