// === Python Quest — Full client-side RPG game ===

// === Quest Data ===
const QUESTS = [
    // --- Chapter 1: The Village of Variables ---
    {
        chapter: "The Village of Variables",
        story: "You arrive at a small village under attack by a Bug Goblin. The village elder says only someone who understands Python basics can defeat it!",
        enemy: { name: "Bug Goblin", sprite: "goblin", attack: 8 },
        challenge: {
            question: "The goblin casts a spell! Quick \u2014 what is the correct way to create a variable in Python?",
            options: ["var x = 10", "x = 10", "int x = 10", "let x = 10"],
            answer: "x = 10",
            explanation: "Python uses simple assignment with =. No type declarations or keywords like var/let needed.",
        },
        xpReward: 30, goldReward: 15, rewardItem: "Wooden Sword",
    },
    {
        chapter: "The Village of Variables",
        story: "Another creature emerges \u2014 a Syntax Slime! It speaks in broken code and oozes errors.",
        enemy: { name: "Syntax Slime", sprite: "slime", attack: 6 },
        challenge: {
            question: "The slime hurls bad code at you! Which data type is 3.14?",
            options: ["int", "str", "float", "bool"],
            answer: "float",
            explanation: "3.14 has a decimal point, making it a float (floating-point number).",
        },
        xpReward: 30, goldReward: 10, rewardItem: null,
    },
    {
        chapter: "The Village of Variables",
        story: "A massive Type Troll blocks the bridge out of the village. It demands you prove your knowledge!",
        enemy: { name: "Type Troll", sprite: "troll", attack: 12 },
        challenge: {
            question: "The troll roars: What does type('hello') return?",
            options: ["<class 'str'>", "<class 'int'>", "<class 'char'>", "<class 'text'>"],
            answer: "<class 'str'>",
            explanation: "Text in quotes is a string (str) in Python. There is no char or text type.",
        },
        xpReward: 40, goldReward: 20, rewardItem: "Leather Shield",
    },
    // --- Chapter 2: The Forest of Flow ---
    {
        chapter: "The Forest of Flow",
        story: "You enter a dark forest. A Conditional Cobra slithers toward you, hissing if/else statements!",
        enemy: { name: "Conditional Cobra", sprite: "snake", attack: 14 },
        challenge: {
            question: "The cobra strikes! What keyword handles an alternative condition in Python?",
            options: ["else if", "elif", "elseif", "elsif"],
            answer: "elif",
            explanation: "Python uses 'elif' (short for else if) for additional conditions after 'if'.",
        },
        xpReward: 40, goldReward: 20, rewardItem: null,
    },
    {
        chapter: "The Forest of Flow",
        story: "A Loop Wolf circles you endlessly, round and round. You must break free with your Python knowledge!",
        enemy: { name: "Loop Wolf", sprite: "wolf", attack: 16 },
        challenge: {
            question: "The wolf traps you in an infinite loop! Which keyword exits a loop immediately?",
            options: ["stop", "exit", "break", "end"],
            answer: "break",
            explanation: "'break' immediately exits the current loop. 'continue' would skip to the next iteration.",
        },
        xpReward: 45, goldReward: 25, rewardItem: "Speed Boots",
    },
    {
        chapter: "The Forest of Flow",
        story: "Deep in the forest, a Range Wraith appears from the shadows! It guards the path with number sequences.",
        enemy: { name: "Range Wraith", sprite: "wraith", attack: 18 },
        challenge: {
            question: "The wraith asks: What does list(range(3)) produce?",
            options: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "[3]"],
            answer: "[0, 1, 2]",
            explanation: "range(3) generates numbers starting at 0, up to but not including 3: 0, 1, 2.",
        },
        xpReward: 50, goldReward: 25, rewardItem: null,
    },
    // --- Chapter 3: The Cavern of Collections ---
    {
        chapter: "The Cavern of Collections",
        story: "You descend into a crystal cavern. A List Lizard guards a treasure chest full of data!",
        enemy: { name: "List Lizard", sprite: "lizard", attack: 18 },
        challenge: {
            question: "The lizard challenges you: How do you add an item to the end of a list?",
            options: ["list.add(item)", "list.append(item)", "list.push(item)", "list.insert(item)"],
            answer: "list.append(item)",
            explanation: "append() adds a single item to the end of a list. push() is JavaScript, not Python!",
        },
        xpReward: 50, goldReward: 30, rewardItem: "Crystal Ring",
    },
    {
        chapter: "The Cavern of Collections",
        story: "A Dictionary Dragon awakens from its slumber! It breathes key-value fire at you!",
        enemy: { name: "Dictionary Dragon", sprite: "dragon", attack: 22 },
        challenge: {
            question: "The dragon demands: How do you access the value for key 'name' in a dictionary d?",
            options: ["d.name", "d['name']", "d(name)", "d.get['name']"],
            answer: "d['name']",
            explanation: "Use square brackets with the key: d['name']. You can also use d.get('name') with parentheses.",
        },
        xpReward: 55, goldReward: 30, rewardItem: null,
    },
    {
        chapter: "The Cavern of Collections",
        story: "The cavern shakes violently! A Tuple Titan rises from the ground, immovable and unchangeable!",
        enemy: { name: "Tuple Titan", sprite: "golem", attack: 24 },
        challenge: {
            question: "The titan asks: Why would you use a tuple instead of a list?",
            options: [
                "Tuples are faster and immutable",
                "Tuples can hold more items",
                "Tuples support more methods",
                "Tuples use less syntax",
            ],
            answer: "Tuples are faster and immutable",
            explanation: "Tuples are immutable (can't be changed after creation) and slightly faster than lists. Use them for fixed data.",
        },
        xpReward: 55, goldReward: 35, rewardItem: "Iron Armor",
    },
    // --- Chapter 4: The Tower of Functions ---
    {
        chapter: "The Tower of Functions",
        story: "You climb an ancient wizard's tower. A Function Phantom materializes and blocks the stairway!",
        enemy: { name: "Function Phantom", sprite: "phantom", attack: 22 },
        challenge: {
            question: "The phantom whispers: What keyword defines a function in Python?",
            options: ["function", "func", "def", "define"],
            answer: "def",
            explanation: "Python uses 'def' followed by the function name and parentheses to define functions.",
        },
        xpReward: 55, goldReward: 30, rewardItem: null,
    },
    {
        chapter: "The Tower of Functions",
        story: "Higher in the tower, a Lambda Lich floats before you, casting anonymous spells from the shadows!",
        enemy: { name: "Lambda Lich", sprite: "lich", attack: 26 },
        challenge: {
            question: "The lich casts a lambda! What does (lambda x: x * 2)(5) return?",
            options: ["'xx'", "25", "10", "Error"],
            answer: "10",
            explanation: "The lambda takes x and returns x * 2. With input 5, it returns 10. It's an anonymous function.",
        },
        xpReward: 60, goldReward: 35, rewardItem: "Magic Staff",
    },
    {
        chapter: "The Tower of Functions",
        story: "At the very top of the tower, the Return Reaper awaits \u2014 the final guardian of the tower!",
        enemy: { name: "Return Reaper", sprite: "reaper", attack: 28 },
        challenge: {
            question: "The reaper asks: What does a function return if it has no return statement?",
            options: ["0", "''", "None", "False"],
            answer: "None",
            explanation: "Functions without an explicit return statement implicitly return None in Python.",
        },
        xpReward: 65, goldReward: 40, rewardItem: "Enchanted Cloak",
    },
    // --- Chapter 5: The Final Boss ---
    {
        chapter: "The Python's Lair",
        story: "You enter the final chamber deep underground. The Python King \u2014 an ancient serpent of pure code \u2014 towers before you. Defeat it to prove you are a true Pythonista!",
        enemy: { name: "The Python King", sprite: "boss", attack: 35 },
        challenge: {
            question: "The Python King's ultimate test: What is the output of [x**2 for x in range(4)]?",
            options: ["[1, 4, 9, 16]", "[0, 1, 4, 9]", "[0, 2, 4, 6]", "[1, 2, 3, 4]"],
            answer: "[0, 1, 4, 9]",
            explanation: "This is a list comprehension. range(4) gives 0,1,2,3. Squaring each: 0\u00b2=0, 1\u00b2=1, 2\u00b2=4, 3\u00b2=9.",
        },
        xpReward: 100, goldReward: 100, rewardItem: "Python Crown",
    },
];

