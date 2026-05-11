const reactionBox = document.getElementById("reaction-box");
const reactionTimeText = document.getElementById("reaction-time");

let reactionStartTime;
let reactionTimeout;
let canClick = false;

// Box is always visible
reactionBox.textContent = "WAIT";
reactionBox.style.backgroundColor = "red";

function startReactionGame() {
  clearTimeout(reactionTimeout);

  reactionTimeText.textContent = "Wait for green...";

  // Reset box to red
  reactionBox.style.backgroundColor = "red";
  reactionBox.textContent = "WAIT";

  canClick = false;

  // Random delay between 2–5 seconds
  const delay = Math.random() * 3000 + 2000;

  reactionTimeout = setTimeout(() => {
    // Turn green when ready
    reactionBox.style.backgroundColor = "green";
    reactionBox.textContent = "CLICK!";

    reactionStartTime = Date.now();
    canClick = true;
  }, delay);
}

reactionBox.addEventListener("click", () => {
  // Clicked too early
  if (!canClick) {
    clearTimeout(reactionTimeout);

    reactionTimeText.textContent = "Too Early!";

    reactionBox.style.backgroundColor = "red";
    reactionBox.textContent = "WAIT";

    return;
  }

  // Calculate reaction time
  const reactionTime = Date.now() - reactionStartTime;

  reactionTimeText.textContent =
    `Reaction Time: ${reactionTime} ms`;

  // Reset box
  reactionBox.style.backgroundColor = "red";
  reactionBox.textContent = "WAIT";

  canClick = false;
});