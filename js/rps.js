function playRPS(playerChoice) {
  console.log(playerChoice);

  const result = document.getElementById("rps-result");
  const winner = document.querySelector(".winner_header");

  result.textContent = `You picked ${playerChoice}`;

  const choices = ["rock", "paper", "scissors"];

  const randomIndex = Math.floor(Math.random() * choices.length);

  const computerChoice = choices[randomIndex];

  console.log(computerChoice);

  //Paper Beats Rock
  if ((playerChoice === "rock") & (computerChoice === "paper")) {
    winner.textContent = "Winner: Computer";
  } else if ((playerChoice === "paper") & (computerChoice === "rock")) {
    winner.textContent = "Winner: Player";
  }

  //Scissors Beats Paper
  if ((playerChoice === "paper") & (computerChoice === "scissors")) {
    winner.textContent = "Winner: Computer";
  } else if ((playerChoice === "scissors") & (computerChoice === "paper")) {
    winner.textContent = "Winner: Player";
  }

  //Rock Beats Scissors
  if ((playerChoice === "scissors") & (computerChoice === "rock")) {
    winner.textContent = "Winner: Computer";
  } else if ((playerChoice === "rock") & (computerChoice === "scissors")) {
    winner.textContent = "Winner: Player";
  }

  if ((playerChoice === "scissors") & (computerChoice === "scissors")) {
    winner.textContent = "You Tied";
  } else if ((playerChoice === "rock") & (computerChoice === "rock")) {
    winner.textContent = "You Tied";
  } else if ((playerChoice === "paper") & (computerChoice === "paper")) {
    winner.textContent = "You Tied";
  }
}
