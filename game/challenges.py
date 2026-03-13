"""Coding challenges — write Python code to solve problems."""

import sys
import io


CHALLENGES = [
    {
        "title": "Sum of a List",
        "difficulty": "Easy",
        "description": "Write a function called 'solution' that takes a list of numbers and returns their sum.\nDo NOT use the built-in sum() function.",
        "test_cases": [
            {"input": [1, 2, 3], "expected": 6},
            {"input": [10, -5, 3], "expected": 8},
            {"input": [], "expected": 0},
            {"input": [42], "expected": 42},
        ],
        "hint": "Use a for loop and an accumulator variable.",
    },
    {
        "title": "Reverse a String",
        "difficulty": "Easy",
        "description": "Write a function called 'solution' that takes a string and returns it reversed.",
        "test_cases": [
            {"input": "hello", "expected": "olleh"},
            {"input": "Python", "expected": "nohtyP"},
            {"input": "", "expected": ""},
            {"input": "a", "expected": "a"},
        ],
        "hint": "Try slicing with a step of -1: s[::-1]",
    },
    {
        "title": "Count Vowels",
        "difficulty": "Easy",
        "description": "Write a function called 'solution' that takes a string and returns the number of vowels (a, e, i, o, u) in it. Case-insensitive.",
        "test_cases": [
            {"input": "hello", "expected": 2},
            {"input": "PYTHON", "expected": 1},
            {"input": "aeiou", "expected": 5},
            {"input": "xyz", "expected": 0},
        ],
        "hint": "Convert to lowercase, then check each character against 'aeiou'.",
    },
    {
        "title": "FizzBuzz Value",
        "difficulty": "Medium",
        "description": "Write a function called 'solution' that takes an integer n and returns:\n- 'FizzBuzz' if divisible by both 3 and 5\n- 'Fizz' if divisible by 3 only\n- 'Buzz' if divisible by 5 only\n- The number as a string otherwise",
        "test_cases": [
            {"input": 15, "expected": "FizzBuzz"},
            {"input": 9, "expected": "Fizz"},
            {"input": 10, "expected": "Buzz"},
            {"input": 7, "expected": "7"},
        ],
        "hint": "Check divisibility by 15 first (both 3 and 5), then 3, then 5.",
    },
    {
        "title": "Find Maximum",
        "difficulty": "Medium",
        "description": "Write a function called 'solution' that takes a list of numbers and returns the largest one.\nDo NOT use the built-in max() function. Assume the list is non-empty.",
        "test_cases": [
            {"input": [1, 5, 3, 9, 2], "expected": 9},
            {"input": [-1, -5, -3], "expected": -1},
            {"input": [42], "expected": 42},
            {"input": [3, 3, 3], "expected": 3},
        ],
        "hint": "Start with the first element as your maximum, then loop through comparing.",
    },
    {
        "title": "Is Palindrome",
        "difficulty": "Medium",
        "description": "Write a function called 'solution' that takes a string and returns True if it is a palindrome (reads the same forwards and backwards), False otherwise. Ignore case and spaces.",
        "test_cases": [
            {"input": "racecar", "expected": True},
            {"input": "hello", "expected": False},
            {"input": "A man a plan a canal Panama", "expected": True},
            {"input": "", "expected": True},
        ],
        "hint": "Remove spaces, convert to lowercase, then compare with the reverse.",
    },
    {
        "title": "Fibonacci",
        "difficulty": "Hard",
        "description": "Write a function called 'solution' that takes an integer n and returns the nth Fibonacci number (0-indexed).\nF(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)",
        "test_cases": [
            {"input": 0, "expected": 0},
            {"input": 1, "expected": 1},
            {"input": 6, "expected": 8},
            {"input": 10, "expected": 55},
        ],
        "hint": "Use a loop with two variables tracking the previous two values.",
    },
    {
        "title": "Flatten a Nested List",
        "difficulty": "Hard",
        "description": "Write a function called 'solution' that takes a nested list and returns a flat list.\nExample: [[1,2],[3,[4,5]]] -> [1,2,3,4,5]",
        "test_cases": [
            {"input": [[1, 2], [3, 4]], "expected": [1, 2, 3, 4]},
            {"input": [[1, [2, 3]], [4]], "expected": [1, 2, 3, 4]},
            {"input": [], "expected": []},
            {"input": [1, [2, [3, [4]]]], "expected": [1, 2, 3, 4]},
        ],
        "hint": "Use recursion: if an element is a list, flatten it; otherwise, add it to the result.",
    },
]


def run_challenge(progress):
    print("\n--- Coding Challenges ---")
    print("Write Python code to solve each challenge.\n")

    for i, ch in enumerate(CHALLENGES, 1):
        print(f"  {i}. [{ch['difficulty']}] {ch['title']}")

    choice = input(f"\nSelect a challenge (1-{len(CHALLENGES)}): ").strip()

    try:
        idx = int(choice) - 1
        if not 0 <= idx < len(CHALLENGES):
            raise ValueError
    except ValueError:
        print("Invalid choice.")
        return

    challenge = CHALLENGES[idx]

    print(f"\n  [{challenge['difficulty']}] {challenge['title']}")
    print(f"\n  {challenge['description']}")
    print(f"\n  Example: solution({challenge['test_cases'][0]['input']!r}) -> {challenge['test_cases'][0]['expected']!r}")
    print("\n  Type your code below (enter a blank line to submit):")
    print("  Hint: Type 'hint' to get a hint.\n")

    lines = []
    while True:
        try:
            line = input("  >>> ")
        except EOFError:
            break
        if line.strip().lower() == "hint":
            print(f"  Hint: {challenge['hint']}")
            continue
        if line.strip() == "" and lines:
            break
        lines.append(line)

    if not lines:
        print("  No code entered.")
        return

    code = "\n".join(lines)
    _evaluate_challenge(code, challenge, progress)


def _evaluate_challenge(code, challenge, progress):
    """Safely evaluate user code against test cases."""
    # Create a restricted namespace
    namespace = {}

    # Capture stdout
    old_stdout = sys.stdout
    sys.stdout = io.StringIO()

    try:
        exec(code, {"__builtins__": __builtins__}, namespace)
    except Exception as e:
        sys.stdout = old_stdout
        print(f"\n  Code Error: {e}")
        return
    finally:
        sys.stdout = old_stdout

    if "solution" not in namespace:
        print("\n  Error: Your code must define a function called 'solution'.")
        return

    solution = namespace["solution"]
    passed = 0
    total = len(challenge["test_cases"])

    for i, tc in enumerate(challenge["test_cases"], 1):
        try:
            result = solution(tc["input"])
            if result == tc["expected"]:
                passed += 1
                print(f"  Test {i}: PASS")
            else:
                print(f"  Test {i}: FAIL — got {result!r}, expected {tc['expected']!r}")
        except Exception as e:
            print(f"  Test {i}: ERROR — {e}")

    print(f"\n  Results: {passed}/{total} tests passed")

    if passed == total:
        points = {"Easy": 15, "Medium": 25, "Hard": 40}.get(challenge["difficulty"], 10)
        progress.record_correct(points=points, topic="challenges")
        progress.record_challenge_complete()
        print(f"  Challenge complete! (+{points} points)")
    else:
        progress.record_wrong()
        print("  Keep trying! You can attempt this challenge again.")
