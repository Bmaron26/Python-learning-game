// ============================================================
// Python Quest — Full RPG Game Engine (client-side)
// ============================================================

// === Avatar Classes ===
var AVATARS = [
    { id: "warrior", emoji: "\u2694\uFE0F", name: "Warrior", stat: "+20 HP", hpBonus: 20, atkBonus: 0, defBonus: 0 },
    { id: "mage",    emoji: "\uD83E\uDDD9", name: "Mage",    stat: "+3 ATK", hpBonus: 0,  atkBonus: 3, defBonus: 0 },
    { id: "ranger",  emoji: "\uD83C\uDFF9", name: "Ranger",  stat: "+2 DEF", hpBonus: 0,  atkBonus: 0, defBonus: 2 },
    { id: "rogue",   emoji: "\uD83D\uDDE1\uFE0F", name: "Rogue", stat: "+2 ATK +1 DEF", hpBonus: 0, atkBonus: 2, defBonus: 1 },
    { id: "monk",    emoji: "\uD83E\uDD4B", name: "Monk",    stat: "+10 HP +1 ATK", hpBonus: 10, atkBonus: 1, defBonus: 0 },
    { id: "bard",    emoji: "\uD83C\uDFB5", name: "Bard",    stat: "+10 HP +1 DEF", hpBonus: 10, atkBonus: 0, defBonus: 1 },
];

// === Enemy Emojis ===
var ENEMY_EMOJIS = {
    goblin: "\uD83D\uDC7A", slime: "\uD83D\uDFE2", troll: "\uD83E\uDDCC",
    snake: "\uD83D\uDC0D", wolf: "\uD83D\uDC3A", wraith: "\uD83D\uDC7B",
    lizard: "\uD83E\uDD8E", dragon: "\uD83D\uDC09", golem: "\uD83E\uDEA8",
    phantom: "\uD83D\uDC7B", lich: "\uD83D\uDC80", reaper: "\u2620\uFE0F",
    spider: "\uD83D\uDD77\uFE0F", bat: "\uD83E\uDD87", mimic: "\uD83C\uDF81",
    boss: "\uD83D\uDC0D", elemental: "\uD83D\uDD25", gargoyle: "\uD83E\uDEA8",
    siren: "\uD83E\uDDDC", shadow: "\uD83C\uDF11",
};

// === Map Node Types ===
var NODE_BATTLE = "battle";
var NODE_BOSS = "boss";
var NODE_SHOP = "shop";
var NODE_REST = "rest";

// === Shop Items ===
var SHOP_CATALOG = [
    { name: "Health Potion", icon: "\uD83E\uDDEA", desc: "Restores 40 HP in battle", cost: 20, type: "potion", value: 40 },
    { name: "Great Potion",  icon: "\u2728",       desc: "Restores 80 HP in battle", cost: 45, type: "potion", value: 80 },
    { name: "Attack Charm",  icon: "\uD83D\uDD25", desc: "Permanently +2 ATK",       cost: 60, type: "buff",   stat: "attack", value: 2 },
    { name: "Shield Rune",   icon: "\uD83D\uDEE1\uFE0F", desc: "Permanently +2 DEF", cost: 60, type: "buff",  stat: "defense", value: 2 },
];

