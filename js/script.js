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

