const reactionBox = document.getElementById("reaction-box");
const reactionTimeText = document.getElementById("reaction-time");

let reactionStartTime;
let reactionTimeout;
let canClick = false;

// Start the reaction game
function startReactionGame() {
  reactionTimeText.textContent = "Wait for the box...";

  // Reset box
  reactionBox.style.display = "none";
  reactionBox.style.backgroundColor = "red";

  canClick = false;

  // Random delay between 2 and 5 seconds
  const delay = Math.random() * 3000 + 2000;

  reactionTimeout = setTimeout(() => {
    reactionBox.style.display = "block";
    reactionBox.style.backgroundColor = "limegreen";

    reactionStartTime = Date.now();
    canClick = true;
  }, delay);
}

// When player clicks the box
reactionBox.addEventListener("click", () => {
  if (!canClick) {
    reactionTimeText.textContent = "Too early! Try again.";
    clearTimeout(reactionTimeout);
    return;
  }

  const reactionTime = Date.now() - reactionStartTime;

  reactionTimeText.textContent =
    `Your reaction time was ${reactionTime} ms`;

  canClick = false;

  reactionBox.style.display = "none";
});