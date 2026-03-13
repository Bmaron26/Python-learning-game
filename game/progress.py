"""Progress tracking and scoring system."""

import json
import os

SAVE_FILE = os.path.join(os.path.dirname(__file__), "data", "progress.json")


class Progress:
    def __init__(self):
        self.score = 0
        self.streak = 0
        self.best_streak = 0
        self.quizzes_completed = 0
        self.challenges_completed = 0
        self.topics_mastered = set()
        self._load()

    def _load(self):
        if os.path.exists(SAVE_FILE):
            try:
                with open(SAVE_FILE) as f:
                    data = json.load(f)
                self.score = data.get("score", 0)
                self.best_streak = data.get("best_streak", 0)
                self.quizzes_completed = data.get("quizzes_completed", 0)
                self.challenges_completed = data.get("challenges_completed", 0)
                self.topics_mastered = set(data.get("topics_mastered", []))
            except (json.JSONDecodeError, IOError):
                pass

    def save(self):
        data = {
            "score": self.score,
            "best_streak": self.best_streak,
            "quizzes_completed": self.quizzes_completed,
            "challenges_completed": self.challenges_completed,
            "topics_mastered": list(self.topics_mastered),
        }
        os.makedirs(os.path.dirname(SAVE_FILE), exist_ok=True)
        with open(SAVE_FILE, "w") as f:
            json.dump(data, f, indent=2)

    def record_correct(self, points=10, topic=None):
        self.score += points
        self.streak += 1
        if self.streak > self.best_streak:
            self.best_streak = self.streak
        if topic:
            self.topics_mastered.add(topic)
        self.save()

    def record_wrong(self):
        self.streak = 0
        self.save()

    def record_quiz_complete(self):
        self.quizzes_completed += 1
        self.save()

    def record_challenge_complete(self):
        self.challenges_completed += 1
        self.save()

    def show(self):
        print("\n--- Your Progress ---")
        print(f"  Total Score:          {self.score}")
        print(f"  Current Streak:       {self.streak}")
        print(f"  Best Streak:          {self.best_streak}")
        print(f"  Quizzes Completed:    {self.quizzes_completed}")
        print(f"  Challenges Completed: {self.challenges_completed}")
        if self.topics_mastered:
            print(f"  Topics Mastered:      {', '.join(sorted(self.topics_mastered))}")

        level = self.score // 100
        print(f"\n  Level: {level} ({'Beginner' if level < 3 else 'Intermediate' if level < 7 else 'Advanced'})")
