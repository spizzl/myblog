+++
title = 'Python - the Stylish Way'
date = 2025-12-02T19:56:00+01:00
draft = false
[params]
  difficulty = ""
  shortdesc = "A Python Style Guide"
+++

## Why?

This Article is oriented to everybody who already is able to write decen Python code and wants to improve the quality of code that is beeing written. Once you've got the basic Syntax and logic behind Python you are quickly able to ackomplish your first projects. That is what makes Python so powerful of a language.

So far so good, but as soon as you start working in bigger teams where you have to colaborate with others, writing shitty code becomes a pain in the butt for everyone involved. If your code looks like a big pile of spaghetti it is increasingly more work trying to decipher the code in the end.

![Bad Meme](/images/pythonic/badmeme.jpg)

So in this article I want to give some advice on how to increase the quality of your code and make it more readable for others (and yourself in the future).

## Pythonic Python

First I want to say, that there is a big differecen between writing Python code and witing _Pythonic_ code. Pythonic code is code that follows the idioms and best practices of the Python community. It is code that tries to be the most elegant and readable.

### The Zen of Python

Tim Peters, one of the founding fathers wrote a collection of guiding principles for writing Pythonic Code. It is a short rule set containing 19 rules. And it states as follows:

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
Special cases arent special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless youre Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, its a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- lets make more of those!
```

You may take time and read the verses carefully. But what started as a joke, is actually a very good guideline and a brief summary of what Pythonic code is all about. But all those rules should taken with a grain of salt. They are not set in stone and there are always exceptions to the rules as those rules can be interepreted subjectively. And Beuty is always in the eye of the beholder.

# Beautiful is better than ugly

For especially those peopl who are migrating from Languages like C, C++ or Java it is important to understand that Python is a language that puts a lot of emphasis on code readability. So writing code that is easy to read and understand is high priotity. Lets say we have a code snippet like this:

```python
cities = ["Berlin", "Vienna", "Zurich"]
i = 0
while i < len(cities):
    print(cities[i])
    i += 1

# I you need index
for i in range(len(cities)):
    print(f"{i}: {cities[i]}")
```

I've tried to keep it for the sake of the exmple simple. So you can really see what is going on. But even in this simple example we can already see that the code is not very the Python way of doing it. Lets take a look at the same code written in more fashonable manner.

```python
cities = ["Berlin", "Vienna", "Zurich"]

for city in cities:
    print(city)

# If you really need index. Try it with enumerate
for i, city in enumerate(cities):
    print(f"{i}: {city}")
```

Even we have the same functionality, the second code snippet is way more readable and easier to understand. The first code snippet looks more like C or Java code, which totally works in this example, but it can get really messy in more complex exmaples with more logic involved.

# Flat is better than nested

Let's stay with iterating lists for a moment. This can very often lead to a “nested nightmare.” But that's actually not necessary at all. Let's take a quick look at the following example, in which a list of numbers is calculated quadratically.

```python
numbers = [1, 2, 3, 4, 5]
squared_numbers = []

for num in numbers:
    if num % 2 == 0:
        squared_numbers.append(num * num)
```

Lets look at the more clean approach:

```python
numbers = [1, 2, 3, 4, 5]
squared_numbers = [num * num for num in numbers if num % 2 == 0]
```

As you can see instead of implementing a nested if statement we can go with the more clean approach. While the first example is more intuitive for beginners, the second example took the same functionality in only 2 lines of code. It even reads as an english sentence: "for each number in numbers, if the number is even, square it and add it to squared_numbers".
