import mongoose from "mongoose";
import dotenv from "dotenv";
import CodeProblem from "../models/CodeProblem.js";

dotenv.config();

const codingProblems = [
    // EASY PROBLEMS
    {
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        difficulty: "Easy",
        category: "Arrays",
        tags: ["array", "hash-table"],
        timeLimit: 1000,
        memoryLimit: 256,
        example: {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        testCases: [
            { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", isHidden: false },
            { input: "[3,2,4]\n6", expectedOutput: "[1,2]", isHidden: false },
            { input: "[3,3]\n6", expectedOutput: "[0,1]", isHidden: true },
        ],
        templates: {
            javascript: `function twoSum(nums, target) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
const nums = JSON.parse(input[0]);
const target = parseInt(input[1]);
console.log(JSON.stringify(twoSum(nums, target)));`,
            python: `def two_sum(nums, target):
    # Write your code here
    pass

# Test
import sys
lines = sys.stdin.read().strip().split('\\n')
nums = eval(lines[0])
target = int(lines[1])
print(two_sum(nums, target))`,
            java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String numsStr = sc.nextLine();
        int target = sc.nextInt();
        
        // Parse array
        numsStr = numsStr.substring(1, numsStr.length() - 1);
        String[] parts = numsStr.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        
        Solution sol = new Solution();
        int[] result = sol.twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    return {};
}

int main() {
    // Input parsing would go here
    return 0;
}`
        },
        hints: [
            "Try using a hash map to store numbers you've seen",
            "For each number, check if target - number exists in the map"
        ],
        solution: {
            javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
            python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`
        },
        isActive: true
    },
    {
        title: "Reverse String",
        description: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
        difficulty: "Easy",
        category: "Strings",
        tags: ["string", "two-pointers"],
        timeLimit: 1000,
        memoryLimit: 256,
        example: {
            input: 's = ["h","e","l","l","o"]',
            output: '["o","l","l","e","h"]',
            explanation: "Reverse the array of characters"
        },
        testCases: [
            { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]', isHidden: false },
            { input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]', isHidden: false },
            { input: '["A"]', expectedOutput: '["A"]', isHidden: true },
        ],
        templates: {
            javascript: `function reverseString(s) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim();
const s = JSON.parse(input);
reverseString(s);
console.log(JSON.stringify(s));`,
            python: `def reverse_string(s):
    # Write your code here
    pass

# Test
import sys
s = eval(sys.stdin.read().strip())
reverse_string(s)
print(s)`
        },
        hints: [
            "Use two pointers, one at the start and one at the end",
            "Swap characters and move pointers toward each other"
        ],
        isActive: true
    },
    {
        title: "Palindrome Number",
        description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
        difficulty: "Easy",
        category: "Math",
        tags: ["math"],
        timeLimit: 1000,
        memoryLimit: 256,
        example: {
            input: "x = 121",
            output: "true",
            explanation: "121 reads as 121 from left to right and from right to left."
        },
        testCases: [
            { input: "121", expectedOutput: "true", isHidden: false },
            { input: "-121", expectedOutput: "false", isHidden: false },
            { input: "10", expectedOutput: "false", isHidden: false },
        ],
        templates: {
            javascript: `function isPalindrome(x) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim();
console.log(isPalindrome(parseInt(input)));`,
            python: `def is_palindrome(x):
    # Write your code here
    pass

# Test
import sys
x = int(sys.stdin.read().strip())
print(str(is_palindrome(x)).lower())`
        },
        hints: [
            "Negative numbers are not palindromes",
            "You can convert to string or reverse the number mathematically"
        ],
        isActive: true
    },
    {
        title: "Maximum Subarray",
        description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
        difficulty: "Easy",
        category: "Arrays",
        tags: ["array", "dynamic-programming", "divide-and-conquer"],
        timeLimit: 1000,
        memoryLimit: 256,
        example: {
            input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
            output: "6",
            explanation: "The subarray [4,-1,2,1] has the largest sum 6."
        },
        testCases: [
            { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6", isHidden: false },
            { input: "[1]", expectedOutput: "1", isHidden: false },
            { input: "[5,4,-1,7,8]", expectedOutput: "23", isHidden: true },
        ],
        templates: {
            javascript: `function maxSubArray(nums) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim();
const nums = JSON.parse(input);
console.log(maxSubArray(nums));`,
            python: `def max_sub_array(nums):
    # Write your code here
    pass

# Test
import sys
nums = eval(sys.stdin.read().strip())
print(max_sub_array(nums))`
        },
        hints: [
            "Try Kadane's algorithm",
            "Keep track of the current sum and maximum sum seen so far"
        ],
        isActive: true
    },
    {
        title: "Fizz Buzz",
        description: "Given an integer n, return a string array answer (1-indexed) where: answer[i] == 'FizzBuzz' if i is divisible by 3 and 5, answer[i] == 'Fizz' if i is divisible by 3, answer[i] == 'Buzz' if i is divisible by 5, answer[i] == i (as a string) if none of the above conditions are true.",
        difficulty: "Easy",
        category: "Math",
        tags: ["math", "string"],
        timeLimit: 1000,
        memoryLimit: 256,
        example: {
            input: "n = 15",
            output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]',
            explanation: "For multiples of 3, print Fizz. For multiples of 5, print Buzz. For multiples of both, print FizzBuzz."
        },
        testCases: [
            { input: "3", expectedOutput: '["1","2","Fizz"]', isHidden: false },
            { input: "5", expectedOutput: '["1","2","Fizz","4","Buzz"]', isHidden: false },
            { input: "15", expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', isHidden: true },
        ],
        templates: {
            javascript: `function fizzBuzz(n) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim();
console.log(JSON.stringify(fizzBuzz(parseInt(input))));`,
            python: `def fizz_buzz(n):
    # Write your code here
    pass

# Test
import sys
n = int(sys.stdin.read().strip())
print(fizz_buzz(n))`
        },
        hints: [
            "Check divisibility by 15 first, then 3, then 5",
            "Use modulo operator to check divisibility"
        ],
        isActive: true
    },

    // MEDIUM PROBLEMS
    {
        title: "Valid Parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
        difficulty: "Medium",
        category: "Strings",
        tags: ["string", "stack"],
        timeLimit: 1000,
        memoryLimit: 256,
        example: {
            input: 's = "()"',
            output: "true",
            explanation: "The string contains valid parentheses pairs."
        },
        testCases: [
            { input: "()", expectedOutput: "true", isHidden: false },
            { input: "()[]{}", expectedOutput: "true", isHidden: false },
            { input: "(]", expectedOutput: "false", isHidden: false },
            { input: "([)]", expectedOutput: "false", isHidden: true },
        ],
        templates: {
            javascript: `function isValid(s) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim();
console.log(isValid(input));`,
            python: `def is_valid(s):
    # Write your code here
    pass

# Test
import sys
s = sys.stdin.read().strip()
print(str(is_valid(s)).lower())`
        },
        hints: [
            "Use a stack to keep track of opening brackets",
            "When you see a closing bracket, check if it matches the top of the stack"
        ],
        isActive: true
    },
    {
        title: "Merge Two Sorted Lists",
        description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
        difficulty: "Medium",
        category: "Linked Lists",
        tags: ["linked-list", "recursion"],
        timeLimit: 1000,
        memoryLimit: 256,
        example: {
            input: "list1 = [1,2,4], list2 = [1,3,4]",
            output: "[1,1,2,3,4,4]",
            explanation: "Merge two sorted linked lists."
        },
        testCases: [
            { input: "[1,2,4]\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]", isHidden: false },
            { input: "[]\n[]", expectedOutput: "[]", isHidden: false },
            { input: "[]\n[0]", expectedOutput: "[0]", isHidden: true },
        ],
        templates: {
            javascript: `function mergeTwoLists(list1, list2) {
    // Write your code here
    // Input will be arrays for simplicity
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
const list1 = JSON.parse(input[0]);
const list2 = JSON.parse(input[1]);
console.log(JSON.stringify(mergeTwoLists(list1, list2)));`,
            python: `def merge_two_lists(list1, list2):
    # Write your code here
    pass

# Test
import sys
lines = sys.stdin.read().strip().split('\\n')
list1 = eval(lines[0])
list2 = eval(lines[1])
print(merge_two_lists(list1, list2))`
        },
        hints: [
            "Compare the first elements of both lists",
            "Use a dummy head node to simplify the logic"
        ],
        isActive: true
    },
    {
        title: "Binary Search",
        description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
        difficulty: "Medium",
        category: "Algorithms",
        tags: ["array", "binary-search"],
        timeLimit: 1000,
        memoryLimit: 256,
        example: {
            input: "nums = [-1,0,3,5,9,12], target = 9",
            output: "4",
            explanation: "9 exists in nums and its index is 4"
        },
        testCases: [
            { input: "[-1,0,3,5,9,12]\n9", expectedOutput: "4", isHidden: false },
            { input: "[-1,0,3,5,9,12]\n2", expectedOutput: "-1", isHidden: false },
            { input: "[5]\n5", expectedOutput: "0", isHidden: true },
        ],
        templates: {
            javascript: `function search(nums, target) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
const nums = JSON.parse(input[0]);
const target = parseInt(input[1]);
console.log(search(nums, target));`,
            python: `def search(nums, target):
    # Write your code here
    pass

# Test
import sys
lines = sys.stdin.read().strip().split('\\n')
nums = eval(lines[0])
target = int(lines[1])
print(search(nums, target))`
        },
        hints: [
            "Use two pointers: left and right",
            "Calculate mid and compare with target"
        ],
        isActive: true
    },
    {
        title: "Container With Most Water",
        description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        difficulty: "Medium",
        category: "Arrays",
        tags: ["array", "two-pointers", "greedy"],
        timeLimit: 1000,
        memoryLimit: 256,
        example: {
            input: "height = [1,8,6,2,5,4,8,3,7]",
            output: "49",
            explanation: "The max area of water the container can contain is 49."
        },
        testCases: [
            { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49", isHidden: false },
            { input: "[1,1]", expectedOutput: "1", isHidden: false },
            { input: "[4,3,2,1,4]", expectedOutput: "16", isHidden: true },
        ],
        templates: {
            javascript: `function maxArea(height) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim();
const height = JSON.parse(input);
console.log(maxArea(height));`,
            python: `def max_area(height):
    # Write your code here
    pass

# Test
import sys
height = eval(sys.stdin.read().strip())
print(max_area(height))`
        },
        hints: [
            "Use two pointers starting from both ends",
            "Move the pointer with smaller height inward"
        ],
        isActive: true
    },
    {
        title: "Longest Common Prefix",
        description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string ''.",
        difficulty: "Medium",
        category: "Strings",
        tags: ["string"],
        timeLimit: 1000,
        memoryLimit: 256,
        example: {
            input: 'strs = ["flower","flow","flight"]',
            output: '"fl"',
            explanation: 'The longest common prefix is "fl".'
        },
        testCases: [
            { input: '["flower","flow","flight"]', expectedOutput: '"fl"', isHidden: false },
            { input: '["dog","racecar","car"]', expectedOutput: '""', isHidden: false },
            { input: '["ab","a"]', expectedOutput: '"a"', isHidden: true },
        ],
        templates: {
            javascript: `function longestCommonPrefix(strs) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim();
const strs = JSON.parse(input);
console.log(JSON.stringify(longestCommonPrefix(strs)));`,
            python: `def longest_common_prefix(strs):
    # Write your code here
    pass

# Test
import sys
strs = eval(sys.stdin.read().strip())
print(f'"{longest_common_prefix(strs)}"')`
        },
        hints: [
            "Compare characters at each position across all strings",
            "Stop when you find a mismatch"
        ],
        isActive: true
    },

    // HARD PROBLEMS
    {
        title: "Median of Two Sorted Arrays",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
        difficulty: "Hard",
        category: "Arrays",
        tags: ["array", "binary-search", "divide-and-conquer"],
        timeLimit: 2000,
        memoryLimit: 256,
        example: {
            input: "nums1 = [1,3], nums2 = [2]",
            output: "2.0",
            explanation: "merged array = [1,2,3] and median is 2."
        },
        testCases: [
            { input: "[1,3]\n[2]", expectedOutput: "2.0", isHidden: false },
            { input: "[1,2]\n[3,4]", expectedOutput: "2.5", isHidden: false },
            { input: "[0,0]\n[0,0]", expectedOutput: "0.0", isHidden: true },
        ],
        templates: {
            javascript: `function findMedianSortedArrays(nums1, nums2) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
const nums1 = JSON.parse(input[0]);
const nums2 = JSON.parse(input[1]);
console.log(findMedianSortedArrays(nums1, nums2));`,
            python: `def find_median_sorted_arrays(nums1, nums2):
    # Write your code here
    pass

# Test
import sys
lines = sys.stdin.read().strip().split('\\n')
nums1 = eval(lines[0])
nums2 = eval(lines[1])
print(find_median_sorted_arrays(nums1, nums2))`
        },
        hints: [
            "Use binary search on the smaller array",
            "Partition both arrays to find the median"
        ],
        isActive: true
    },
    {
        title: "Trapping Rain Water",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        difficulty: "Hard",
        category: "Arrays",
        tags: ["array", "two-pointers", "dynamic-programming", "stack"],
        timeLimit: 2000,
        memoryLimit: 256,
        example: {
            input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
            output: "6",
            explanation: "The elevation map can trap 6 units of rain water."
        },
        testCases: [
            { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6", isHidden: false },
            { input: "[4,2,0,3,2,5]", expectedOutput: "9", isHidden: false },
            { input: "[4,2,3]", expectedOutput: "1", isHidden: true },
        ],
        templates: {
            javascript: `function trap(height) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim();
const height = JSON.parse(input);
console.log(trap(height));`,
            python: `def trap(height):
    # Write your code here
    pass

# Test
import sys
height = eval(sys.stdin.read().strip())
print(trap(height))`
        },
        hints: [
            "Water level at each position is min(max_left, max_right) - height",
            "Use two pointers or dynamic programming"
        ],
        isActive: true
    },
    {
        title: "Regular Expression Matching",
        description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where: '.' Matches any single character. '*' Matches zero or more of the preceding element.",
        difficulty: "Hard",
        category: "Strings",
        tags: ["string", "dynamic-programming", "recursion"],
        timeLimit: 2000,
        memoryLimit: 256,
        example: {
            input: 's = "aa", p = "a"',
            output: "false",
            explanation: '"a" does not match the entire string "aa".'
        },
        testCases: [
            { input: "aa\na", expectedOutput: "false", isHidden: false },
            { input: "aa\na*", expectedOutput: "true", isHidden: false },
            { input: "ab\n.*", expectedOutput: "true", isHidden: true },
        ],
        templates: {
            javascript: `function isMatch(s, p) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
console.log(isMatch(input[0], input[1]));`,
            python: `def is_match(s, p):
    # Write your code here
    pass

# Test
import sys
lines = sys.stdin.read().strip().split('\\n')
print(str(is_match(lines[0], lines[1])).lower())`
        },
        hints: [
            "Use dynamic programming",
            "Consider cases for '.' and '*' separately"
        ],
        isActive: true
    },
    {
        title: "Longest Valid Parentheses",
        description: "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.",
        difficulty: "Hard",
        category: "Strings",
        tags: ["string", "dynamic-programming", "stack"],
        timeLimit: 2000,
        memoryLimit: 256,
        example: {
            input: 's = "(()"',
            output: "2",
            explanation: 'The longest valid parentheses substring is "()".'
        },
        testCases: [
            { input: "(()", expectedOutput: "2", isHidden: false },
            { input: ")()())", expectedOutput: "4", isHidden: false },
            { input: " ", expectedOutput: "0", isHidden: false },
        ],
        templates: {
            javascript: `function longestValidParentheses(s) {
    // Write your code here
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim();
console.log(longestValidParentheses(input));`,
            python: `def longest_valid_parentheses(s):
    # Write your code here
    pass

# Test
import sys
s = sys.stdin.read().strip()
print(longest_valid_parentheses(s))`
        },
        hints: [
            "Use a stack to track indices of parentheses",
            "Or use dynamic programming"
        ],
        isActive: true
    },
    {
        title: "Merge k Sorted Lists",
        description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        difficulty: "Hard",
        category: "Linked Lists",
        tags: ["linked-list", "divide-and-conquer", "heap", "merge-sort"],
        timeLimit: 2000,
        memoryLimit: 256,
        example: {
            input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
            output: "[1,1,2,3,4,4,5,6]",
            explanation: "Merge all k sorted linked lists."
        },
        testCases: [
            { input: '[[1,4,5],[1,3,4],[2,6]]', expectedOutput: "[1,1,2,3,4,4,5,6]", isHidden: false },
            { input: '[]', expectedOutput: "[]", isHidden: false },
            { input: '[[]]', expectedOutput: "[]", isHidden: true },
        ],
        templates: {
            javascript: `function mergeKLists(lists) {
    // Write your code here
    // Input will be 2D array for simplicity
    
}

// Test
const input = require('fs').readFileSync(0, 'utf-8').trim();
const lists = JSON.parse(input);
console.log(JSON.stringify(mergeKLists(lists)));`,
            python: `def merge_k_lists(lists):
    # Write your code here
    pass

# Test
import sys
lists = eval(sys.stdin.read().strip())
print(merge_k_lists(lists))`
        },
        hints: [
            "Use a min heap to efficiently get the smallest element",
            "Or use divide and conquer approach"
        ],
        isActive: true
    }
];

async function seedProblems() {
    try {
        console.log("🌱 Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        console.log("🗑️  Clearing existing problems...");
        await CodeProblem.deleteMany({});
        console.log("✅ Cleared existing problems");

        console.log("📝 Inserting coding problems...");
        await CodeProblem.insertMany(codingProblems);
        console.log(`✅ Successfully inserted ${codingProblems.length} coding problems`);

        // Summary
        const easyCount = codingProblems.filter(p => p.difficulty === "Easy").length;
        const mediumCount = codingProblems.filter(p => p.difficulty === "Medium").length;
        const hardCount = codingProblems.filter(p => p.difficulty === "Hard").length;

        console.log("\n📊 Summary:");
        console.log(`   Easy: ${easyCount} problems`);
        console.log(`   Medium: ${mediumCount} problems`);
        console.log(`   Hard: ${hardCount} problems`);
        console.log(`   Total: ${codingProblems.length} problems\n`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding problems:", error);
        process.exit(1);
    }
}

seedProblems();
