+++
title = 'Python - The Stylish Way'
date = 2025-12-02T19:56:00+01:00
draft = false
[params]
  difficulty = ""
  description  = "A Python Style Guide"
+++

# Why?

This article is for anyone who is already able to write decent Python code but wants to improve the quality of their work. Once you grasp the basic syntax and logic behind Python, you can quickly accomplish your first projects. That is exactly what makes Python such a powerful language.

So far so good, but as soon as you start working in larger teams where you have to collaborate with others, writing messy code becomes a pain for everyone involved. If your code looks like a big pile of spaghetti, deciphering it later becomes increasingly difficult—even for you.

![Bad Meme](/images/pythonic/badmeme.jpg)

In this article, I want to give some advice on how to increase the quality of your code and make it more readable for others (and yourself in the future).

### Pythonic Python

First, I want to emphasize that there is a big difference between writing Python code and writing _Pythonic_ code. Pythonic code is code that follows the idioms and best practices of the Python community. It is code that strives to be elegant and readable.

### The Zen of Python

Tim Peters, one of the major contributors to Python, wrote a collection of guiding principles for writing Pythonic code. It is a short ruleset containing 19 aphorisms, known as:

```bash
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's make more of those!
```

Take a moment to read the verses carefully. What started as a joke is actually a very good guideline and a brief summary of what Pythonic code is all about. However, these rules should be taken with a grain of salt. They are not set in stone, there are always exceptions, and they can be interpreted subjectively. Beauty is always in the eye of the beholder.

# Beautiful is better than ugly

Especially for those migrating from languages like C, C++, or Java, it is important to understand that Python places a heavy emphasis on code readability. Writing code that is easy to read and understand is a high priority. Let's look at this code snippet:

```python
cities = ["Berlin", "Vienna", "Zurich"]
i = 0
while i < len(cities):
    print(cities[i])
    i += 1

# If you need the index
for i in range(len(cities)):
    print(f"{i}: {cities[i]}")
```

I kept this example simple so you can clearly see what is going on. But even here, we can see that this isn't the "Python way." Let's look at the same code written in a more fashionable manner:

```python
cities = ["Berlin", "Vienna", "Zurich"]

for city in cities:
    print(city)

# If you really need the index, try it with enumerate
for i, city in enumerate(cities):
    print(f"{i}: {city}")
```

Even though we have the same functionality, the second code snippet is way more readable. The first snippet looks more like C or Java, which works technically, but can get messy in complex examples with more logic involved.

# Flat is better than nested

Let's stay with iterating lists for a moment. This can often lead to a “nested nightmare,” but that's actually not necessary. Let's take a quick look at the following example, in which we square a list of even numbers.

```python
numbers = [1, 2, 3, 4, 5]
squared_numbers = []

for num in numbers:
    if num % 2 == 0:
        squared_numbers.append(num * num)
```

Now, let's look at the cleaner approach using List Comprehensions:

```python
numbers = [1, 2, 3, 4, 5]
squared_numbers = [num * num for num in numbers if num % 2 == 0]
```

As you can see, instead of implementing a nested `if` statement, we can go with a cleaner approach. While the first example might be more intuitive for absolute beginners, the second example handles the same functionality in one line of code. It reads almost like an English sentence: "for each number in numbers, if the number is even, square it."

# Simple is better than complex

One great example of Python misuse is file handling. Let's look at this example:

```python
file = open('some_file.txt', 'r')
try:
    content = file.read()
  # If something goes wrong here the file might never close
finally:
    file.close()
```

As you can guess, this isn't a good idea. This behavior can cause memory leaks or locked files, and trust me, this will happen sooner or later. There is a more elegant way to handle files in Python:

```python
with open('secret_plans.txt', 'r') as file:
    content = file.read()
```

Here we are using the **Context Manager**, which is guaranteed to close the file no matter what happens. It's a cleaner approach that saves us lines of code. Opening the file with `open()` and `close()` manually is not only more complex but also error-prone.

Please remember:

### "Errors should never pass silently, unless explicitly silenced."

# Explicit is better than implicit

This principle is about making your code's intent clear. A great example of this is how we pass arguments to functions.

#### Implicit

```python
def create_user(name, age, admin):
    # logic...
    pass

# What do these arguments mean?
create_user("John", 30, True)
```

In the example above, looking at the function call `create_user("John", 30, True)` doesn't tell you much. Is `True` for "is_admin"? Or "is_active"? You have to guess or check the definition.

#### Explicit

```python
# Using keyword arguments
create_user(name="John", age=30, admin=True)
```

By being explicit with keyword arguments, you make your code predictable and easier to understand and maintain.

# Python Enhancement Proposals

[Peps.python.org](https://peps.python.org/) is the online library for Python Enhancement Proposals, also known as PEPs. PEPs describe new features as well as best practices for the Python community. They play a major role in the development and maintenance of the Python language. I already made you familiar with the most well-known PEP, the Zen of Python (PEP 20). But there are many more worth reading.

### PEP 8 - Style Guide for Python Code

One PEP that is essential reading is PEP 8. This particular PEP is incredibly important as it describes the most common conventions such as code layout, naming conventions, comments, and much more.

While I cannot cover all the content from PEP 8 in this article, I highly recommend you read it yourself. You can find it [here](https://peps.python.org/pep-0008/). However, I wanted to briefly highlight some of the most important notes from the proposal.

### Indentation

Python uses 4 spaces per indentation level. While tabs and spaces are both technically whitespace, mixing them is disallowed.

```python
fruits = [
    "banana",
    "apple",
    "orange"
]

# Also allowed, but maximum line length is typically 79 characters
vegetables = ["carrot", "broccoli", "spinach"]
```

As mentioned above, the recommended maximum line length is 79 characters. Longer lines should be wrapped onto multiple lines. If necessary, backslashes can be used:

```python
with open('/path/to/some/file/you/want/to/read') as file_1, \
     open('/path/to/some/file/being/written', 'w') as file_2:
    file_2.write(file_1.read())
```

### More Style Tips

To wrap it all up, here are a few more conventions that should be followed.

```python
import this  # Imports should usually be on separate lines
import that

import this, that  # Wrong way

# Whitespace should only be used as a separator inside parentheses, brackets, or braces
cook(milk[300], {"Bread": 2, "Gluten-Free": False})

# Wrong way: overuse of whitespace
cook ( milk[ 300 ], { "Bread" : 2, "Gluten-Free" : False })


class Something:
    # Top Level Functions and class definitions should be surrounded by two blank lines

    def main():
        # Normal functions within a class should be surrounded by one blank line
        """Do nothing at all"""  # Docstrings are opened and closed with """
        pass

    def function():
        """Still doing nothing.
        But the Docstring is longer than before.
        """
        # If the Docstring is longer than one line, the closing """ should be on a new line
        pass
```

# Conclusion

Python is a great language that allows you to write code quickly and efficiently. But writing clean and readable code is just as important as writing code that works. Nobody is expecting you to be the Buddha of Zen Python immediately, but getting to know the basic principles and trying to apply them is key—especially when working in teams.

That's it for me. Stay Zen and keep coding!

![Stay Zen](/images/pythonic/zen.jpg)
