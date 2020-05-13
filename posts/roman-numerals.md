---
title: "Solving Leetcode: Roman Numerals"
date: "2020-05-03"
---

## Understanding The Problem

Let's try to understand [the problem](https://leetcode.com/problems/roman-to-integer/) in the simplest terms that we can:

We have a string that represents a number. Each letter in the string represents a value. We want to add each letter value  together in order, though there is a caveat. If the **current** value is less than **next** the value beside it, subtract the current value from the next value.

```
// XIV = 14
// X = 10, I = 1, V = 5
// [10, 1, 5]

// SUM = 0

// CURRENT = 10
// NEXT = 1
// CURRENT < NEXT? NO
// ADD CURRENT TO SUM (0 + 10)
// SUM IS NOW 10
// MOVE ONTO NEXT VALUES

// CURRENT = 1
// NEXT = 4
// CURRENT < NEXT? YES
// 5 - 1 = 4 (CURRENT - NEXT)
// ADD TO SUM (10 + 4)
// SUM IS NOW 14
// MOVE ONTO NEXT VALUES
```



## Creating Examples

We've created one example above, though lets see another to see if the logic holds up:

```3
// LVIII = 58
// L = 50, V= 5, III = 3
// [50, 5, 3]

// SUM = 0

// CURRENT = 50
// NEXT = 5
// CURRENT < NEXT? NO
// ADD CURRENT TO SUM (0 + 50)
// SUM IS NOW 50
// MOVE ONTO NEXT VALUES

// CURRENT = 5
// NEXT = 3
// CURRENT < NEXT? NO
// ADD CURRENT TO SUM (50 + 5)
// SUM IS NOW 5
// MOVE ONTO NEXT VALUES

// CURRENT = 3
// NEXT = N/A
// CURRENT < NEXT? NO
// ADD CURRENT TO SUM (50 + 3)
// SUM IS NOW 58
// MOVE ONTO NEXT VALUES
```



## Break Down The Problem

The logic so far makes sense. We can now try to figure out the technical side. First, we need to map out the string into numbers, otherwise we can't really do anything. To me, some sort of object map makes sense. There aren't a lot of values, so the memory used with be constant, and accessing the object will be since we don't have an indices like an array.

```javascript
let integerMap = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};
```

Now we need to break down our string. With the way we have our `integerMap` set up, we can't just pass in the full roman numerical to get our value because the key most likely won't exist. `integerMap['X']` would exist, but `integerMap['XV']` would not. Based on that, we have to break up our string into an array, and iterate over each numeral in the string.

```javascript
var romanToInt = function(s) {
  let romanNums = s.split('');
  return romanNums;
};

romanToInt('XIV') // ['X', 'I', 'V']

```

## Solving The Problem

We have the basic building blocks of the problem. We understand when to add and subtract, so now lets implement our pseudocode from above into our function.

```javascript
let integerMap = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

var romanToInt = function(s) {
  let sum = 0;
  let romanNums = s.split('');

  for (let i = 0; i < romanNums.length; i++) {

    let currValue = integerMap[romanNums[i]];
    let nextValue = integerMap[romanNums[i + 1]];

    if (currValue === undefined) return 0;
    else {
      if (currValue < nextValue) {
        sum += nextValue - currValue;
        i++;
      } else {
        sum += currValue;
      }
    }
  };

  return sum;
};

```

Pretty simple solution. Run time is `O^n` and space complexity is constant. For me, this problem gave me a lot of trouble, is because I overcomplicated things. Originally when I was thinking of a solution, I added way more math and got hung up on that iteration of the problem, and that got me stuck. It was way more than needed, and I overloaded myself with too much code and logic.


```javascript
let validation = (curr, next) => {
  let count = 0;
  if (curr % (5 * curr) === curr) {
    if (next === 5 * curr || next === 10 * curr) {
      count = next - curr;
    }
  }
  return count;
};

// validation(1,5) -> 4

// use this in my romanToInt() function
```

All I needed to do was just subtract the next number from the current number if the next was bigger than the current. Instead, I was trying to figure out how many times a number could fit into 5, and if it multiplies by 5 or 10? What the hell. I got stuck on this for a lot longer than I'm willing to admit, so I slept on it, came back, reworked the solution and got something a lot cleaner.

What I learned from this problem is that you should always try to think of the simplest way to figure something out. Usually nerves lead you down a path of complicating things when you shouldn't, and for me I got flustered, went down the rabbit hole and almost didn't come back. Take a break, come back, and rework things. Do not get hung up. Take things one step at a time. Let's take a step into our next problem.

