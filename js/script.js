document.getElementById("timerEl").innerHTML = "0";

// COUNTDOWN TIMER
var initialTime = 0;
var setTime;

function timer() {
  clearInterval(setTime);

  if (initialTime <= 0) {
  initialTime = 30;
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
document.getElementById("question").innerHTML = questionSet[0].question;

document.getElementById("answer1").innerHTML = questionSet[0].answers[0];
document.getElementById("answer2").innerHTML = questionSet[0].answers[1];
document.getElementById("answer3").innerHTML = questionSet[0].answers[2];
document.getElementById("answer4").innerHTML = questionSet[0].answers[3];

// GET USER SELECTED ANSWER (A, B, C, or D) FROM CLICK EVENT
var selectedAnswer;

document.addEventListener('click', function(event){
  var clickedElement = event.target;
  selectedAnswer = clickedElement.dataset.value;
  console.log(event);
  console.log(selectedAnswer);
})

// TRY TO ADD DATA-VALUE A, B, C, D TO li ELEMENTS and retrieve that value instead of the clickedElement.textContent.trim in the above event listener.