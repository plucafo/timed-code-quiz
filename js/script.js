document.getElementById("timerEl").innerHTML = "0";
document.querySelector(".question-field").style.pointerEvents = "none";

// DISPLAY RULES
document.getElementById("question").innerHTML = "Quiz Rules";
document.getElementById("answer1").innerHTML =
  "- You will have 30 seconds to complete the quiz";
document.getElementById("answer2").innerHTML =
  "- Each correct answer will reward you with 100 points";
document.getElementById("answer3").innerHTML =
  "- Wrong answers deduct 5 sec from the time";
document.getElementById("answer4").innerHTML = "- Enter your initials to save your score when finished";

// START QUIZ
var initialTime = 0;
var setTime;

function startQuiz() {
  clearInterval(setTime);
  questionIndex = 0; // Increases when user selects an answer
  score.textContent = 0;
  displayQuestion();
  document.querySelector(".question-field").style.pointerEvents = "auto";
  if (initialTime <= 0) {
    initialTime = 3;
    document.getElementById("start-btn").disabled = true;

    setTime = setInterval(function () {
      document.getElementById("timerEl").innerHTML = initialTime;
      initialTime--;

      if (initialTime < 0) {
        clearInterval(setTime);
        document.querySelector(".question-field").style.pointerEvents = "none";
        gameOver(0);
        saveHighScore();
        document.getElementById("start-btn").disabled = false;
      }
    }, 1000);
  }
}

// DISPLAY GAME OVER
function gameOver(index) {
  document.getElementById("question").innerHTML = "GAME OVER";
  for (var i = 0; i < questionSet[questionIndex - index].answers.length; i++) {
    var answerId = "answer" + (i + 1);
    document.getElementById(answerId).innerHTML = "Thanks for playing!";
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

  var rightAnswer = document.getElementById("right");
  var wrongAnswer = document.getElementById("wrong");

  if (selectedAnswer != undefined) {
    if (selectedAnswer == questionSet[questionIndex].correct) {
      // alert("You are correct!");
      wrongAnswer.style.setProperty("display", "none");
      rightAnswer.style.setProperty("display", "block");
      setTimeout(function () {
        rightAnswer.style.display = "none";
      }, 1000);

      score.textContent = parseInt(score.textContent) + 10;
      questionIndex++;

      if (questionIndex < questionSet.length) {
        displayQuestion();
      } else {
        gameOver(1);
        saveHighScore();
        initialTime = 0;
      }
      console.log(questionIndex);
    } else {
      // alert("You are incorrect :(");
      rightAnswer.style.setProperty("display", "none");
      wrongAnswer.style.setProperty("display", "block");
      setTimeout(function () {
        wrongAnswer.style.display = "none";
      }, 1000);

      initialTime = initialTime - 5;
      score.textContent = parseInt(score.textContent) - 5;
      questionIndex++;

      if (questionIndex < questionSet.length) {
        displayQuestion();
      } else {
        gameOver(1);
        saveHighScore();
        initialTime = 0;
      }
      console.log(questionIndex);
    }
  }
});

// Write function saveHighscore()
// 2. prompt user to save initials and highscore
// 3. if user selects save use localStorage.setItem('highscore', score); to save the score
// 4. else exit function
// 5. insert function into code that checks if the user answered the last question or if the time reaches zero - before score is reset to 0
function saveHighScore() {
  // var initials = prompt("Enter your initials to save your score: " + score.value);
  var saveInitials = document.getElementById("save-container");
  var saveButton = document.getElementById("save-button");

  saveInitials.style.display = "flex";

  // if (initials != null) {
  //   localStorage.setItem("initials", initials);
  //   localStorage.setItem("score", score.textContent);
  // }
}
