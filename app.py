#!/usr/bin/env python3
"""Python Learning RPG — A browser-based adventure game to learn Python."""

from flask import Flask, render_template, request, jsonify, session
import json
import os
import secrets

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", secrets.token_hex(32))


def default_player():
    return {
        "name": "Hero",
        "hp": 100,
        "max_hp": 100,
        "xp": 0,
        "level": 1,
        "gold": 0,
        "attack": 10,
        "defense": 5,
        "quest_index": 0,
        "inventory": [],
        "defeated_enemies": [],
    }


def get_player():
    if "player" not in session:
        session["player"] = default_player()
    return session["player"]


def save_player(player):
    session["player"] = player
    session.modified = True


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/state")
def get_state():
    player = get_player()
    quest = get_current_quest(player)
    return jsonify({"player": player, "quest": quest})


@app.route("/api/new-game", methods=["POST"])
def new_game():
    data = request.get_json() or {}
    player = default_player()
    player["name"] = data.get("name", "Hero")[:20]
    save_player(player)
    quest = get_current_quest(player)
    return jsonify({"player": player, "quest": quest})


@app.route("/api/answer", methods=["POST"])
def answer():
    data = request.get_json()
    player = get_player()

    idx = player["quest_index"]
    if idx >= len(QUESTS):
        return jsonify({"error": "No active quest", "player": player, "quest": None})

    full_quest = QUESTS[idx]
    user_answer = data.get("answer", "").strip()
    correct_answer = full_quest["challenge"]["answer"]

    is_correct = user_answer == str(correct_answer)

    result = {}
    if is_correct:
        # Victory rewards
        xp_gain = full_quest["xp_reward"]
        gold_gain = full_quest["gold_reward"]
        player["xp"] += xp_gain
        player["gold"] += gold_gain
        player["defeated_enemies"].append(full_quest["enemy"]["name"])

        # Level up check
        xp_needed = player["level"] * 100
        leveled_up = False
        while player["xp"] >= xp_needed:
            player["level"] += 1
            player["max_hp"] += 20
            player["hp"] = player["max_hp"]
            player["attack"] += 5
            player["defense"] += 3
            leveled_up = True
            xp_needed = player["level"] * 100

        # Inventory reward
        if full_quest.get("reward_item"):
            player["inventory"].append(full_quest["reward_item"])

        player["quest_index"] += 1
        result = {
            "correct": True,
            "message": f"You defeated {full_quest['enemy']['name']}!",
            "xp_gain": xp_gain,
            "gold_gain": gold_gain,
            "leveled_up": leveled_up,
            "explanation": full_quest["challenge"]["explanation"],
        }
    else:
        # Take damage
        damage = max(5, full_quest["enemy"]["attack"] - player["defense"])
        player["hp"] = max(0, player["hp"] - damage)

        result = {
            "correct": False,
            "message": f"{full_quest['enemy']['name']} attacks! You take {damage} damage.",
            "damage": damage,
            "explanation": full_quest["challenge"]["explanation"],
            "correct_answer": correct_answer,
        }

        if player["hp"] <= 0:
            player["hp"] = player["max_hp"]
            result["message"] += " You were knocked out and revived at camp."

    save_player(player)
    next_quest = get_current_quest(player)
    result["player"] = player
    result["quest"] = next_quest
    return jsonify(result)


@app.route("/api/rest", methods=["POST"])
def rest():
    player = get_player()
    cost = 10
    if player["gold"] >= cost:
        player["gold"] -= cost
        player["hp"] = player["max_hp"]
        save_player(player)
        return jsonify({"player": player, "message": "You rest at the inn and restore full HP.", "success": True})
    return jsonify({"player": player, "message": "Not enough gold! You need 10 gold to rest.", "success": False})


