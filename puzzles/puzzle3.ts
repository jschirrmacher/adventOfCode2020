import readInput from '../lib/fileReader'

type Forrest = string[]
type Result = {
  left: number,
  down: number,
  result: number
}

function countTrees(forrest: Forrest, right: number, down: number): number {
  let count = 0
  let row = 0
  let col = 0
  while (row < forrest.length) {
    if (forrest[row][col] === '#') {
      count++
    }
    col = (col + right) % forrest[row].length
    row += down
  }
  return count
}

export function solveA(forrest: Forrest): number {
  return countTrees(forrest, 3, 1)
}

export function solveB(forrest: Forrest): number {
  const values = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
  const results = values.map(([left, down]) => ({ left, down, result: countTrees(forrest, left, down) }))
  return results.reduce((prod: number, current) => prod * current.result, 1)
}

export function run(): string {
  const forrest = readInput() as Forrest
  return '3a: ' + solveA(forrest) + '\n3b: ' + solveB(forrest)
}
