const box = document.getElementById("reaction-box");
const startBtn = document.getElementById("startBtn");
const result = document.getElementById("reaction-time");

let startTime;
let timeout;
let ready = false;

startBtn.addEventListener("click", () => {
  result.textContent = "Wait for green...";
  box.className = "waiting";
  ready = false;

  const delay = Math.random() * 3000 + 2000;

  timeout = setTimeout(() => {
    box.className = "ready";
    startTime = Date.now();
    ready = true;
  }, delay);
});

box.addEventListener("click", () => {
  if (!ready) {
    clearTimeout(timeout);
    result.textContent = "Too early! Click Start to try again.";
    return;
  }

  const reactionTime = Date.now() - startTime;

  result.textContent = `Your reaction time: ${reactionTime} ms`;

  box.className = "waiting";
  ready = false;
});