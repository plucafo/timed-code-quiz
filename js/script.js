document.getElementById("timerEl").innerHTML = "0";

// COUNTDOWN TIMER
var initialTime = 0;
var setTime;

function timer() {
  clearInterval(setTime);

  if (initialTime <= 0) {
  initialTime = 3;
  document.getElementById("start-btn").disabled = true;

  setTime = setInterval(function () {
    document.getElementById("timerEl").innerHTML = initialTime;
    initialTime--;

    if (initialTime < 0) {
      clearInterval(setTime);
      document.getElementById("start-btn").disabled = false;
    }
  }, 1000);
} 
}


// START TIMER WITH BUTTON
document.getElementById("start-btn").addEventListener("click", timer);

// ADD QUESTION #1 TO QUESTION FIELD
document.getElementById("question").innerHTML = questionSet[0].question; // OMG IT WORKED!

document.getElementById("answer1").innerHTML = questionSet[0].answers[0];
document.getElementById("answer2").innerHTML = questionSet[0].answers[1];
document.getElementById("answer3").innerHTML = questionSet[0].answers[2];
document.getElementById("answer4").innerHTML = questionSet[0].answers[3];
