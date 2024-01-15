document.getElementById("timerEl").innerHTML = "0";
document.querySelector(".question-field").style.pointerEvents = 'none';

// DISPLAY RULES
document.getElementById("question").innerHTML =
    "Quiz Rules";
document.getElementById("answer1").innerHTML = "- You will have 30 seconds to complete the quiz";
document.getElementById("answer2").innerHTML = "- Each correct answer will reward you with 100 points";
document.getElementById("answer3").innerHTML = "- Each wrong answer will deduct 5 seconds from the remaining time";
document.getElementById("answer4").innerHTML = "- Additional Rule Here";

// COUNTDOWN TIMER
var initialTime = 0;
var setTime;

function startQuiz() {
  clearInterval(setTime);
  questionIndex = 0;
  displayQuestion();
  document.querySelector(".question-field").style.pointerEvents = 'auto';
  if (initialTime <= 0) {
    initialTime = 300;
    document.getElementById("start-btn").disabled = true;

    setTime = setInterval(function () {
      document.getElementById("timerEl").innerHTML = initialTime;
      initialTime--;

      if (initialTime < 0) {
        clearInterval(setTime);
        document.querySelector(".question-field").style.pointerEvents = 'none';

        // SET TEXT TO GAME OVER THANKS FOR PLAYING WHEN TIMER REACHES 0
        document.getElementById("question").innerHTML = "GAME OVER";
        for (var i = 0; i < questionSet[questionIndex].answers.length; i++) {
          var answerId = "answer" + (i + 1);
          document.getElementById(answerId).innerHTML = "Thanks for playing!";
        }

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
  document.getElementById("question").innerHTML =
    questionSet[questionIndex].question;

  for (var i = 0; i < questionSet[questionIndex].answers.length; i++) {
    var answerId = "answer" + (i + 1);
    document.getElementById(answerId).innerHTML =
      questionSet[questionIndex].answers[i];
  }
}

// DISPLAY THE FIRST QUESTION
// displayQuestion();

// GET USER SELECTED ANSWER (A, B, C, or D) FROM CLICK EVENT AND CHECK IF IT IS THE CORRECT ANSWER AND ADD SCORE
var selectedAnswer;
var score = document.getElementById("score");
score.textContent = 0;

document.addEventListener("click", function (event) {
  var clickedElement = event.target;
  selectedAnswer = clickedElement.dataset.value;

  if (selectedAnswer != undefined) {
    if (selectedAnswer == questionSet[questionIndex].correct) {
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
