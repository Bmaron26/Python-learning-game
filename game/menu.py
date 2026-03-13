"""Main menu and navigation for the Python Learning Game."""

from game.quiz import run_quiz
from game.challenges import run_challenge
from game.progress import Progress


def main_menu():
    progress = Progress()

    while True:
        print("\n--- Main Menu ---")
        print(f"  Score: {progress.score} | Streak: {progress.streak}")
        print()
        print("  1. Quiz Mode (Multiple Choice)")
        print("  2. Coding Challenges")
        print("  3. View Progress")
        print("  4. Quit")
        print()

        choice = input("Choose an option (1-4): ").strip()

        if choice == "1":
            run_quiz(progress)
        elif choice == "2":
            run_challenge(progress)
        elif choice == "3":
            progress.show()
        elif choice == "4":
            print("\nGoodbye! Keep learning Python!")
            break
        else:
            print("Invalid choice. Please enter 1-4.")
