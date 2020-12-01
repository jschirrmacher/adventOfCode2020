import fs from 'fs'
import path from 'path'

type Result = {
  found: boolean,
  indices: number[],
  additions: number
}

function numericAscending(a: number, b: number): number {
  return a - b
}

function readExpenses(fileWithPath: string): number[] {
  return fs.readFileSync(fileWithPath)
    .toString()
    .split('\n')
    .map(Number)
    .sort(numericAscending)
}

function createResult(indices: number[]): Result {
  return {
    found: false,
    indices,
    additions: 0
  }
}

function printResult(result: Result): void {
  console.log(result)
  if (result.found) {
    console.log(result.indices.map(index => expenses[index]).join(' + ') + ' = ' + result.indices.reduce((sum, index) => sum + expenses[index], 0))
    console.log(result.indices.map(index => expenses[index]).join(' * ') + ' = ' + result.indices.reduce((product, index) => product * expenses[index], 1))
  }
}

function searchTwo(expenses: number[], value: number): Result {
  const result = createResult([0, expenses.length - 1])

  do {
    result.additions++
    const sum = expenses[result.indices[0]] + expenses[result.indices[1]]
    if (sum > value) {
      result.indices[1]--
    } else if (sum < value) {
      result.indices[0]++
    } else {
      result.found = true
    }
  } while (!result.found && result.indices[0] < result.indices[1])

  return result
}

function searchThree(expenses: number[], value: number): Result {
  const result = createResult([0, 1, expenses.length - 1])

  do {
    result.additions++
    const sum = expenses[result.indices[0]] + expenses[result.indices[1]] + expenses[result.indices[2]]
    if (sum > value) {
      result.indices[2]--
    } else if (sum < value) {
      result.indices[1]++
      if (result.indices[1] === result.indices[2]) {
        result.indices[0]++
        result.indices[1] = result.indices[0] + 1
      }
    } else if (sum === value) {
      result.found = true
    }
  } while (!result.found)

  return result
}

const expenses = readExpenses(path.resolve(__dirname, 'expenses.csv'))
printResult(searchTwo(expenses, 2020))
printResult(searchThree(expenses, 2020))