QUESTS = [
    # --- Chapter 1: The Village of Variables ---
    {
        "chapter": "The Village of Variables",
        "story": "You arrive at a small village under attack by a Bug Goblin. The village elder says only someone who understands Python basics can defeat it!",
        "enemy": {"name": "Bug Goblin", "sprite": "goblin", "attack": 8},
        "challenge": {
            "type": "multiple_choice",
            "question": "The goblin casts a spell! Quick — what is the correct way to create a variable in Python?",
            "options": ["var x = 10", "x = 10", "int x = 10", "let x = 10"],
            "answer": "x = 10",
            "explanation": "Python uses simple assignment with =. No type declarations or keywords needed.",
        },
        "xp_reward": 30,
        "gold_reward": 15,
        "reward_item": "Wooden Sword",
    },
    {
        "chapter": "The Village of Variables",
        "story": "Another creature emerges — a Syntax Slime! It speaks in broken code.",
        "enemy": {"name": "Syntax Slime", "sprite": "slime", "attack": 6},
        "challenge": {
            "type": "multiple_choice",
            "question": "The slime hurls bad code at you! Which data type is 3.14?",
            "options": ["int", "str", "float", "bool"],
            "answer": "float",
            "explanation": "3.14 has a decimal point, making it a float (floating-point number).",
        },
        "xp_reward": 30,
        "gold_reward": 10,
        "reward_item": None,
    },
    {
        "chapter": "The Village of Variables",
        "story": "A Type Troll blocks the bridge out of the village. It demands you prove your knowledge!",
        "enemy": {"name": "Type Troll", "sprite": "troll", "attack": 12},
        "challenge": {
            "type": "multiple_choice",
            "question": "The troll roars: What does type('hello') return?",
            "options": ["<class 'str'>", "<class 'int'>", "<class 'char'>", "<class 'text'>"],
            "answer": "<class 'str'>",
            "explanation": "Text in quotes is a string (str) in Python.",
        },
        "xp_reward": 40,
        "gold_reward": 20,
        "reward_item": "Leather Shield",
    },
    # --- Chapter 2: The Forest of Flow ---
    {
        "chapter": "The Forest of Flow",
        "story": "You enter a dark forest. A Conditional Cobra slithers toward you, hissing if/else statements!",
        "enemy": {"name": "Conditional Cobra", "sprite": "snake", "attack": 14},
        "challenge": {
            "type": "multiple_choice",
            "question": "The cobra strikes! What keyword handles an alternative condition in Python?",
            "options": ["else if", "elif", "elseif", "elsif"],
            "answer": "elif",
            "explanation": "Python uses 'elif' (short for else if) for additional conditions.",
        },
        "xp_reward": 40,
        "gold_reward": 20,
        "reward_item": None,
    },
    {
        "chapter": "The Forest of Flow",
        "story": "A Loop Wolf circles you endlessly. You must break free with Python knowledge!",
        "enemy": {"name": "Loop Wolf", "sprite": "wolf", "attack": 16},
        "challenge": {
            "type": "multiple_choice",
            "question": "The wolf traps you in an infinite loop! Which keyword exits a loop?",
            "options": ["stop", "exit", "break", "end"],
            "answer": "break",
            "explanation": "'break' immediately exits the current loop.",
        },
        "xp_reward": 45,
        "gold_reward": 25,
        "reward_item": "Speed Boots",
    },
    {
        "chapter": "The Forest of Flow",
        "story": "Deep in the forest, a Range Wraith appears! It guards the path with number sequences.",
        "enemy": {"name": "Range Wraith", "sprite": "wraith", "attack": 18},
        "challenge": {
            "type": "multiple_choice",
            "question": "The wraith asks: What does list(range(3)) produce?",
            "options": ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "[3]"],
            "answer": "[0, 1, 2]",
            "explanation": "range(3) generates numbers 0, 1, 2 (starts at 0, stops before 3).",
        },
        "xp_reward": 50,
        "gold_reward": 25,
        "reward_item": None,
    },
    # --- Chapter 3: The Cavern of Collections ---
    {
        "chapter": "The Cavern of Collections",
        "story": "You descend into a crystal cavern. A List Lizard guards a treasure chest of data!",
        "enemy": {"name": "List Lizard", "sprite": "lizard", "attack": 18},
        "challenge": {
            "type": "multiple_choice",
            "question": "The lizard challenges you: How do you add an item to the end of a list?",
            "options": ["list.add(item)", "list.append(item)", "list.push(item)", "list.insert(item)"],
            "answer": "list.append(item)",
            "explanation": "append() adds a single item to the end of a list.",
        },
        "xp_reward": 50,
        "gold_reward": 30,
        "reward_item": "Crystal Ring",
    },
    {
        "chapter": "The Cavern of Collections",
        "story": "A Dictionary Dragon awakens! It breathes key-value fire at you!",
        "enemy": {"name": "Dictionary Dragon", "sprite": "dragon", "attack": 22},
        "challenge": {
            "type": "multiple_choice",
            "question": "The dragon demands: How do you access a value in dict d with key 'name'?",
            "options": ["d.name", "d['name']", "d(name)", "d.get['name']"],
            "answer": "d['name']",
            "explanation": "Use square brackets with the key: d['name'] to access dictionary values.",
        },
        "xp_reward": 55,
        "gold_reward": 30,
        "reward_item": None,
    },
    {
        "chapter": "The Cavern of Collections",
        "story": "The cavern shakes! A Tuple Titan rises from the ground, immovable and unchangeable!",
        "enemy": {"name": "Tuple Titan", "sprite": "golem", "attack": 24},
        "challenge": {
            "type": "multiple_choice",
            "question": "The titan asks: Why would you use a tuple instead of a list?",
            "options": [
                "Tuples are faster and immutable",
                "Tuples can hold more items",
                "Tuples support more methods",
                "Tuples use less syntax",
            ],
            "answer": "Tuples are faster and immutable",
            "explanation": "Tuples are immutable (can't be changed) and slightly faster than lists. Use them for fixed data.",
        },
        "xp_reward": 55,
        "gold_reward": 35,
        "reward_item": "Iron Armor",
    },
    # --- Chapter 4: The Tower of Functions ---
    {
        "chapter": "The Tower of Functions",
        "story": "You climb a wizard's tower. A Function Phantom materializes and challenges your knowledge!",
        "enemy": {"name": "Function Phantom", "sprite": "phantom", "attack": 22},
        "challenge": {
            "type": "multiple_choice",
            "question": "The phantom whispers: What keyword defines a function in Python?",
            "options": ["function", "func", "def", "define"],
            "answer": "def",
            "explanation": "Python uses 'def' followed by the function name and parentheses.",
        },
        "xp_reward": 55,
        "gold_reward": 30,
        "reward_item": None,
    },
    {
        "chapter": "The Tower of Functions",
        "story": "Higher in the tower, a Lambda Lich floats before you, casting anonymous spells!",
        "enemy": {"name": "Lambda Lich", "sprite": "lich", "attack": 26},
        "challenge": {
            "type": "multiple_choice",
            "question": "The lich casts a lambda! What does (lambda x: x * 2)(5) return?",
            "options": ["'xx'", "25", "10", "Error"],
            "answer": "10",
            "explanation": "The lambda takes x and returns x * 2. With input 5, it returns 10.",
        },
        "xp_reward": 60,
        "gold_reward": 35,
        "reward_item": "Magic Staff",
    },
    {
        "chapter": "The Tower of Functions",
        "story": "At the top of the tower, the Return Reaper awaits — the final guardian!",
        "enemy": {"name": "Return Reaper", "sprite": "reaper", "attack": 28},
        "challenge": {
            "type": "multiple_choice",
            "question": "The reaper asks: What does a function return if it has no return statement?",
            "options": ["0", "''", "None", "False"],
            "answer": "None",
            "explanation": "Functions without a return statement implicitly return None.",
        },
        "xp_reward": 65,
        "gold_reward": 40,
        "reward_item": "Enchanted Cloak",
    },
    # --- Chapter 5: The Final Boss ---
    {
        "chapter": "The Python's Lair",
        "story": "You enter the final chamber. The Python King — an ancient serpent of pure code — towers before you. Defeat it to prove you are a true Pythonista!",
        "enemy": {"name": "The Python King", "sprite": "boss", "attack": 35},
        "challenge": {
            "type": "multiple_choice",
            "question": "The Python King's final test: What is the output of [x**2 for x in range(4)]?",
            "options": ["[1, 4, 9, 16]", "[0, 1, 4, 9]", "[0, 2, 4, 6]", "[1, 2, 3, 4]"],
            "answer": "[0, 1, 4, 9]",
            "explanation": "List comprehension: range(4) gives 0,1,2,3. Squaring each: 0,1,4,9.",
        },
        "xp_reward": 100,
        "gold_reward": 100,
        "reward_item": "Python Crown",
    },
]


def get_current_quest(player):
    idx = player["quest_index"]
    if idx >= len(QUESTS):
        return None
    quest = QUESTS[idx]
    return {
        "chapter": quest["chapter"],
        "story": quest["story"],
        "enemy": quest["enemy"],
        "challenge": {
            "type": quest["challenge"]["type"],
            "question": quest["challenge"]["question"],
            "options": quest["challenge"].get("options"),
            "explanation": quest["challenge"]["explanation"],
        },
        "xp_reward": quest["xp_reward"],
        "gold_reward": quest["gold_reward"],
        "reward_item": quest.get("reward_item"),
        "quest_number": idx + 1,
        "total_quests": len(QUESTS),
    }


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
