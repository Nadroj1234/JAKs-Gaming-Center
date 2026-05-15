const STORAGE_KEY = "jak-games-leaderboard";
const HISTORY_LIMIT = 8;

function getDefaultScores() {
  return {
    rps: {
      wins: 0,
      losses: 0,
      ties: 0,
      rounds: 0,
      currentWinStreak: 0,
      bestWinStreak: 0,
      recentResults: [],
    },
    memory: {
      gamesPlayed: 0,
      wins: 0,
      bestMoves: null,
      recentWins: [],
    },
    reaction: {
      gamesPlayed: 0,
      bestTime: null,
      attempts: [],
    },
    hangman: {
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      time: 0,
      currentWinStreak: 0,
      bestWinStreak: 0,
      recentResults: [],
    },
  };
}

function safeReadScores() {
  if (typeof window === "undefined") {
    return getDefaultScores();
  }

  try {
    const rawScores = window.localStorage.getItem(STORAGE_KEY);
    if (!rawScores) {
      return getDefaultScores();
    }

    return {
      ...getDefaultScores(),
      ...JSON.parse(rawScores),
    };
  } catch {
    return getDefaultScores();
  }
}

function writeScores(nextScores) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextScores));
}

function withScores(updateFn) {
  const currentScores = safeReadScores();
  const nextScores = updateFn(currentScores);
  writeScores(nextScores);
  return nextScores;
}

function limitHistory(items) {
  return items.slice(0, HISTORY_LIMIT);
}

export function getStoredScores() {
  return safeReadScores();
}

export function recordRpsResult(outcome) {
  return withScores((scores) => {
    const nextScores = structuredClone(scores);
    nextScores.rps.rounds += 1;

    if (outcome === "win") {
      nextScores.rps.wins += 1;
      nextScores.rps.currentWinStreak += 1;
      nextScores.rps.bestWinStreak = Math.max(
        nextScores.rps.bestWinStreak,
        nextScores.rps.currentWinStreak,
      );
    } else if (outcome === "loss") {
      nextScores.rps.losses += 1;
      nextScores.rps.currentWinStreak = 0;
    } else {
      nextScores.rps.ties += 1;
      nextScores.rps.currentWinStreak = 0;
    }

    nextScores.rps.recentResults = limitHistory([
      {
        outcome,
        playedAt: new Date().toISOString(),
      },
      ...nextScores.rps.recentResults,
    ]);

    return nextScores;
  });
}

export function recordMemoryWin(moves) {
  return withScores((scores) => {
    const nextScores = structuredClone(scores);
    nextScores.memory.gamesPlayed += 1;
    nextScores.memory.wins += 1;
    nextScores.memory.bestMoves =
      nextScores.memory.bestMoves === null
        ? moves
        : Math.min(nextScores.memory.bestMoves, moves);
    nextScores.memory.recentWins = limitHistory([
      {
        moves,
        playedAt: new Date().toISOString(),
      },
      ...nextScores.memory.recentWins,
    ]);

    return nextScores;
  });
}

export function recordReactionAttempt(timeMs) {
  return withScores((scores) => {
    const nextScores = structuredClone(scores);
    nextScores.reaction.gamesPlayed += 1;
    nextScores.reaction.bestTime =
      nextScores.reaction.bestTime === null
        ? timeMs
        : Math.min(nextScores.reaction.bestTime, timeMs);
    nextScores.reaction.attempts = limitHistory([
      {
        timeMs,
        playedAt: new Date().toISOString(),
      },
      ...nextScores.reaction.attempts.sort(
        (first, second) => first.timeMs - second.timeMs,
      ),
    ]).sort((first, second) => first.timeMs - second.timeMs);

    return nextScores;
  });
}

export function recordHangmanResult({ won, difficulty, remainingGuesses }) {
  return withScores((scores) => {
    const nextScores = structuredClone(scores);
    nextScores.hangman.gamesPlayed += 1;

    nextScores.hangman.gamesPlayed += 1;
    nextScores.hangman.time =
      nextScores.hangman.time === 0
        ? time
        : Math.min(nextScores.hangman.time, time);
    nextScores.hangman.recentResults = limitHistory([
      {
        timeMs,
        playedAt: new Date().toISOString(),
      },
      ...nextScores.hangman.recentResults,
    ]);

    if (won) {
      nextScores.hangman.time = time;
      nextScores.hangman.wins += 1;
      nextScores.hangman.currentWinStreak += 1;
      nextScores.hangman.bestWinStreak = Math.max(
        nextScores.hangman.bestWinStreak,
        nextScores.hangman.currentWinStreak,
      );
    } else {
      nextScores.hangman.losses += 1;
      nextScores.hangman.currentWinStreak = 0;
    }

    nextScores.hangman.recentResults = limitHistory([
      {
        outcome: won ? "win" : "loss",
        difficulty,
        remainingGuesses,
        playedAt: new Date().toISOString(),
      },
      ...nextScores.hangman.recentResults,
    ]);

    return nextScores;
  });
}
