"""Quiz mode — multiple choice questions to test Python knowledge."""

import random

from game.questions import QUESTIONS, TOPIC_NAMES


def run_quiz(progress):
    print("\n--- Quiz Mode ---")
    print("Choose a topic:\n")

    topics = list(QUESTIONS.keys())
    for i, topic in enumerate(topics, 1):
        name = TOPIC_NAMES.get(topic, topic)
        count = len(QUESTIONS[topic])
        print(f"  {i}. {name} ({count} questions)")
    print(f"  {len(topics) + 1}. Random Mix")

    choice = input(f"\nSelect (1-{len(topics) + 1}): ").strip()

    try:
        idx = int(choice) - 1
    except ValueError:
        print("Invalid choice.")
        return

    if idx == len(topics):
        # Random mix from all topics
        all_questions = []
        for topic, qs in QUESTIONS.items():
            for q in qs:
                all_questions.append((topic, q))
        random.shuffle(all_questions)
        questions = all_questions[:5]
    elif 0 <= idx < len(topics):
        topic = topics[idx]
        questions = [(topic, q) for q in QUESTIONS[topic]]
        random.shuffle(questions)
    else:
        print("Invalid choice.")
        return

    correct = 0
    total = len(questions)

    for i, (topic, q) in enumerate(questions, 1):
        print(f"\n  Question {i}/{total}")
        print(f"  Topic: {TOPIC_NAMES.get(topic, topic)}")
        print(f"\n  {q['question']}\n")

        for j, option in enumerate(q["options"]):
            print(f"    {j + 1}. {option}")

        answer = input("\n  Your answer (1-4): ").strip()

        try:
            answer_idx = int(answer) - 1
        except ValueError:
            print("  Invalid input — skipping.")
            progress.record_wrong()
            continue

        if answer_idx == q["answer"]:
            correct += 1
            bonus = 5 if progress.streak >= 3 else 0
            progress.record_correct(points=10 + bonus, topic=topic)
            print(f"  Correct! (+{10 + bonus} points)")
            if progress.streak >= 3:
                print(f"  Streak bonus! ({progress.streak} in a row)")
        else:
            progress.record_wrong()
            right = q["options"][q["answer"]]
            print(f"  Wrong! The answer was: {right}")

        print(f"  Explanation: {q['explanation']}")

    progress.record_quiz_complete()
    pct = int(correct / total * 100) if total else 0
    print(f"\n  Quiz Complete! You got {correct}/{total} ({pct}%)")
    if pct == 100:
        print("  Perfect score!")
    elif pct >= 80:
        print("  Great job!")
    elif pct >= 60:
        print("  Good effort! Keep practicing.")
    else:
        print("  Keep studying — you'll improve!")
