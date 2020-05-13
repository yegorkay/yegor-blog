---
title: "Solving Leetcode: Single Number"
date: "2020-05-03"
---

## Understanding The Problem

Let's try to understand [the problem](https://leetcode.com/problems/single-number/) in the simplest terms that we can:

We want to return a number that only occurs once in the array. We are only dealing with numbers, and we want to return the number that occurs once. If we are keeping track of occurences, we are therefore keeping count/tally of everything that occurs.

## Creating Examples

Leetcode gives a simple example here that should be self explanatory:

```javascript
// [2,2,1]
// return 1

2 -> occurs 2
1 -< occurs 1
return 1
```



## Break Down The Problem

This is similar to another problem we did, regarding the first unique character in a string. We kept track of all the characters in that solution using an object, so we can likely use the same idea and tweak the function to our liking. Every property in the object will have a count of the occurences of a number, and if the occurence is 1 time only, return that number.

```javascript
// {
// 	"2": 2
// 	"1": 1
// }
```

## Solving The Problem

Like mentioned, the problem is very similar to the unique string problem, so if you'd like a better explanation, go to that article:

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {

    if (nums.length === 0) return undefined;
    if (nums.length === 1) return nums[0];

    let counter = {};

    nums.forEach((num) => {
        counter[num] = (counter[num] || 0) + 1;
    });

    for (key in counter) {
        if (counter[key] === 1) return parseFloat(key);
    }
};
```

The problem meets the requirements of linear runtime.