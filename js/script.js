document.getElementById("timerEl").innerHTML = "0";
document.querySelector(".question-field").style.pointerEvents = "none";

// DISPLAY RULES
document.getElementById("question").innerHTML = "Quiz Rules";
document.getElementById("answer1").innerHTML =
  "- You will have 100 seconds to complete the quiz";
document.getElementById("answer2").innerHTML =
  "- Each correct answer will reward you with 100 points";
document.getElementById("answer3").innerHTML =
  "- Wrong answers deduct 5 sec from the time";
document.getElementById("answer4").innerHTML =
  "- Enter your initials to save your score when finished";

// START QUIZ
var initialTime = 0;
var setTime;

function startQuiz() {
  clearInterval(setTime);
  saveContainer.style.display = "none";
  saveResponse.style.display = "none";
  questionIndex = 0; // Increases when user selects an answer
  score.textContent = 0;
  displayQuestion();
  document.querySelector(".question-field").style.pointerEvents = "auto";
  if (initialTime <= 0) {
    initialTime = 100; // STARTING TIME
    document.getElementById("start-btn").disabled = true;

    setTime = setInterval(function () {
      document.getElementById("timerEl").innerHTML = initialTime;
      initialTime--;

      if (initialTime < 0) {
        clearInterval(setTime);
        document.querySelector(".question-field").style.pointerEvents = "none";
        gameOver();
        saveHighScore();
        document.getElementById("start-btn").disabled = false;
      }
    }, 1000);
  }
}

// DISPLAY GAME OVER
function gameOver() {
  document.getElementById("start-btn").disabled = false;
  document.getElementById("question").innerHTML = "GAME OVER";
  // for (var i = 0; i < questionSet[questionIndex - 1].answers.length; i++) {
  //   var answerId = "answer" + (i + 1);
    document.getElementById("answer1").innerHTML = "Thanks for playing!";
    document.getElementById("answer2").innerHTML = "Thanks for playing!";
    document.getElementById("answer3").innerHTML = "Thanks for playing!";
    document.getElementById("answer4").innerHTML = "Thanks for playing!";
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

// LISTENS FOR CLICK ON TARGET ELEMENTS
document.addEventListener("click", function (event) {
  var clickedElement = event.target;
  selectedAnswer = clickedElement.dataset.value;

  var rightAnswer = document.getElementById("right");
  var wrongAnswer = document.getElementById("wrong");

  if (selectedAnswer != undefined) {
    if (selectedAnswer == questionSet[questionIndex].correct) {
      // Display 'Correct!' for one second
      wrongAnswer.style.setProperty("display", "none");
      rightAnswer.style.setProperty("display", "block");
      setTimeout(function () {
        rightAnswer.style.display = "none";
      }, 1000);
      
      // Add 10 points to score
      score.textContent = parseInt(score.textContent) + 100;

      questionIndex++;
      
      // CHECKS IF USER ANSWERED FINAL QUESTION
      if (questionIndex < questionSet.length) {
        displayQuestion();
      } else {
        gameOver();
        saveHighScore();
        score.textContent = parseInt(score.textContent) + initialTime; // Add remaining time to score
        initialTime = 0;
      }
      // console.log(questionIndex); TESTING
    } else {
      // Display 'Wrong!' for one second
      rightAnswer.style.setProperty("display", "none");
      wrongAnswer.style.setProperty("display", "block");
      setTimeout(function () {
        wrongAnswer.style.display = "none";
      }, 1000);
      
      if (initialTime > 5) {
      initialTime = initialTime - 5;
      }

      questionIndex++;

      // CHECKS IF USER ANSWERED FINAL QUESTION
      if (questionIndex < questionSet.length) {
        displayQuestion();
      } else {
        gameOver();
        saveHighScore();
        score.textContent = parseInt(score.textContent) + initialTime; // Add remaining time to score
        initialTime = 0;
      }
    }
  }
});

// FUNCTION TO SAVE HIGHSCORE
var saveContainer = document.getElementById("save-container");
function saveHighScore() {
  saveContainer.style.display = "flex";
}

// WRITE EVENT LISTENER TO SAVE DATA WHEN SAVE BUTTON IS CLICKED
var userInitials = document.getElementById("initials-field");
var saveResponse = document.getElementById("save-response");
var saveButton = document.getElementById("save-button");

saveButton.addEventListener('click', function(event){
  localStorage.setItem("initials", userInitials.value.toUpperCase());
  localStorage.setItem("score", score.textContent);
  saveContainer.style.display = "none";
  saveResponse.style.display = "flex";
})