// === All Questions ===
// type: "mcq" = multiple choice, "typein" = type the answer
var QUESTIONS = [
    // --- Chapter 1: Village of Variables (Easy) ---
    {
        question: "What is the correct way to create a variable in Python?",
        type: "mcq",
        options: ["var x = 10", "x = 10", "int x = 10", "let x = 10"],
        answer: "x = 10",
        explanation: "Python uses simple assignment with <code>=</code>. No type declarations or keywords like var/let needed.",
    },
    {
        question: "What data type is <code>3.14</code> in Python?",
        type: "mcq",
        options: ["int", "str", "float", "double"],
        answer: "float",
        explanation: "Numbers with a decimal point are <code>float</code> (floating-point). Python doesn't have a <code>double</code> type.",
    },
    {
        question: "What does <code>type('hello')</code> return?",
        type: "mcq",
        options: ["<class 'str'>", "<class 'int'>", "<class 'char'>", "<class 'text'>"],
        answer: "<class 'str'>",
        explanation: "Text in quotes is a string (<code>str</code>). Python has no <code>char</code> or <code>text</code> type.",
    },
    {
        question: "What keyword is used to display output in Python?\n\nType the keyword:",
        type: "typein",
        answer: "print",
        accept: ["print"],
        explanation: "The <code>print()</code> function outputs text to the console.",
    },
    {
        question: "What is the result of <code>10 // 3</code> in Python?\n\nType the number:",
        type: "typein",
        answer: "3",
        accept: ["3"],
        explanation: "<code>//</code> is integer (floor) division. It divides and rounds down: 10 \u00f7 3 = 3.33... \u2192 3",
    },
    // --- Chapter 2: Forest of Flow (Medium) ---
    {
        question: "What keyword handles an alternative condition after <code>if</code>?",
        type: "mcq",
        options: ["else if", "elif", "elseif", "elsif"],
        answer: "elif",
        explanation: "Python uses <code>elif</code> (short for else if). Other languages use else if or elsif, but not Python.",
    },
    {
        question: "Which keyword immediately exits a loop?",
        type: "typein",
        answer: "break",
        accept: ["break"],
        explanation: "<code>break</code> exits the current loop entirely. <code>continue</code> skips to the next iteration.",
    },
    {
        question: "What does <code>list(range(5))</code> produce?",
        type: "mcq",
        options: ["[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4]", "[0, 1, 2, 3, 4, 5]", "[5]"],
        answer: "[0, 1, 2, 3, 4]",
        explanation: "<code>range(5)</code> generates 0 through 4 (5 numbers starting from 0, not including 5).",
    },
    {
        question: "What does this code print?\n\n<code>for i in range(3):\n    if i == 1:\n        continue\n    print(i)</code>",
        type: "mcq",
        options: ["0 1 2", "0 2", "1 2", "0 1"],
        answer: "0 2",
        explanation: "<code>continue</code> skips the rest of the loop body for that iteration. When i==1, it skips print, so only 0 and 2 print.",
    },
    {
        question: "What does <code>bool(0)</code> return?\n\nType True or False:",
        type: "typein",
        answer: "False",
        accept: ["false", "False"],
        explanation: "In Python, <code>0</code>, empty strings, empty lists, and <code>None</code> are all \"falsy\" \u2014 they evaluate to <code>False</code>.",
    },
    {
        question: "How many times does this loop run?\n\n<code>i = 0\nwhile i < 4:\n    i += 1</code>\n\nType the number:",
        type: "typein",
        answer: "4",
        accept: ["4"],
        explanation: "The loop runs with i = 0, 1, 2, 3. When i becomes 4, the condition <code>i < 4</code> is False and the loop stops. That's 4 iterations.",
    },
    // --- Chapter 3: Cavern of Collections (Medium-Hard) ---
    {
        question: "How do you add an item to the end of a list?",
        type: "mcq",
        options: ["list.add(item)", "list.append(item)", "list.push(item)", "list += item"],
        answer: "list.append(item)",
        explanation: "<code>append()</code> adds one item to the end. <code>push()</code> is JavaScript. <code>add()</code> is for sets.",
    },
    {
        question: "How do you access the value for key <code>'name'</code> in dict <code>d</code>?\n\nType the expression:",
        type: "typein",
        answer: "d['name']",
        accept: ["d['name']", "d[\"name\"]", "d.get('name')", "d.get(\"name\")"],
        explanation: "Use <code>d['name']</code> or <code>d.get('name')</code>. Don't confuse with dot notation (that's JavaScript).",
    },
    {
        question: "What is the output of <code>len([1, [2, 3], 4])</code>?\n\nType the number:",
        type: "typein",
        answer: "3",
        accept: ["3"],
        explanation: "The list has 3 elements: <code>1</code>, <code>[2, 3]</code> (a nested list counts as one element), and <code>4</code>.",
    },
    {
        question: "What does <code>'hello'[1:4]</code> return?",
        type: "mcq",
        options: ["'hell'", "'ell'", "'ello'", "'hel'"],
        answer: "'ell'",
        explanation: "String slicing [1:4] takes characters at index 1, 2, 3 (not 4). Index 1='e', 2='l', 3='l'.",
    },
    {
        question: "Which collection type is immutable (can't be changed)?",
        type: "mcq",
        options: ["list", "dict", "tuple", "set"],
        answer: "tuple",
        explanation: "Tuples are immutable \u2014 once created, you can't add, remove, or change their elements. Lists, dicts, and sets are mutable.",
    },
    {
        question: "What method removes AND returns the last item from a list?\n\nType the method name:",
        type: "typein",
        answer: "pop",
        accept: ["pop", ".pop()", "pop()"],
        explanation: "<code>list.pop()</code> removes the last item and returns it. <code>remove()</code> removes by value, not position.",
    },
    // --- Chapter 4: Tower of Functions (Hard) ---
    {
        question: "What keyword defines a function in Python?\n\nType the keyword:",
        type: "typein",
        answer: "def",
        accept: ["def"],
        explanation: "Python uses <code>def</code> followed by the function name and parentheses: <code>def my_func():</code>",
    },
    {
        question: "What does <code>(lambda x: x * 2)(5)</code> return?\n\nType the number:",
        type: "typein",
        answer: "10",
        accept: ["10"],
        explanation: "Lambda creates an anonymous function. This one takes x and returns x*2. With input 5: 5*2 = 10.",
    },
    {
        question: "What does a function return if it has no return statement?",
        type: "mcq",
        options: ["0", "''", "None", "False"],
        answer: "None",
        explanation: "Functions without an explicit <code>return</code> implicitly return <code>None</code>.",
    },
    {
        question: "What is the output?\n\n<code>def greet(name='World'):\n    return f'Hi {name}'\nprint(greet())</code>",
        type: "mcq",
        options: ["Hi", "Hi name", "Hi World", "Error"],
        answer: "Hi World",
        explanation: "The parameter has a default value <code>'World'</code>. Calling <code>greet()</code> without arguments uses the default.",
    },
    {
        question: "What does <code>*args</code> do in a function definition?",
        type: "mcq",
        options: [
            "Multiplies arguments together",
            "Accepts any number of positional arguments as a tuple",
            "Makes arguments required",
            "Unpacks a dictionary",
        ],
        answer: "Accepts any number of positional arguments as a tuple",
        explanation: "<code>*args</code> collects extra positional arguments into a tuple. <code>**kwargs</code> does the same for keyword arguments as a dict.",
    },
    // --- Chapter 5: Python's Lair (Hard) ---
    {
        question: "What is the output of <code>[x**2 for x in range(4)]</code>?",
        type: "mcq",
        options: ["[1, 4, 9, 16]", "[0, 1, 4, 9]", "[0, 2, 4, 6]", "[1, 2, 3, 4]"],
        answer: "[0, 1, 4, 9]",
        explanation: "List comprehension: range(4) gives 0,1,2,3. Squaring each: 0\u00b2=0, 1\u00b2=1, 2\u00b2=4, 3\u00b2=9.",
    },
    {
        question: "What keyword is used to handle exceptions in Python?\n\nType the two keywords separated by /:",
        type: "typein",
        answer: "try/except",
        accept: ["try/except", "try / except", "try except"],
        explanation: "Python uses <code>try</code> to wrap risky code and <code>except</code> to handle errors that occur.",
    },
    {
        question: "What does <code>'hello world'.split()</code> return?",
        type: "mcq",
        options: [
            "['hello world']",
            "['hello', 'world']",
            "['h','e','l','l','o',' ','w','o','r','l','d']",
            "('hello', 'world')",
        ],
        answer: "['hello', 'world']",
        explanation: "<code>split()</code> with no arguments splits on whitespace and returns a list of words.",
    },
    {
        question: "What is the output?\n\n<code>x = [1, 2, 3]\ny = x\ny.append(4)\nprint(len(x))</code>\n\nType the number:",
        type: "typein",
        answer: "4",
        accept: ["4"],
        explanation: "<code>y = x</code> doesn't copy the list \u2014 both variables point to the same list. Appending to y also changes x. This is a common Python gotcha!",
    },
    {
        question: "The Python King's final challenge!\n\nWhat does this print?\n\n<code>d = {'a': 1, 'b': 2}\nprint(list(d.keys()))</code>",
        type: "mcq",
        options: ["['a', 'b']", "[1, 2]", "[('a',1), ('b',2)]", "{'a', 'b'}"],
        answer: "['a', 'b']",
        explanation: "<code>d.keys()</code> returns the dictionary's keys. Wrapping in <code>list()</code> converts to a list: ['a', 'b'].",
    },
];