const ENEMY_EMOJIS = {
    goblin: "\u{1F47A}", slime: "\u{1F7E2}", troll: "\u{1F9CC}",
    snake: "\u{1F40D}", wolf: "\u{1F43A}", wraith: "\u{1F47B}",
    lizard: "\u{1F98E}", dragon: "\u{1F409}", golem: "\u{1FAA8}",
    phantom: "\u{1F47B}", lich: "\u{1F480}", reaper: "\u2620\uFE0F",
    boss: "\u{1F40D}",
};

// === Player State ===
function createPlayer(name) {
    return {
        name: name || "Hero",
        hp: 100,
        maxHp: 100,
        xp: 0,
        level: 1,
        gold: 0,
        attack: 10,
        defense: 5,
        questIndex: 0,
        inventory: [],
        defeatedEnemies: [],
    };
}

let player = null;
let answering = false;

// === DOM helpers ===
const $ = (id) => document.getElementById(id);

// === LocalStorage Save/Load ===
function saveGame() {
    try {
        localStorage.setItem("pythonquest_save", JSON.stringify(player));
    } catch (e) {
        // Storage full or unavailable - game still works, just won't persist
    }
}

function loadGame() {
    try {
        const data = localStorage.getItem("pythonquest_save");
        if (data) return JSON.parse(data);
    } catch (e) {
        // Corrupted save - start fresh
    }
    return null;
}

