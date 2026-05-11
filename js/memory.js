let firstCard = null;
let secondCard = null;
let lockBoard = false;

const emojis = ["🐶", "🐱", "🐸", "🦊"];

const board = document.getElementById("memory-board");
const winner = document.getElementById("winner-div");



function startMemoryGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  board.innerHTML = "";

  const cards = [...emojis, ...emojis];
  shuffle(cards);

  cards.forEach((emoji) => {
    const card = document.createElement("div");

    card.classList.add("card");
    card.textContent = emoji;

    card.addEventListener("click", () => {
      if (lockBoard) return;
      if (card.classList.contains("flipped")) return;
      if (card.classList.contains("matched")) return;

      card.classList.add("flipped");

      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;
      lockBoard = true;

      checkMatch(winner);
    });

    board.appendChild(card);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkMatch(winner) {
  const isMatch = firstCard.textContent === secondCard.textContent;


  if (!isMatch) {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      resetBoard();
    }, 800);
  } else {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    resetBoard();
  }
  if (document.querySelectorAll(".card:not(.matched)").length === 0) {
    winner.innerHTML = "YOU WIN!!!";
    board.innerHTML = "";
    setTimeout(() => {
      winner.innerHTML = "";
    }, 900);
  }
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
