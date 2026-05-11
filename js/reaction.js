const reactionBox = document.getElementById("reaction-box");
const reactionTimeText = document.getElementById("reaction-time");

let reactionStartTime;
let reactionTimeout;
let gameStarted = false;
let canClick = false;

reactionBox.textContent = "WAIT";

function startReactionGame() {
  clearTimeout(reactionTimeout);

  reactionTimeText.textContent = "Wait for green...";
  reactionBox.textContent = "WAIT";

  reactionBox.classList.remove("ready");

  gameStarted = true;
  canClick = false;

  // Random delay between 2–5 seconds
  const delay = Math.random() * 3000 + 2000;

  reactionTimeout = setTimeout(() => {
    reactionBox.classList.add("ready");
    reactionBox.textContent = "CLICK!";

    reactionStartTime = Date.now();
    canClick = true;
  }, delay);
}

reactionBox.addEventListener("click", () => {
  // Prevent clicking before game starts
  if (!gameStarted) {
    reactionTimeText.textContent = "Press Start First!";
    return;
  }

  // Prevent preclicking
  if (!canClick) {
    clearTimeout(reactionTimeout);

    reactionTimeText.textContent = "Too Early!";

    reactionBox.classList.remove("ready");
    reactionBox.textContent = "WAIT";

    gameStarted = false;
    return;
  }

  const reactionTime = Date.now() - reactionStartTime;

  reactionTimeText.textContent =
    `Reaction Time: ${reactionTime} ms`;

  reactionBox.classList.remove("ready");
  reactionBox.textContent = "WAIT";

  gameStarted = false;
  canClick = false;
});