function clearSave() {
    try {
        localStorage.removeItem("pythonquest_save");
    } catch (e) {
        // Ignore
    }
}

// === Screens ===
function showScreen(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    $(id).classList.add("active");
}

// === Notification ===
function notify(text, duration) {
    duration = duration || 2500;
    const el = $("notification");
    el.textContent = text;
    el.classList.remove("hidden");
    setTimeout(function () { el.classList.add("hidden"); }, duration);
}

// === HUD ===
function updateHUD() {
    $("hud-name").textContent = player.name;
    $("hud-level").textContent = "Lv. " + player.level;
    $("hud-xp").textContent = "XP: " + player.xp;
    $("hud-gold").textContent = "Gold: " + player.gold;

    var pct = Math.max(0, (player.hp / player.maxHp) * 100);
    var hpBar = $("hp-bar");
    hpBar.style.width = pct + "%";
    if (pct < 30) {
        hpBar.classList.add("low");
    } else {
        hpBar.classList.remove("low");
    }
    $("hp-text").textContent = player.hp + "/" + player.maxHp;
}

// === Quest Progress Bar ===
function updateQuestProgress() {
    var container = $("quest-progress");
    container.innerHTML = "";
    for (var i = 0; i < QUESTS.length; i++) {
        var dot = document.createElement("div");
        dot.className = "quest-dot";
        if (i < player.questIndex) {
            dot.classList.add("completed");
        } else if (i === player.questIndex) {
            dot.classList.add("current");
        }
        container.appendChild(dot);
    }
}

// === Render Quest ===
function renderQuest() {
    if (player.questIndex >= QUESTS.length) {
        showVictory();
        return;
    }

    var quest = QUESTS[player.questIndex];

    $("chapter-banner").textContent = quest.chapter;
    updateQuestProgress();

    // Enemy
    var emoji = ENEMY_EMOJIS[quest.enemy.sprite] || "\u{1F47E}";
    $("enemy-sprite").textContent = emoji;
    $("enemy-name").textContent = quest.enemy.name;
    $("story-text").textContent = quest.story;

    // Challenge
    $("question-text").textContent = quest.challenge.question;

    var container = $("options-container");
    container.innerHTML = "";

    quest.challenge.options.forEach(function (opt) {
        var btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.addEventListener("click", function () { submitAnswer(opt, btn); });
        container.appendChild(btn);
    });

    // Show challenge, hide result
    $("challenge-area").classList.remove("hidden");
    $("result-area").classList.add("hidden");
    answering = false;
}

// === Submit Answer ===
function submitAnswer(answer, btnEl) {
    if (answering) return;
    answering = true;

    // Disable all buttons
    var allBtns = document.querySelectorAll(".option-btn");
    allBtns.forEach(function (b) { b.disabled = true; });

    var quest = QUESTS[player.questIndex];
    var isCorrect = answer === quest.challenge.answer;

    if (isCorrect) {
        btnEl.classList.add("correct");
    } else {
        btnEl.classList.add("wrong");
        // Highlight correct answer
        allBtns.forEach(function (b) {
            if (b.textContent === quest.challenge.answer) {
                b.classList.add("correct");
            }
        });
    }

    // Process result after a brief pause for visual feedback
    setTimeout(function () { processResult(isCorrect, quest); }, 700);
}

