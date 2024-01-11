var initialTime = 3;

function timer() {
  var setTime = setInterval(function () {
    document.getElementById("timerEl").innerHTML = initialTime;
    initialTime--;
    if (initialTime < 0) {
      clearInterval(setTime);
    }
  }, 1000);
}

timer();