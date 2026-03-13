#!/usr/bin/env python3
"""Python Learning Game - An interactive terminal game to learn Python."""

import sys

from game.menu import main_menu


def main():
    print("\n" + "=" * 55)
    print("  Welcome to the Python Learning Game!")
    print("  Learn Python through quizzes and coding challenges.")
    print("=" * 55)

    try:
        main_menu()
    except KeyboardInterrupt:
        print("\n\nGoodbye! Keep learning Python!")
        sys.exit(0)


if __name__ == "__main__":
    main()
