document.getElementById("timerEl").innerHTML = "0";

// COUNTDOWN TIMER
var initialTime = 0;
var setTime;

function startQuiz() {
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
document.getElementById("start-btn").addEventListener("click", startQuiz);

// FUNCTION TO DISPLAY QUESTIONS
var questionIndex = 0;

function displayQuestion() {
  document.getElementById("question").innerHTML = questionSet[questionIndex].question;

  for (var i = 0; i < questionSet[questionIndex].answers.length; i++) {
    var answerId = "answer" + (i + 1);
    document.getElementById(answerId).innerHTML = questionSet[questionIndex].answers[i];
  }
}

// DISPLAY THE FIRST QUESTION
displayQuestion();

// GET USER SELECTED ANSWER (A, B, C, or D) FROM CLICK EVENT AND CHECK IF IT IS THE CORRECT ANSWER AND ADD SCORE
var selectedAnswer;
var score = document.getElementById("score");
score.textContent = 0;

document.addEventListener("click", function (event) {
  var clickedElement = event.target;
  selectedAnswer = clickedElement.dataset.value;
  
  if (selectedAnswer != undefined) {
    if (selectedAnswer == questionSet[0].correct) {
      alert("You are correct!");
      score.textContent = parseInt(score.textContent) + 10;
      questionIndex++;
      displayQuestion();
    } else {
      alert("You are incorrect :(");
      initialTime = initialTime - 5;
      displayQuestion();
    }
  }
});

// ADD 10 POINTS TO SCORE FOR RIGHT ANSWERS
// var score = document.getElementById("score");
// score.textContent = 0;
// score.textContent = parseInt(score.textContent) + 10;
