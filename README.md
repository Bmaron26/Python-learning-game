# Python Quest - Learn Python RPG

A browser-based RPG adventure game that teaches Python through combat encounters. Play on your phone or desktop!

## Features

- **RPG Adventure** — Battle enemies across 5 chapters with Python knowledge as your weapon
- **13 Quests** — Fight goblins, dragons, and a final boss with increasingly difficult Python questions
- **Character Progression** — Level up, earn XP and gold, collect items
- **Mobile-Friendly** — Responsive design that works great on phones
- **Terminal Mode** — Also includes a classic terminal quiz/challenge mode

## Quick Start (Web RPG)

```bash
pip install -r requirements.txt
python3 app.py
```

Then open **http://localhost:5000** in your browser (works on phone too!).

## Terminal Mode

```bash
python3 main.py
```

No dependencies needed for terminal mode.

## Game Overview

### Chapters
1. **The Village of Variables** — Learn Python basics
2. **The Forest of Flow** — Master control flow (if/elif, loops, range)
3. **The Cavern of Collections** — Lists, dicts, and tuples
4. **The Tower of Functions** — Functions, lambdas, and return values
5. **The Python's Lair** — Face the final boss!

### Combat
Answer Python questions correctly to defeat enemies and earn rewards. Wrong answers mean the enemy attacks and you lose HP. Rest at the inn to heal (costs gold).

## Project Structure

```
app.py               # Flask web server + RPG game engine
main.py              # Terminal mode entry point
requirements.txt     # Python dependencies (Flask)
templates/
  index.html         # Game UI
static/
  style.css          # Mobile-friendly dark theme
  game.js            # Game frontend logic
game/                # Terminal mode modules
```
