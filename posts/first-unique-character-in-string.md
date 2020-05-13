---
title: "Solving Leetcode: First Unique Character In A String"
date: "2020-05-01"
---

## Understanding The Problem

Let's try to understand [the problem](https://leetcode.com/problems/first-unique-character-in-a-string/) in the simplest terms that we can, by rephrasing the problem in our own words:

*We would like to find the **position** of the **first unique character** in a string. If the position isn't found, return undefined (in this case, **undefined means -1**).*

When we have an understanding that makes sense to us on a high level, lets start to dig deeper and understand the parameters of the function.

- What is our input?
- What is our output?
- Is there anything about this problem that we need to define?

Regarding inputs and outputs, Leetcode gives us a `JS-DOC` and a bit of an explanation. Sometimes that isn't always clear in an interview, so be sure to understand what your parameters are for your problem. In this case, we input a lowercase string, and return a number, either the index of the unique character, or `-1` for undefined.

The one thing we should define in this problem is **what is a unique character?**

Intuitively, when something is unique, there is only one of it. So we should **return the first occurence of a character where the count of it is 1.** Based on that definition we created, we can then start to flesh out examples.

## Creating Examples

Leetcode is helpful enough to throw in some sample inputs, but if those examples don't work for you, do not get stuck on them, and try to create examples that can help you solve the problem. The first thing we should try to do with any problem is to take care of any initial edge cases that can break our program right away. The input that almost always breaks things is no input:

```javascript
// "" -> -1 (there are no unique character)
// no characters
```

**Always** take into account of these easy edge cases. Whether it's a string bases input, array, or any other data structure, always take into account for empty inputs.

For some problems there may be more edge cases, but in this problem, this appears to be our only edge case.

Once we understand that, let's work on a sample input. In this article, I will use `hello` for now:

```javascript
// hello -> 0 (h is our first unique character)
```

## Break Down The Problem

Now with an example, and an understanding of the problem, lets try to break down the problem. Since we are looking for unique characters (characters with a  count that is exactly `1`), the most intuitive thing to is get the count of each character occurence:

```javascript
// h = 1
// e = 1
// l = 2
// o = 1
```

Once we have all of our counts, we want to return the index of the first unique character. So basically:

```javascript
// if character count is 1
// return the index of the that character in the string
```

That seems to be the jist of our program. Let's try to solve it!

## Solving The Problem

Going through with what we defined earlier, lets start to define our program one step at a time, starting with our simple edge case of no input:

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    let charCounter = {};
    let uniqueCharIndex = -1;
    if (s.length === 0) return uniqueCharIndex;
};

firstUniqueChar(''); // -1
```

I am using a variable in this case because we are returning a number regardless, and we can reassign this number to be a different index later when we start looking for a unique character. W now have now taken care of one test case! Let's tackle the rest of the problem.

Looking at the `hello` pseudocode counter from earlier, an object would make the most sense to keep track of our character counts. Reasons being:

- The pseudocode kind of looks like an object already
- We don't care about the position of elements, so we don't need an array or any other structure that deals with positions

```javascript
// h = 1
// e = 1
// l = 2
// o = 1

{
  "h": 1,
  "e": 1,
  "l": 2,
  "o": 1
}
```

This already looks like we need to iterate over each of our characters in our string input. Lets do that, but implement the increment logic after for the sake of understanding how it works. We can just assign the letter to be a property in an empty object with a count of `0` for each character:

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  let charCounter = {};
  let uniqueCharIndex = -1;

  if (s.length === 0) return uniqueCharIndex;

  for (char of s) {
    charCounter[char] = 0;
  }

  return charCounter;
};

firstUniqueChar('hello'); // { "h": 0, "e": 0, "l": 0, "o": 0 }
```

Now that we have our properties in our object with a count, we can then figure out how to increment the properties in the object. We can break down the logic like so:

Each property count will start at `0` like above, but we will have to increment if the property exists.

So while going through our loop, this is how it will work in *pseudocode*:

```javascript
// char = h
// assign h to object
// h count will start at 0 -> { h: 0 };
// does h exist in our object? Yes
// increment -> { h: 1 };

// char = e
// assign e to object
// e count will start at 0 -> { h: 1, e: 0 };
// does e exist in our object? Yes
// increment -> { h: 1, e: 1 };

// char = l
// assign l to object
// l count will start at 0 -> { h: 1, e: 1, l: 0 };
// does l exist in our object? Yes
// increment -> { h: 1, e: 1, l: 1 };

// char = l
// assign l to object (already there)
// l count will be 1 from previous iteration -> { h: 1, e: 1, l: 1 };
// does l exist in our object? Yes
// increment -> { h: 1, e: 1, l: 2 };

// char = o
// assign o to object
// o count will start at 0 -> { h: 1, e: 1, l: 2, o: 0 };
// does o exist in our object? Yes
// increment -> { h: 1, e: 1, l: 2, o: 1 };
```

A little bit verbose, but when it comes to solving algorithms, it helps to lay down what your code will be doing before you write any actual code, Maybe not each individual step in a loop, but for the sake of example, it can help in the long run.

After we understand what our code should be doing, let's write down the code. We can use the logical OR operator to state our logic in JavaScript.

```javascript
charCounter[char] = (charCounter[char] || 0) + 1
// ^ property assign   ^ property exists? use the property value, otherwise, use 0
// then we increment by 1
```

In our function:

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  if (s.length === 0) return -1;

  let charCounter = {};

  for (char of s) {
    charCounter[char] = (charCounter[char] || 0) + 1;
  }

  return charCounter;
};

firstUniqueChar('hello'); // { "h": 1, "e": 1, "l": 2, "o": 1 }
```

We have our data. Now we need to figure out how to return the index of the first unique character. We should be able to loop through our new data structure and do some logic based on what the object contains.

```
// while we loop through our object
// check if the count of the current character property is 1 (1 means unique)
// if unique, return our character index in the string, we can use indexOf() to keep it simple
```

Implementing the pseudocode:

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    let charCounter = {};
    let uniqueCharIndex = -1;

    if (s.length === 0) return uniqueCharIndex;

    for (char of s) {
        charCounter[char] = (charCounter[char] || 0) + 1
    }

    for (key in charCounter) {
        let charCount = charCounter[key];
        let isUnique = charCount === 1;
        if (isUnique) {
            uniqueCharIndex = s.indexOf(key);
            return uniqueCharIndex;
        }
    }

    return uniqueCharIndex;
};

firstUniqueChar('hello'); // 0
```

And at last we have a working solution! It passes all the cases on Leetcode and it is relatively quick. The time complexity of it is `O^n` because we are only ever iterating over something once (one iteration for the string, and one iteration for the `charCounter`). And regarding space complexity, it is also `O^n` since our `charCounter` is depending on the length of the input.

Overall, I would say it's a solid solution. I like it because it's readable, and the time/space complexity is decent for the problem. There are other solutions that probably don't involve using `indexOf` but in this case, it doesn't add to our time complexity due to the fact that our `unique` condition is met once and the program breaks thereafter finding the index.

One problem down, many more to go! Thanks for reading.