// === Map Structure ===
// Each node: { type, name, icon, chapter, questionIndex (for battles) }
var MAP_NODES = [
    // Chapter 1: Village of Variables
    { type: NODE_BATTLE, name: "Bug Goblin",     chapter: "Village of Variables",  qIdx: 0,  enemy: { name: "Bug Goblin",     sprite: "goblin", atk: 12 }, story: "A Bug Goblin attacks the village! Prove your Python knowledge to defeat it!" },
    { type: NODE_BATTLE, name: "Syntax Slime",   chapter: "Village of Variables",  qIdx: 1,  enemy: { name: "Syntax Slime",   sprite: "slime",  atk: 10 }, story: "A Syntax Slime oozes toward you, corrupting code as it goes!" },
    { type: NODE_SHOP,   name: "Village Shop",   chapter: "Village of Variables" },
    { type: NODE_BATTLE, name: "Type Troll",     chapter: "Village of Variables",  qIdx: 2,  enemy: { name: "Type Troll",     sprite: "troll",  atk: 15 }, story: "A massive Type Troll blocks the bridge. It demands proof of knowledge!" },
    { type: NODE_BATTLE, name: "Print Phantom",  chapter: "Village of Variables",  qIdx: 3,  enemy: { name: "Print Phantom",  sprite: "phantom",atk: 14 }, story: "A translucent Print Phantom appears, whispering output commands!" },
    { type: NODE_BOSS,   name: "Division Drake", chapter: "Village of Variables",  qIdx: 4,  enemy: { name: "Division Drake", sprite: "dragon", atk: 20 }, story: "The Division Drake guards the village exit! Only a true coder can pass!" },

    // Chapter 2: Forest of Flow
    { type: NODE_BATTLE, name: "Conditional Cobra", chapter: "Forest of Flow", qIdx: 5,  enemy: { name: "Conditional Cobra", sprite: "snake", atk: 18 }, story: "A Conditional Cobra slithers from the shadows, hissing if/else statements!" },
    { type: NODE_BATTLE, name: "Loop Wolf",         chapter: "Forest of Flow", qIdx: 6,  enemy: { name: "Loop Wolf",         sprite: "wolf",  atk: 20 }, story: "A Loop Wolf circles you endlessly. Break free with Python!" },
    { type: NODE_REST,   name: "Forest Campfire",   chapter: "Forest of Flow" },
    { type: NODE_BATTLE, name: "Range Wraith",      chapter: "Forest of Flow", qIdx: 7,  enemy: { name: "Range Wraith",      sprite: "wraith",atk: 22 }, story: "A Range Wraith materializes, guarding the path with number sequences!" },
    { type: NODE_BATTLE, name: "Continue Spider",   chapter: "Forest of Flow", qIdx: 8,  enemy: { name: "Continue Spider",   sprite: "spider",atk: 20 }, story: "A massive spider weaves webs of complex control flow!" },
    { type: NODE_SHOP,   name: "Forest Merchant",   chapter: "Forest of Flow" },
    { type: NODE_BATTLE, name: "Boolean Bat",       chapter: "Forest of Flow", qIdx: 9,  enemy: { name: "Boolean Bat",       sprite: "bat",   atk: 22 }, story: "A Boolean Bat dives at you from the darkness!" },
    { type: NODE_BOSS,   name: "While Wyrm",        chapter: "Forest of Flow", qIdx: 10, enemy: { name: "While Wyrm",        sprite: "dragon", atk: 28 }, story: "The While Wyrm coils around an ancient tree, looping endlessly. End its cycle!" },

    // Chapter 3: Cavern of Collections
    { type: NODE_BATTLE, name: "List Lizard",       chapter: "Cavern of Collections", qIdx: 11, enemy: { name: "List Lizard",       sprite: "lizard", atk: 24 }, story: "A List Lizard guards a treasure chest full of data!" },
    { type: NODE_BATTLE, name: "Dict Dragon",       chapter: "Cavern of Collections", qIdx: 12, enemy: { name: "Dict Dragon",       sprite: "dragon", atk: 26 }, story: "A Dictionary Dragon awakens, breathing key-value fire!" },
    { type: NODE_REST,   name: "Crystal Spring",    chapter: "Cavern of Collections" },
    { type: NODE_BATTLE, name: "Length Leviathan",   chapter: "Cavern of Collections", qIdx: 13, enemy: { name: "Length Leviathan",   sprite: "golem",  atk: 26 }, story: "A massive creature made of nested data structures rises from the depths!" },
    { type: NODE_BATTLE, name: "Slice Siren",       chapter: "Cavern of Collections", qIdx: 14, enemy: { name: "Slice Siren",       sprite: "siren",  atk: 24 }, story: "A Slice Siren sings songs of string manipulation!" },
    { type: NODE_SHOP,   name: "Cavern Trader",     chapter: "Cavern of Collections" },
    { type: NODE_BATTLE, name: "Tuple Titan",       chapter: "Cavern of Collections", qIdx: 15, enemy: { name: "Tuple Titan",       sprite: "golem",  atk: 28 }, story: "The Tuple Titan is immovable and unchangeable. Can you explain why?" },
    { type: NODE_BOSS,   name: "Pop Poltergeist",   chapter: "Cavern of Collections", qIdx: 16, enemy: { name: "Pop Poltergeist",   sprite: "phantom",atk: 32 }, story: "The Poltergeist removes items from existence! Show you understand how!" },

    // Chapter 4: Tower of Functions
    { type: NODE_BATTLE, name: "Def Demon",          chapter: "Tower of Functions", qIdx: 17, enemy: { name: "Def Demon",         sprite: "phantom",atk: 28 }, story: "A Def Demon blocks the stairway, demanding you define your power!" },
    { type: NODE_BATTLE, name: "Lambda Lich",        chapter: "Tower of Functions", qIdx: 18, enemy: { name: "Lambda Lich",       sprite: "lich",   atk: 30 }, story: "The Lambda Lich casts anonymous spells from the shadows!" },
    { type: NODE_REST,   name: "Tower Balcony",      chapter: "Tower of Functions" },
    { type: NODE_BATTLE, name: "Return Reaper",      chapter: "Tower of Functions", qIdx: 19, enemy: { name: "Return Reaper",     sprite: "reaper", atk: 30 }, story: "The Return Reaper harvests function outputs!" },
    { type: NODE_SHOP,   name: "Tower Armory",       chapter: "Tower of Functions" },
    { type: NODE_BATTLE, name: "Default Doppelganger",chapter: "Tower of Functions", qIdx: 20, enemy: { name: "Default Doppelganger",sprite: "shadow",atk: 32 }, story: "A shapeshifter mimics your code with default values!" },
    { type: NODE_BOSS,   name: "Args Archdemon",     chapter: "Tower of Functions", qIdx: 21, enemy: { name: "Args Archdemon",    sprite: "reaper", atk: 36 }, story: "The Archdemon accepts any number of arguments \u2014 and attacks!" },

    // Chapter 5: Python's Lair
    { type: NODE_BATTLE, name: "Comprehension Chimera",chapter: "The Python's Lair", qIdx: 22, enemy: { name: "Comprehension Chimera", sprite: "dragon",   atk: 34 }, story: "A beast made of pure list comprehension logic!" },
    { type: NODE_BATTLE, name: "Exception Elemental", chapter: "The Python's Lair", qIdx: 23, enemy: { name: "Exception Elemental",  sprite: "elemental",atk: 34 }, story: "An elemental of pure chaos \u2014 handle its exceptions or perish!" },
    { type: NODE_BATTLE, name: "Split Specter",       chapter: "The Python's Lair", qIdx: 24, enemy: { name: "Split Specter",        sprite: "wraith",   atk: 32 }, story: "A specter that tears strings apart!" },
    { type: NODE_BATTLE, name: "Reference Revenant",  chapter: "The Python's Lair", qIdx: 25, enemy: { name: "Reference Revenant",   sprite: "shadow",   atk: 36 }, story: "A revenant that shares your very soul \u2014 and your variables!" },
    { type: NODE_BOSS,   name: "The Python King",     chapter: "The Python's Lair", qIdx: 26, enemy: { name: "The Python King",      sprite: "boss",     atk: 40 }, story: "The Python King \u2014 an ancient serpent of pure code. This is the final test!" },
];

