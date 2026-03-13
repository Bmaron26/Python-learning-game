"""Question bank for the Python Learning Game."""

QUESTIONS = {
    "basics": [
        {
            "question": "What is the correct way to print 'Hello' in Python 3?",
            "options": ["print 'Hello'", "print('Hello')", "echo('Hello')", "printf('Hello')"],
            "answer": 1,
            "explanation": "In Python 3, print() is a function and requires parentheses.",
        },
        {
            "question": "Which of these is a valid variable name in Python?",
            "options": ["2name", "my-var", "_count", "class"],
            "answer": 2,
            "explanation": "Variable names can start with a letter or underscore, not a digit or hyphen. 'class' is a reserved keyword.",
        },
        {
            "question": "What does type(42) return?",
            "options": ["<class 'float'>", "<class 'int'>", "<class 'str'>", "<class 'number'>"],
            "answer": 1,
            "explanation": "42 is an integer, so type() returns <class 'int'>.",
        },
        {
            "question": "How do you write a single-line comment in Python?",
            "options": ["// comment", "# comment", "/* comment */", "-- comment"],
            "answer": 1,
            "explanation": "Python uses # for single-line comments.",
        },
        {
            "question": "What is the output of: 10 // 3?",
            "options": ["3.33", "3", "4", "3.0"],
            "answer": 1,
            "explanation": "// is the floor division operator. 10 // 3 = 3 (integer division).",
        },
    ],
    "data_types": [
        {
            "question": "Which of these is a mutable data type?",
            "options": ["tuple", "str", "list", "int"],
            "answer": 2,
            "explanation": "Lists are mutable — you can add, remove, or change their elements.",
        },
        {
            "question": "What does len('Python') return?",
            "options": ["5", "6", "7", "Error"],
            "answer": 1,
            "explanation": "'Python' has 6 characters, so len() returns 6.",
        },
        {
            "question": "What is the result of: 'hello'[1]?",
            "options": ["'h'", "'e'", "'l'", "Error"],
            "answer": 1,
            "explanation": "String indexing starts at 0, so index 1 is 'e'.",
        },
        {
            "question": "What type is {'a': 1, 'b': 2}?",
            "options": ["list", "set", "dict", "tuple"],
            "answer": 2,
            "explanation": "Curly braces with key:value pairs create a dictionary (dict).",
        },
        {
            "question": "What does bool('') return?",
            "options": ["True", "False", "None", "Error"],
            "answer": 1,
            "explanation": "An empty string is falsy in Python, so bool('') returns False.",
        },
    ],
    "control_flow": [
        {
            "question": "What keyword starts a conditional block in Python?",
            "options": ["switch", "if", "when", "case"],
            "answer": 1,
            "explanation": "Python uses 'if' for conditional statements (no switch/case prior to 3.10's match).",
        },
        {
            "question": "What does 'break' do in a loop?",
            "options": [
                "Skips to the next iteration",
                "Exits the loop immediately",
                "Restarts the loop",
                "Pauses the loop",
            ],
            "answer": 1,
            "explanation": "'break' exits the loop immediately. 'continue' skips to the next iteration.",
        },
        {
            "question": "How many times does this loop run?\nfor i in range(3):\n    print(i)",
            "options": ["2", "3", "4", "1"],
            "answer": 1,
            "explanation": "range(3) produces 0, 1, 2 — that's 3 iterations.",
        },
        {
            "question": "What is the output of:\nx = 5\nif x > 3:\n    print('A')\nelif x > 1:\n    print('B')",
            "options": ["A", "B", "A and B", "Nothing"],
            "answer": 0,
            "explanation": "x > 3 is True, so 'A' prints. The elif is not checked because the if was True.",
        },
        {
            "question": "Which loop is guaranteed to run at least once?",
            "options": ["for loop", "while loop", "do-while loop", "None of these in Python"],
            "answer": 3,
            "explanation": "Python has no do-while loop. Both for and while check conditions before the first iteration.",
        },
    ],
    "functions": [
        {
            "question": "Which keyword is used to define a function in Python?",
            "options": ["func", "function", "def", "define"],
            "answer": 2,
            "explanation": "Python uses 'def' to define functions.",
        },
        {
            "question": "What does a function return if there is no return statement?",
            "options": ["0", "''", "None", "Error"],
            "answer": 2,
            "explanation": "Functions without a return statement implicitly return None.",
        },
        {
            "question": "What is a lambda in Python?",
            "options": [
                "A type of loop",
                "An anonymous function",
                "A class method",
                "A module",
            ],
            "answer": 1,
            "explanation": "Lambda creates small anonymous (unnamed) functions: lambda x: x + 1",
        },
        {
            "question": "What does *args do in a function definition?",
            "options": [
                "Multiplies arguments",
                "Accepts variable positional arguments",
                "Unpacks a dictionary",
                "Makes arguments optional",
            ],
            "answer": 1,
            "explanation": "*args collects extra positional arguments into a tuple.",
        },
        {
            "question": "What is the output of:\ndef greet(name='World'):\n    return f'Hello, {name}!'\nprint(greet())",
            "options": ["Hello, !", "Hello, World!", "Hello, name!", "Error"],
            "answer": 1,
            "explanation": "When no argument is passed, the default value 'World' is used.",
        },
    ],
    "lists_and_loops": [
        {
            "question": "What does [1, 2, 3] + [4, 5] produce?",
            "options": ["[5, 7]", "[1, 2, 3, 4, 5]", "Error", "[[1,2,3],[4,5]]"],
            "answer": 1,
            "explanation": "The + operator concatenates lists.",
        },
        {
            "question": "What is a list comprehension?",
            "options": [
                "A way to sort lists",
                "A concise way to create lists",
                "A method to delete list items",
                "A type of loop",
            ],
            "answer": 1,
            "explanation": "List comprehensions like [x**2 for x in range(5)] create lists concisely.",
        },
        {
            "question": "What does [1, 2, 3].append(4) return?",
            "options": ["[1, 2, 3, 4]", "None", "4", "Error"],
            "answer": 1,
            "explanation": "append() modifies the list in-place and returns None.",
        },
        {
            "question": "How do you get the last element of a list?",
            "options": ["my_list[0]", "my_list[-1]", "my_list[last]", "my_list.end()"],
            "answer": 1,
            "explanation": "Negative indexing: -1 refers to the last element.",
        },
        {
            "question": "What does enumerate(['a', 'b', 'c']) produce?",
            "options": [
                "['a', 'b', 'c']",
                "[(0,'a'), (1,'b'), (2,'c')]",
                "[0, 1, 2]",
                "{'a':0, 'b':1, 'c':2}",
            ],
            "answer": 1,
            "explanation": "enumerate() yields (index, value) pairs.",
        },
    ],
}

TOPIC_NAMES = {
    "basics": "Python Basics",
    "data_types": "Data Types",
    "control_flow": "Control Flow",
    "functions": "Functions",
    "lists_and_loops": "Lists & Loops",
}
