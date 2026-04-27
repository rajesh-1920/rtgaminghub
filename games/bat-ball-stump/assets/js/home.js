document.addEventListener("DOMContentLoaded", () => {
	const choices = ["bat", "ball", "stump"];
	const beats = {
		bat: "stump",
		stump: "ball",
		ball: "bat",
	};

	const elements = {
		playerScore: document.getElementById("player-score"),
		computerScore: document.getElementById("computer-score"),
		drawScore: document.getElementById("draw-score"),
		roundCount: document.getElementById("round-count"),
		bestStreak: document.getElementById("best-streak"),
		streakText: document.getElementById("streak-text"),
		statusText: document.getElementById("status-text"),
		playerPick: document.getElementById("player-pick"),
		computerPick: document.getElementById("computer-pick"),
		playAgainBtn: document.getElementById("play-again-btn"),
		resetScoreBtn: document.getElementById("reset-score-btn"),
		playPanel: document.querySelector(".play-panel") || document.querySelector('.center-grid'),
		choiceCards: Array.from(document.querySelectorAll(".choice, .choice-card")),
		recentList: document.getElementById('recent-rounds'),
		clearHistoryBtn: document.getElementById('clear-history-btn'),
	};

	const state = {
		playerScore: 0,
		computerScore: 0,
		drawScore: 0,
		roundCount: 1,
		currentStreak: 0,
		bestStreak: 0,
		history: [],
	};

	const storageKey = "rtgaminghub-bat-ball-stump";
	const savedState = loadState();

	if (savedState) {
		Object.assign(state, savedState);
		if (!Array.isArray(state.history)) state.history = [];
	}

	updateScoreboard();
	updateStreakText();
	updateStatus("Choose a move to start the match.");

	elements.choiceCards.forEach((card) => {
		card.addEventListener("click", () => playRound(card.dataset.choice));
	});

	elements.playAgainBtn.addEventListener("click", () => {
		state.roundCount += 1;
		clearHighlights();
		updateRoundCounter();
		updateStatus("New round ready. Pick your next move.");
		saveState();
	});

	elements.resetScoreBtn.addEventListener("click", resetGame);
	if (elements.clearHistoryBtn) elements.clearHistoryBtn.addEventListener('click', clearHistory);

	// Render any saved history on load
	renderHistory();

	function playRound(playerChoice) {
		if (!choices.includes(playerChoice)) {
			return;
		}

		const computerChoice = choices[Math.floor(Math.random() * choices.length)];
		const outcome = getOutcome(playerChoice, computerChoice);

		clearHighlights();
		highlightChoice(playerChoice, computerChoice, outcome);

		if (outcome === "win") {
			state.playerScore += 1;
			state.currentStreak += 1;
			state.bestStreak = Math.max(state.bestStreak, state.currentStreak);
			updateStatus(`You win this round. ${formatChoice(playerChoice)} beats ${formatChoice(computerChoice)}.`);
		} else if (outcome === "lose") {
			state.computerScore += 1;
			state.currentStreak = 0;
			updateStatus(`Computer wins. ${formatChoice(computerChoice)} beats ${formatChoice(playerChoice)}.`);
		} else {
			state.drawScore += 1;
			state.currentStreak = 0;
			updateStatus(`It is a draw. Both chose ${formatChoice(playerChoice)}.`);
		}

		state.roundCount += 1;
		updateScoreboard();
		updateRoundCounter();
		updateStreakText();
		updatePickSummary(playerChoice, computerChoice);
		saveState();

		// record to history (most recent first)
		state.history.unshift({
			round: state.roundCount - 1,
			player: playerChoice,
			computer: computerChoice,
			outcome,
			time: Date.now(),
		});
		if (state.history.length > 12) state.history.length = 12;
		renderHistory();

		elements.playPanel.classList.remove("shake");
		void elements.playPanel.offsetWidth;
		elements.playPanel.classList.add("shake");
	}

	function getOutcome(playerChoice, computerChoice) {
		if (playerChoice === computerChoice) {
			return "draw";
		}

		if (beats[playerChoice] === computerChoice) {
			return "win";
		}

		return "lose";
	}

	function highlightChoice(playerChoice, computerChoice, outcome) {
		elements.choiceCards.forEach((card) => {
			const choice = card.dataset.choice;

			if (choice === playerChoice || choice === computerChoice) {
				card.classList.add("is-active", "pop");
			}

			if (choice === playerChoice) {
				card.classList.add(outcome === "win" ? "is-win" : outcome === "lose" ? "is-lose" : "is-draw");
			}

			if (choice === computerChoice && outcome !== "draw") {
				card.classList.add(outcome === "win" ? "is-lose" : "is-win");
			}
		});
	}

	function clearHighlights() {
		elements.choiceCards.forEach((card) => {
			card.classList.remove("is-active", "is-win", "is-lose", "is-draw", "pop");
		});
		elements.playPanel.classList.remove("shake");
	}

	function updateScoreboard() {
		elements.playerScore.textContent = state.playerScore;
		elements.computerScore.textContent = state.computerScore;
		elements.drawScore.textContent = state.drawScore;
		elements.bestStreak.textContent = state.bestStreak;
	}

	function updateRoundCounter() {
		elements.roundCount.textContent = state.roundCount;
	}

	function updateStatus(message) {
		elements.statusText.textContent = message;
	}

	function updatePickSummary(playerChoice, computerChoice) {
		elements.playerPick.textContent = `You: ${formatChoice(playerChoice)}`;
		elements.computerPick.textContent = `Computer: ${formatChoice(computerChoice)}`;
	}

	function updateStreakText() {
		const streak = state.currentStreak;

		if (!elements.streakText) return;

		if (streak === 0) {
			elements.streakText.textContent = "Win consecutive rounds to build momentum.";
			return;
		}

		elements.streakText.textContent = streak === 1 ? "You are on a 1-round streak." : `You are on a ${streak}-round streak.`;
	}

	function formatChoice(choice) {
		const labels = {
			bat: "Bat",
			ball: "Ball",
			stump: "Stump",
		};

		return labels[choice] || "-";
	}

	function resetGame() {
		state.playerScore = 0;
		state.computerScore = 0;
		state.drawScore = 0;
		state.roundCount = 1;
		state.currentStreak = 0;
		state.bestStreak = 0;

		clearHighlights();
		updateScoreboard();
		updateRoundCounter();
		updateStreakText();
		updateStatus("Scoreboard reset. Choose a move to start again.");
		elements.playerPick.textContent = "You: -";
		elements.computerPick.textContent = "Computer: -";
		saveState();
	}

	function clearHistory() {
		state.history = [];
		renderHistory();
		saveState();
	}

	function renderHistory() {
		if (!elements.recentList) return;
		elements.recentList.innerHTML = '';
		if (!state.history || state.history.length === 0) {
			elements.recentList.innerHTML = '<li class="empty">No recent rounds</li>';
			return;
		}

		state.history.slice(0, 12).forEach((h, idx) => {
			const li = document.createElement('li');
			li.innerHTML = `<div style="display:flex;align-items:center;gap:8px"><div class="history-badge">#${h.round}</div><div><div><strong>${formatChoice(h.player)}</strong> vs <span class="muted">${formatChoice(h.computer)}</span></div><div class=\"history-meta\">${h.outcome}</div></div></div>`;
			elements.recentList.appendChild(li);
		});
	}

	function saveState() {
		try {
			localStorage.setItem(storageKey, JSON.stringify(state));
		} catch (error) {
			console.error("Unable to save game state:", error);
		}
	}

	function loadState() {
		try {
			const stored = localStorage.getItem(storageKey);
			return stored ? JSON.parse(stored) : null;
		} catch (error) {
			console.error("Unable to load game state:", error);
			return null;
		}
	}
});
