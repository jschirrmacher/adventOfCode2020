import fs from 'fs'
import path from 'path'

type Result = {
  found: boolean,
  firstIndex: number,
  lastIndex: number,
}

function searchForValue(expenses: number[], value: number): Result {
  const result = {
    found: false,
    firstIndex: 0,
    lastIndex: expenses.length - 1
  } as Result

  do {
    const sum = expenses[result.firstIndex] + expenses[result.lastIndex]
    if (sum > value) {
      result.lastIndex--
    } else if (sum < value) {
      result.firstIndex++
    } else {
      result.found = true
      return result
    }
  } while (result.firstIndex < result.lastIndex)

  return result
}

const numericAscending = (a: number, b: number): number => a - b
const fileWithPath = path.resolve(__dirname, 'expenses.csv')
const expenses = fs.readFileSync(fileWithPath)
  .toString()
  .split('\n')
  .map(Number)
  .sort(numericAscending)

const result = searchForValue(expenses, 2020)
console.log(result)
console.log(`${expenses[result.firstIndex]} + ${expenses[result.lastIndex]} = ${expenses[result.firstIndex] + expenses[result.lastIndex]}`)
console.log(`${expenses[result.firstIndex]} * ${expenses[result.lastIndex]} = ${expenses[result.firstIndex] * expenses[result.lastIndex]}`)
