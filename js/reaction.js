const reactionBox = document.getElementById("reaction-box");
const reactionTimeText = document.getElementById("reaction-time");

let reactionStartTime;
let reactionTimeout;
let canClick = false;

// RED style
function setRed() {
  reactionBox.style.background = "linear-gradient(145deg, #ff4d4d, #cc0000)";

  reactionBox.style.boxShadow = "0 5px 0 #990000, 0 8px 15px rgba(0,0,0,0.3)";
}

// GREEN style
function setGreen() {
  reactionBox.style.background = "linear-gradient(145deg, #4caf50, #2e7d32)";

  reactionBox.style.boxShadow = "0 5px 0 #1b5e20, 0 8px 15px rgba(0,0,0,0.3)";
}

// Starting state
reactionBox.textContent = "WAIT";
setRed();

function startReactionGame() {
  clearTimeout(reactionTimeout);

  reactionTimeText.textContent = "Wait for green...";

  setRed();
  reactionBox.textContent = "WAIT";

  canClick = false;

  const delay = Math.random() * 3000 + 2000;

  reactionTimeout = setTimeout(() => {
    setGreen();

    reactionBox.textContent = "CLICK!";

    reactionStartTime = Date.now();
    canClick = true;
  }, delay);
}

reactionBox.addEventListener("click", () => {
  // Too early
  if (!canClick) {
    clearTimeout(reactionTimeout);

    reactionTimeText.textContent = "Too Early!";

    setRed();
    reactionBox.textContent = "WAIT";

    return;
  }

  // Reaction time
  const reactionTime = Date.now() - reactionStartTime;

  reactionTimeText.textContent = `Reaction Time: ${reactionTime} ms`;

  setRed();
  reactionBox.textContent = "WAIT";

  canClick = false;
});
