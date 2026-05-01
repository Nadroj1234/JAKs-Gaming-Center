function showGame(gameId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.add("hidden");
  });

  document.getElementById(gameId).classList.remove("hidden");
}

function goHome() {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.add("hidden");
  });

  document.getElementById("home-screen").classList.remove("hidden");
}