// === Loot Table (given after battles) ===
var LOOT_TABLE = [
    null, null, null, "Wooden Sword", null,
    "Leather Shield", null, null, null, null,
    null, "Speed Boots", null, "Crystal Ring", null,
    null, null, "Iron Armor", null, null,
    "Magic Staff", null, null, "Enchanted Cloak", null,
    null, "Dragon Scale", null, null, null,
    null, null, "Python Crown",
];

// === State ===
var player = null;
var selectedAvatar = 0;
var currentAttempt = 0;
var maxAttempts = 2;
var answering = false;

// === DOM ===
function $(id) { return document.getElementById(id); }

// === Save/Load ===
function saveGame() {
    try { localStorage.setItem("pq_save2", JSON.stringify(player)); } catch(e) {}
}
function loadGame() {
    try {
        var d = localStorage.getItem("pq_save2");
        return d ? JSON.parse(d) : null;
    } catch(e) { return null; }
}
function clearSave() {
    try { localStorage.removeItem("pq_save2"); } catch(e) {}
}

// === Screens ===
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(function(s) { s.classList.remove("active"); });
    $(id).classList.add("active");
}

// === Notifications ===
function notify(text, ms) {
    var el = $("notification");
    el.textContent = text;
    el.classList.remove("hidden");
    setTimeout(function() { el.classList.add("hidden"); }, ms || 2500);
}