// === Process Result ===
function processResult(isCorrect, quest) {
    $("challenge-area").classList.add("hidden");
    $("result-area").classList.remove("hidden");

    var msgEl = $("result-message");
    var iconEl = $("result-icon");

    if (isCorrect) {
        // Rewards
        player.xp += quest.xpReward;
        player.gold += quest.goldReward;
        player.defeatedEnemies.push(quest.enemy.name);

        if (quest.rewardItem) {
            player.inventory.push(quest.rewardItem);
        }

        // Level up
        var leveledUp = false;
        var xpNeeded = player.level * 100;
        while (player.xp >= xpNeeded) {
            player.level++;
            player.maxHp += 20;
            player.hp = player.maxHp;
            player.attack += 5;
            player.defense += 3;
            leveledUp = true;
            xpNeeded = player.level * 100;
        }

        player.questIndex++;

        iconEl.textContent = "\u2694\uFE0F";
        msgEl.textContent = "You defeated " + quest.enemy.name + "!";
        msgEl.style.color = "var(--green)";

        var rewardText = "+" + quest.xpReward + " XP, +" + quest.goldReward + " Gold";
        if (quest.rewardItem) {
            rewardText += "\nNew item: " + quest.rewardItem + "!";
        }
        if (leveledUp) {
            rewardText += "\n\u2B50 LEVEL UP! You are now Level " + player.level + "!";
            $("hud-level").classList.add("level-up-flash");
            setTimeout(function () { $("hud-level").classList.remove("level-up-flash"); }, 1500);
        }
        $("result-rewards").textContent = rewardText;
        $("result-rewards").style.whiteSpace = "pre-line";

    } else {
        // Take damage
        var damage = Math.max(5, quest.enemy.attack - player.defense);
        player.hp = Math.max(0, player.hp - damage);

        iconEl.textContent = "\u{1F4A5}";
        msgEl.textContent = quest.enemy.name + " attacks! You take " + damage + " damage.";
        msgEl.style.color = "var(--accent)";

        var rewardArea = $("result-rewards");
        if (player.hp <= 0) {
            player.hp = player.maxHp;
            rewardArea.textContent = "You were knocked out and revived at camp. Try again!";
            rewardArea.style.color = "var(--text-dim)";
        } else {
            rewardArea.textContent = "HP: " + player.hp + "/" + player.maxHp + " \u2014 Try again!";
            rewardArea.style.color = "var(--text-dim)";
        }
    }

    $("result-explanation").textContent = quest.challenge.explanation;

    updateHUD();
    updateQuestProgress();
    saveGame();
}

// === Continue Button ===
$("continue-btn").addEventListener("click", function () {
    if (player.questIndex >= QUESTS.length) {
        showVictory();
    } else {
        renderQuest();
    }
});

// === Victory ===
function showVictory() {
    showScreen("victory-screen");
    $("final-stats").innerHTML =
        "<strong>" + player.name + "'s Journey</strong><br>" +
        "Level: " + player.level + "<br>" +
        "Total XP: " + player.xp + "<br>" +
        "Gold: " + player.gold + "<br>" +
        "Items: " + (player.inventory.length > 0 ? player.inventory.join(", ") : "None") + "<br>" +
        "Enemies Defeated: " + player.defeatedEnemies.length + "/" + QUESTS.length;
    clearSave();
}

// === Start Game ===
$("start-btn").addEventListener("click", startNewGame);
$("player-name").addEventListener("keydown", function (e) {
    if (e.key === "Enter") startNewGame();
});

function startNewGame() {
    var name = $("player-name").value.trim() || "Hero";
    player = createPlayer(name);
    saveGame();
    updateHUD();
    renderQuest();
    showScreen("game-screen");
}

// === Continue Saved Game ===
$("continue-save-btn").addEventListener("click", function () {
    var saved = loadGame();
    if (saved) {
        player = saved;
        updateHUD();
        if (player.questIndex >= QUESTS.length) {
            showVictory();
        } else {
            renderQuest();
            showScreen("game-screen");
        }
    }
});

// === Rest at Inn ===
$("rest-btn").addEventListener("click", function () {
    if (player.gold >= 10) {
        player.gold -= 10;
        player.hp = player.maxHp;
        updateHUD();
        saveGame();
        notify("You rest at the inn and restore full HP!");
    } else {
        notify("Not enough gold! You need 10 gold to rest.");
    }
});

// === Inventory ===
$("inventory-btn").addEventListener("click", function () {
    var list = $("inventory-list");
    if (player.inventory.length === 0) {
        list.innerHTML = '<div class="inv-item" style="color:var(--text-dim)">No items yet. Defeat enemies to earn loot!</div>';
    } else {
        list.innerHTML = player.inventory
            .map(function (item) { return '<div class="inv-item">\u{1F392} ' + item + '</div>'; })
            .join("");
    }
    $("inventory-modal").classList.remove("hidden");
});

$("close-inventory").addEventListener("click", function () {
    $("inventory-modal").classList.add("hidden");
});

// Close modal on backdrop click
$("inventory-modal").addEventListener("click", function (e) {
    if (e.target === $("inventory-modal")) {
        $("inventory-modal").classList.add("hidden");
    }
});

// === Replay ===
$("replay-btn").addEventListener("click", function () {
    clearSave();
    showScreen("start-screen");
    $("player-name").value = "";
    $("continue-save-btn").classList.add("hidden");
});

// === Init: check for saved game ===
(function init() {
    var saved = loadGame();
    if (saved && saved.questIndex < QUESTS.length) {
        $("continue-save-btn").classList.remove("hidden");
    }
})();
