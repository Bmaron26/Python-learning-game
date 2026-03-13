// === Python Quest — Game Frontend ===

const ENEMY_EMOJIS = {
    goblin: "\u{1F47A}", slime: "\u{1F7E2}", troll: "\u{1F9CC}",
    snake: "\u{1F40D}", wolf: "\u{1F43A}", wraith: "\u{1F47B}",
    lizard: "\u{1F98E}", dragon: "\u{1F409}", golem: "\u{1FAA8}",
    phantom: "\u{1F47B}", lich: "\u{1F480}", reaper: "\u{2620}\uFE0F",
    boss: "\u{1F40D}",
};

// === State ===
let currentState = null;
let answering = false;

// === DOM Elements ===
const $ = (id) => document.getElementById(id);

// === Screens ===
function showScreen(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    $(id).classList.add("active");
}

// === Notification ===
function notify(text, duration = 2000) {
    const el = $("notification");
    el.textContent = text;
    el.classList.remove("hidden");
    setTimeout(() => el.classList.add("hidden"), duration);
}

// === Update HUD ===
function updateHUD(player) {
    $("hud-name").textContent = player.name;
    $("hud-level").textContent = `Lv. ${player.level}`;
    $("hud-xp").textContent = `XP: ${player.xp}`;
    $("hud-gold").textContent = `Gold: ${player.gold}`;

    const pct = Math.max(0, (player.hp / player.max_hp) * 100);
    const hpBar = $("hp-bar");
    hpBar.style.width = pct + "%";
    hpBar.classList.toggle("low", pct < 30);
    $("hp-text").textContent = `${player.hp}/${player.max_hp}`;
}

// === Render Quest ===
function renderQuest(quest) {
    if (!quest) {
        // Game complete!
        showVictory();
        return;
    }

    $("chapter-banner").textContent = quest.chapter;

    // Enemy
    const emoji = ENEMY_EMOJIS[quest.enemy.sprite] || "\u{1F47E}";
    $("enemy-sprite").textContent = emoji;
    $("enemy-name").textContent = quest.enemy.name;
    $("story-text").textContent = quest.story;

    // Challenge
    $("question-text").textContent = quest.challenge.question;

    const container = $("options-container");
    container.innerHTML = "";

    if (quest.challenge.options) {
        quest.challenge.options.forEach((opt) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = opt;
            btn.addEventListener("click", () => submitAnswer(opt, btn));
            container.appendChild(btn);
        });
    }

    // Show challenge area, hide result
    $("challenge-area").classList.remove("hidden");
    $("result-area").classList.add("hidden");
    answering = false;
}

// === Submit Answer ===
async function submitAnswer(answer, btnEl) {
    if (answering) return;
    answering = true;

    // Disable all option buttons
    document.querySelectorAll(".option-btn").forEach((b) => (b.disabled = true));

    try {
        const res = await fetch("/api/answer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answer }),
        });
        const data = await res.json();

        // Highlight correct/wrong
        if (data.correct) {
            btnEl.classList.add("correct");
        } else {
            btnEl.classList.add("wrong");
            // Highlight the correct answer
            document.querySelectorAll(".option-btn").forEach((b) => {
                if (b.textContent === data.correct_answer) {
                    b.classList.add("correct");
                }
            });
        }

        // Update HUD
        updateHUD(data.player);
        currentState = data;

        // Show result after a brief delay
        setTimeout(() => showResult(data), 600);
    } catch (err) {
        notify("Connection error. Try again.");
        answering = false;
        document.querySelectorAll(".option-btn").forEach((b) => (b.disabled = false));
    }
}

// === Show Result ===
function showResult(data) {
    $("challenge-area").classList.add("hidden");
    $("result-area").classList.remove("hidden");

    const msgEl = $("result-message");
    msgEl.textContent = data.message;
    msgEl.style.color = data.correct ? "var(--green)" : "var(--accent)";

    $("result-explanation").textContent = data.explanation;

    let rewardText = "";
    if (data.correct) {
        rewardText = `+${data.xp_gain} XP, +${data.gold_gain} Gold`;
        if (data.leveled_up) {
            rewardText += " | LEVEL UP!";
            $("hud-level").classList.add("level-up-flash");
            setTimeout(() => $("hud-level").classList.remove("level-up-flash"), 1500);
        }
    }
    $("result-rewards").textContent = rewardText;
}

// === Continue Button ===
$("continue-btn").addEventListener("click", () => {
    if (currentState && currentState.quest) {
        renderQuest(currentState.quest);
    } else {
        showVictory();
    }
});

// === Victory Screen ===
function showVictory() {
    showScreen("victory-screen");
    const player = currentState ? currentState.player : { name: "Hero", level: 1, xp: 0, gold: 0, inventory: [] };
    $("final-stats").innerHTML = `
        <strong>${player.name}'s Journey</strong><br>
        Level: ${player.level}<br>
        Total XP: ${player.xp}<br>
        Gold: ${player.gold}<br>
        Items: ${player.inventory.length > 0 ? player.inventory.join(", ") : "None"}<br>
        Enemies Defeated: ${player.defeated_enemies ? player.defeated_enemies.length : 0}
    `;
}

// === Start Game ===
$("start-btn").addEventListener("click", startGame);
$("player-name").addEventListener("keydown", (e) => {
    if (e.key === "Enter") startGame();
});

async function startGame() {
    const name = $("player-name").value.trim() || "Hero";

    try {
        const res = await fetch("/api/new-game", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        const data = await res.json();
        currentState = data;
        updateHUD(data.player);
        renderQuest(data.quest);
        showScreen("game-screen");
    } catch (err) {
        notify("Failed to start game. Is the server running?");
    }
}

// === Rest at Inn ===
$("rest-btn").addEventListener("click", async () => {
    try {
        const res = await fetch("/api/rest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        updateHUD(data.player);
        notify(data.message);
    } catch {
        notify("Connection error.");
    }
});

// === Inventory ===
$("inventory-btn").addEventListener("click", () => {
    const player = currentState ? currentState.player : { inventory: [] };
    const list = $("inventory-list");
    if (player.inventory.length === 0) {
        list.innerHTML = '<div class="inv-item" style="color:var(--text-dim)">No items yet</div>';
    } else {
        list.innerHTML = player.inventory
            .map((item) => `<div class="inv-item">${item}</div>`)
            .join("");
    }
    $("inventory-modal").classList.remove("hidden");
});

$("close-inventory").addEventListener("click", () => {
    $("inventory-modal").classList.add("hidden");
});

// === Replay ===
$("replay-btn").addEventListener("click", () => {
    showScreen("start-screen");
    $("player-name").value = "";
});

// === Load existing state on page load ===
(async function init() {
    try {
        const res = await fetch("/api/state");
        const data = await res.json();
        if (data.quest) {
            currentState = data;
            updateHUD(data.player);
            renderQuest(data.quest);
            showScreen("game-screen");
        }
    } catch {
        // Fresh start
    }
})();