// === Create Player ===
function createPlayer(name, avatarIdx) {
    var av = AVATARS[avatarIdx];
    return {
        name: name || "Hero",
        avatarIdx: avatarIdx,
        hp: 100 + av.hpBonus,
        maxHp: 100 + av.hpBonus,
        xp: 0,
        level: 1,
        gold: 20,
        attack: 8 + av.atkBonus,
        defense: 2 + av.defBonus,
        nodeIndex: 0,
        inventory: [],
        potions: [],
        defeatedNodes: [],
        totalCorrect: 0,
        totalWrong: 0,
    };
}

// ============================================================
// START SCREEN
// ============================================================

// Render avatar grid
function renderAvatarGrid() {
    var grid = $("avatar-grid");
    grid.innerHTML = "";
    AVATARS.forEach(function(av, i) {
        var card = document.createElement("div");
        card.className = "avatar-card" + (i === selectedAvatar ? " selected" : "");
        card.innerHTML =
            '<span class="avatar-emoji">' + av.emoji + '</span>' +
            '<div class="avatar-name">' + av.name + '</div>' +
            '<div class="avatar-stat">' + av.stat + '</div>';
        card.addEventListener("click", function() {
            selectedAvatar = i;
            renderAvatarGrid();
        });
        grid.appendChild(card);
    });
}

// Init start screen
renderAvatarGrid();

// Check saved game
(function() {
    var saved = loadGame();
    if (saved && saved.nodeIndex < MAP_NODES.length) {
        $("continue-save-btn").classList.remove("hidden");
    }
})();

$("start-btn").addEventListener("click", startNewGame);
$("player-name").addEventListener("keydown", function(e) {
    if (e.key === "Enter") startNewGame();
});

function startNewGame() {
    var name = $("player-name").value.trim() || "Hero";
    player = createPlayer(name, selectedAvatar);
    saveGame();
    openMap();
}

$("continue-save-btn").addEventListener("click", function() {
    var saved = loadGame();
    if (saved) {
        player = saved;
        if (player.nodeIndex >= MAP_NODES.length) {
            showVictory();
        } else {
            openMap();
        }
    }
});

// ============================================================
// WORLD MAP
// ============================================================

