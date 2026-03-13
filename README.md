# Python Learning Game

An interactive terminal-based game to learn Python through quizzes and coding challenges.

## Features

- **Quiz Mode** — Multiple-choice questions across 5 topics: Basics, Data Types, Control Flow, Functions, and Lists & Loops
- **Coding Challenges** — Write real Python code to solve problems (Easy, Medium, Hard)
- **Progress Tracking** — Score, streaks, levels, and persistent save data
- **Streak Bonuses** — Earn bonus points for consecutive correct answers

## Getting Started

```bash
python3 main.py
```

No external dependencies required — runs on Python 3.6+.

## How to Play

1. **Quiz Mode** — Pick a topic or try a random mix. Answer multiple-choice questions to earn points.
2. **Coding Challenges** — Read the problem, write a `solution()` function, and submit. Your code is tested against multiple test cases.
3. **View Progress** — Check your score, streak, level, and completed challenges.

## Project Structure

```
main.py              # Entry point
game/
  menu.py            # Main menu navigation
  quiz.py            # Quiz mode engine
  questions.py       # Question bank (25 questions)
  challenges.py      # Coding challenge system (8 challenges)
  progress.py        # Score tracking and persistence
  data/
    progress.json    # Auto-saved progress (created at runtime)
```
