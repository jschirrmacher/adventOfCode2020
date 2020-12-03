 import readInput from '../lib/fileReader'

type Result = {
  found: boolean,
  indices: number[],
  additions: number
}

function numericAscending(a: number, b: number): number {
  return a - b
}

function createResult(indices: number[]): Result {
  return {
    found: false,
    indices,
    additions: 0
  }
}

type ReducerFunction = (previousValue: number, currentValue: number) => number

function formatResult(result: Result): string {
  function expression2String(operator: string, reducer: ReducerFunction, startVal: number) {
    return result.indices.map(index => expenses[index]).join(' ' + operator + ' ') + ' = ' + result.indices.reduce(reducer, startVal)
  }
  let output = JSON.stringify(result, null, 2)
  if (result.found) {
    output += '\n' + expression2String('+', (sum, index) => sum + expenses[index], 0)
    output += '\n' + expression2String('*', (product, index) => product * expenses[index], 1)
  }
  return output
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

const rawExpenses = readInput(Number) as number[]
const expenses = rawExpenses.sort(numericAscending)

export function run(): string {
  return formatResult(searchTwo(expenses, 2020)) + '\n' + formatResult(searchThree(expenses, 2020))
}