function openMap() {
    renderMap();
    showScreen("map-screen");
    // Scroll to current node
    setTimeout(function() {
        var avail = document.querySelector(".map-node.available");
        if (avail) avail.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
}

function updateMapHUD() {
    var av = AVATARS[player.avatarIdx];
    $("map-avatar-icon").textContent = av.emoji;
    $("map-name").textContent = player.name;
    $("map-level").textContent = "Lv. " + player.level;
    $("map-level").style.color = "var(--gold)";
    $("map-xp").textContent = "XP: " + player.xp;
    $("map-gold").textContent = "Gold: " + player.gold;

    var pct = Math.max(0, (player.hp / player.maxHp) * 100);
    $("map-hp-bar").style.width = pct + "%";
    $("map-hp-bar").className = "hp-bar" + (pct < 30 ? " low" : "");
    $("map-hp-text").textContent = player.hp + "/" + player.maxHp;
}

function renderMap() {
    updateMapHUD();
    var container = $("map-nodes");
    container.innerHTML = "";

    var lastChapter = "";

    MAP_NODES.forEach(function(node, idx) {
        // Chapter label
        if (node.chapter && node.chapter !== lastChapter) {
            lastChapter = node.chapter;
            var label = document.createElement("div");
            label.className = "map-chapter-label";
            label.textContent = node.chapter;
            container.appendChild(label);
        }

        // Connector
        if (idx > 0 && MAP_NODES[idx - 1].chapter === node.chapter) {
            var conn = document.createElement("div");
            conn.className = "map-connector" + (idx <= player.nodeIndex ? " completed" : "");
            container.appendChild(conn);
        }

        // Node
        var el = document.createElement("div");
        el.className = "map-node";

        var isCompleted = player.defeatedNodes.indexOf(idx) !== -1;
        var isAvailable = idx === player.nodeIndex;
        var isLocked = idx > player.nodeIndex;

        if (isCompleted) el.classList.add("completed");
        else if (isAvailable) el.classList.add("available");
        else if (isLocked) el.classList.add("locked");

        // Icon
        var iconText = "";
        if (node.type === NODE_BATTLE) iconText = ENEMY_EMOJIS[node.enemy.sprite] || "\uD83D\uDC7E";
        else if (node.type === NODE_BOSS) iconText = ENEMY_EMOJIS[node.enemy.sprite] || "\uD83D\uDC80";
        else if (node.type === NODE_SHOP) iconText = "\uD83D\uDED2";
        else if (node.type === NODE_REST) iconText = "\uD83C\uDF43";

        var typeLabel = node.type === NODE_BOSS ? "BOSS" : node.type.charAt(0).toUpperCase() + node.type.slice(1);

        el.innerHTML =
            '<div class="node-icon">' + iconText + '</div>' +
            '<div class="node-info">' +
                '<div class="node-name">' + node.name + '</div>' +
                '<div class="node-type">' + typeLabel + '</div>' +
            '</div>' +
            (isCompleted ? '<div class="node-check">\u2705</div>' : '') +
            (isAvailable ? '<div class="player-marker">' + AVATARS[player.avatarIdx].emoji + '</div>' : '');

        if (isAvailable) {
            el.addEventListener("click", function() { enterNode(idx); });
        }

        container.appendChild(el);
    });
}

function enterNode(idx) {
    var node = MAP_NODES[idx];
    if (node.type === NODE_BATTLE || node.type === NODE_BOSS) {
        startBattle(idx);
    } else if (node.type === NODE_SHOP) {
        openShop(idx);
    } else if (node.type === NODE_REST) {
        openRest(idx);
    }
}

// ============================================================
// BATTLE SYSTEM
// ============================================================

var currentBattleNode = null;

function startBattle(nodeIdx) {
    currentBattleNode = nodeIdx;
    var node = MAP_NODES[nodeIdx];
    var question = QUESTIONS[node.qIdx];
    currentAttempt = 0;
    answering = false;

    // Update HUD
    var av = AVATARS[player.avatarIdx];
    $("battle-player-sprite").textContent = av.emoji;
    $("battle-name").textContent = player.name;
    $("battle-level").textContent = "Lv. " + player.level;
    $("battle-level").style.color = "var(--gold)";
    updateBattleHP();

    // Enemy
    $("enemy-sprite-battle").textContent = ENEMY_EMOJIS[node.enemy.sprite] || "\uD83D\uDC7E";
    $("battle-enemy-name").textContent = node.enemy.name;
    $("battle-story").textContent = node.story;

    // Question
    $("question-text").innerHTML = formatQuestion(question.question);
    $("attempt-indicator").textContent = "Attempt 1 of " + maxAttempts;

    // Options
    var optContainer = $("options-container");
    var typeContainer = $("typein-container");
    optContainer.innerHTML = "";

    if (question.type === "mcq") {
        typeContainer.classList.add("hidden");
        question.options.forEach(function(opt) {
            var btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = opt;
            btn.addEventListener("click", function() { submitMCQ(opt, btn); });
            optContainer.appendChild(btn);
        });
    } else {
        typeContainer.classList.remove("hidden");
        $("typein-input").value = "";
        $("typein-input").className = "";
        $("typein-input").disabled = false;
        $("typein-submit").disabled = false;
        setTimeout(function() { $("typein-input").focus(); }, 300);
    }

    // Show challenge, hide result
    $("challenge-area").classList.remove("hidden");
    $("result-area").classList.add("hidden");
    showScreen("battle-screen");
}

function formatQuestion(text) {
    // Convert backtick code blocks and newlines
    return text
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

function updateBattleHP() {
    var pct = Math.max(0, (player.hp / player.maxHp) * 100);
    $("battle-hp-bar").style.width = pct + "%";
    $("battle-hp-bar").className = "hp-bar" + (pct < 30 ? " low" : "");
    $("battle-hp-text").textContent = player.hp + "/" + player.maxHp;
}

function submitMCQ(answer, btnEl) {
    if (answering) return;
    answering = true;

    var node = MAP_NODES[currentBattleNode];
    var question = QUESTIONS[node.qIdx];
    var isCorrect = answer === question.answer;

    if (isCorrect) {
        btnEl.classList.add("correct");
        disableAllOptions();
        player.totalCorrect++;
        setTimeout(function() { showResult(true, node, question); }, 600);
    } else {
        currentAttempt++;
        btnEl.classList.add("wrong");
        btnEl.disabled = true;
        player.totalWrong++;

        // Apply damage immediately on wrong answer
        applyDamage(node);

        if (currentAttempt >= maxAttempts) {
            // Show correct answer and result
            disableAllOptions();
            highlightCorrectOption(question.answer);
            setTimeout(function() { showResult(false, node, question); }, 800);
        } else {
            // Let them try again
            $("attempt-indicator").textContent = "Attempt " + (currentAttempt + 1) + " of " + maxAttempts + " \u2014 Try again!";
            $("attempt-indicator").style.color = "var(--accent)";
            answering = false;
        }
    }
}

// Type-in answer handler
$("typein-submit").addEventListener("click", submitTypein);
$("typein-input").addEventListener("keydown", function(e) {
    if (e.key === "Enter") submitTypein();
});

function submitTypein() {
    if (answering) return;
    var input = $("typein-input");
    var val = input.value.trim();
    if (!val) return;

    answering = true;
    var node = MAP_NODES[currentBattleNode];
    var question = QUESTIONS[node.qIdx];

    var isCorrect = false;
    var accepts = question.accept || [question.answer];
    for (var i = 0; i < accepts.length; i++) {
        if (val.toLowerCase() === accepts[i].toLowerCase()) {
            isCorrect = true;
            break;
        }
    }

    if (isCorrect) {
        input.classList.add("correct-input");
        input.disabled = true;
        $("typein-submit").disabled = true;
        player.totalCorrect++;
        setTimeout(function() { showResult(true, node, question); }, 600);
    } else {
        currentAttempt++;
        input.classList.add("wrong-input");
        player.totalWrong++;

        // Apply damage
        applyDamage(node);

        if (currentAttempt >= maxAttempts) {
            input.disabled = true;
            $("typein-submit").disabled = true;
            setTimeout(function() { showResult(false, node, question); }, 600);
        } else {
            $("attempt-indicator").textContent = "Attempt " + (currentAttempt + 1) + " of " + maxAttempts + " \u2014 Try again!";
            $("attempt-indicator").style.color = "var(--accent)";
            setTimeout(function() {
                input.classList.remove("wrong-input");
                input.value = "";
                input.focus();
                answering = false;
            }, 500);
        }
    }
}

function applyDamage(node) {
    var damage = Math.max(8, node.enemy.atk - player.defense);
    player.hp = Math.max(0, player.hp - damage);
    updateBattleHP();

    // Flash effect
    var hud = $("battle-hud");
    hud.classList.add("damage-flash");
    setTimeout(function() { hud.classList.remove("damage-flash"); }, 400);

    if (player.hp <= 0) {
        notify("You were knocked out! Revived at half HP.", 3000);
        player.hp = Math.floor(player.maxHp / 2);
        updateBattleHP();
    }
}

function disableAllOptions() {
    document.querySelectorAll(".option-btn").forEach(function(b) { b.disabled = true; });
}

function highlightCorrectOption(answer) {
    document.querySelectorAll(".option-btn").forEach(function(b) {
        if (b.textContent === answer) b.classList.add("correct");
    });
}

function showResult(isCorrect, node, question) {
    $("challenge-area").classList.add("hidden");
    $("result-area").classList.remove("hidden");

    var iconEl = $("result-icon");
    var msgEl = $("result-message");
    var explEl = $("result-explanation");
    var rewEl = $("result-rewards");

    explEl.innerHTML = question.explanation;
    explEl.classList.remove("hidden");

    if (isCorrect) {
        // Calculate rewards
        var xpReward = 30 + (node.qIdx * 4);
        var goldReward = 15 + (node.qIdx * 3);
        if (node.type === NODE_BOSS) {
            xpReward = Math.floor(xpReward * 1.5);
            goldReward = Math.floor(goldReward * 1.5);
        }
        // Bonus for first try
        if (currentAttempt === 0) {
            xpReward = Math.floor(xpReward * 1.3);
            goldReward = Math.floor(goldReward * 1.2);
        }

        player.xp += xpReward;
        player.gold += goldReward;
        player.defeatedNodes.push(currentBattleNode);
        player.nodeIndex++;

        // Loot
        var loot = LOOT_TABLE[currentBattleNode] || null;
        if (loot) player.inventory.push(loot);

        // Level up check
        var leveledUp = false;
        var needed = player.level * 80;
        while (player.xp >= needed) {
            player.level++;
            player.maxHp += 15;
            player.hp = Math.min(player.hp + 15, player.maxHp);
            player.attack += 2;
            player.defense += 1;
            leveledUp = true;
            needed = player.level * 80;
        }

        iconEl.textContent = "\u2694\uFE0F";
        msgEl.textContent = node.enemy.name + " defeated!";
        msgEl.style.color = "var(--green)";

        var rewardLines = "+" + xpReward + " XP, +" + goldReward + " Gold";
        if (currentAttempt === 0) rewardLines += " (Perfect!)";
        if (loot) rewardLines += "\nNew item: " + loot + "!";
        if (leveledUp) rewardLines += "\n\u2B50 LEVEL UP! Now Level " + player.level + "!";
        rewEl.textContent = rewardLines;
        rewEl.style.color = "var(--gold)";
    } else {
        // Wrong - they still advance but with less reward
        var smallXP = 10 + node.qIdx;
        player.xp += smallXP;
        player.defeatedNodes.push(currentBattleNode);
        player.nodeIndex++;

        iconEl.textContent = "\uD83D\uDCA5";
        msgEl.textContent = "You barely survived!";
        msgEl.style.color = "var(--accent)";
        rewEl.textContent = "+" + smallXP + " XP (reduced)\nCorrect answer: " + question.answer;
        rewEl.style.color = "var(--text-dim)";
    }

    updateBattleHP();
    saveGame();
}

$("continue-btn").addEventListener("click", function() {
    if (player.nodeIndex >= MAP_NODES.length) {
        showVictory();
    } else {
        openMap();
    }
});

// ============================================================
// SHOP
// ============================================================

var currentShopNode = null;

function openShop(nodeIdx) {
    currentShopNode = nodeIdx;
    $("shop-gold").textContent = "Gold: " + player.gold;

    var container = $("shop-items");
    container.innerHTML = "";

    SHOP_CATALOG.forEach(function(item, i) {
        var el = document.createElement("div");
        el.className = "shop-item";

        var canAfford = player.gold >= item.cost;

        el.innerHTML =
            '<div class="shop-item-icon">' + item.icon + '</div>' +
            '<div class="shop-item-info">' +
                '<div class="shop-item-name">' + item.name + '</div>' +
                '<div class="shop-item-desc">' + item.desc + '</div>' +
            '</div>';

        var btn = document.createElement("button");
        btn.className = "btn btn-primary btn-small";
        btn.textContent = item.cost + "g";
        btn.disabled = !canAfford;
        btn.addEventListener("click", function() { buyItem(i); });
        el.appendChild(btn);
        container.appendChild(el);
    });

    showScreen("shop-screen");
}

function buyItem(catalogIdx) {
    var item = SHOP_CATALOG[catalogIdx];
    if (player.gold < item.cost) return;

    player.gold -= item.cost;

    if (item.type === "potion") {
        player.potions.push({ name: item.name, icon: item.icon, value: item.value });
        notify("Bought " + item.name + "!");
    } else if (item.type === "buff") {
        player[item.stat] += item.value;
        if (item.stat === "attack") {
            notify("+2 ATK! Now: " + player.attack);
        } else {
            notify("+2 DEF! Now: " + player.defense);
        }
    }

    saveGame();
    openShop(currentShopNode); // Re-render
}

$("shop-leave").addEventListener("click", function() {
    player.defeatedNodes.push(currentShopNode);
    player.nodeIndex++;
    saveGame();
    openMap();
});

// ============================================================
// REST
// ============================================================

function openRest(nodeIdx) {
    var healAmount = Math.floor(player.maxHp * 0.6);
    var before = player.hp;
    player.hp = Math.min(player.maxHp, player.hp + healAmount);
    var healed = player.hp - before;

    $("rest-hp-info").textContent = "Restored " + healed + " HP! (" + player.hp + "/" + player.maxHp + ")";

    player.defeatedNodes.push(nodeIdx);
    player.nodeIndex++;
    saveGame();

    showScreen("rest-screen");
}

$("rest-continue").addEventListener("click", function() {
    openMap();
});

// ============================================================
// INVENTORY
// ============================================================

function openInventory() {
    var listEl = $("inventory-list");
    var potEl = $("inventory-potions");

    // Equipment
    if (player.inventory.length === 0) {
        listEl.innerHTML = '<div class="inv-section-title">Equipment</div><div class="inv-item" style="color:var(--text-dim)">No items yet</div>';
    } else {
        listEl.innerHTML = '<div class="inv-section-title">Equipment</div>' +
            player.inventory.map(function(item) {
                return '<div class="inv-item">\uD83C\uDF92 ' + item + '</div>';
            }).join("");
    }

    // Potions
    if (player.potions.length === 0) {
        potEl.innerHTML = '<div class="inv-section-title">Potions</div><div class="inv-item" style="color:var(--text-dim)">No potions</div>';
    } else {
        potEl.innerHTML = '<div class="inv-section-title">Potions</div>';
        player.potions.forEach(function(pot, i) {
            var div = document.createElement("div");
            div.className = "inv-item";
            div.innerHTML = pot.icon + ' ' + pot.name + ' <span style="color:var(--green)">+' + pot.value + ' HP</span>';

            var btn = document.createElement("button");
            btn.className = "btn btn-primary btn-small";
            btn.textContent = "Use";
            btn.style.marginLeft = "auto";
            btn.addEventListener("click", function() { usePotion(i); });
            div.appendChild(btn);
            potEl.appendChild(div);
        });
    }

    $("inventory-modal").classList.remove("hidden");
}

function usePotion(idx) {
    var pot = player.potions[idx];
    var before = player.hp;
    player.hp = Math.min(player.maxHp, player.hp + pot.value);
    var healed = player.hp - before;

    player.potions.splice(idx, 1);
    saveGame();

    notify("Healed " + healed + " HP!");

    // Update whichever HUD is visible
    updateMapHUD();
    updateBattleHP();
    openInventory(); // Re-render
}

$("map-inv-btn").addEventListener("click", openInventory);

$("close-inventory").addEventListener("click", function() {
    $("inventory-modal").classList.add("hidden");
});
$("inventory-modal").addEventListener("click", function(e) {
    if (e.target === $("inventory-modal")) {
        $("inventory-modal").classList.add("hidden");
    }
});

// ============================================================
// VICTORY
// ============================================================

function showVictory() {
    showScreen("victory-screen");
    var accuracy = player.totalCorrect + player.totalWrong > 0
        ? Math.round((player.totalCorrect / (player.totalCorrect + player.totalWrong)) * 100)
        : 0;

    $("final-stats").innerHTML =
        "<strong>" + player.name + " the " + AVATARS[player.avatarIdx].name + "</strong><br>" +
        "Level: " + player.level + "<br>" +
        "Total XP: " + player.xp + "<br>" +
        "Gold: " + player.gold + "<br>" +
        "Accuracy: " + accuracy + "% (" + player.totalCorrect + "/" + (player.totalCorrect + player.totalWrong) + ")<br>" +
        "Items: " + (player.inventory.length > 0 ? player.inventory.join(", ") : "None");
    clearSave();
}

$("replay-btn").addEventListener("click", function() {
    clearSave();
    showScreen("start-screen");
    $("player-name").value = "";
    $("continue-save-btn").classList.add("hidden");
    selectedAvatar = 0;
    renderAvatarGrid();
});
