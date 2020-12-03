import readInput from '../lib/fileReader'

type Forrest = string[]

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

const forrest = readInput() as Forrest

export function run(): string {
  const values = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
  const results = values.map(([left, down]) => ({ left, down, result: countTrees(forrest, left, down) }))
  const product = results.reduce((prod, current) => prod * current.result, 1)
  return results.map(entry => `${entry.left}, ${entry.down}: ${entry.result}`).join('\n') + '\n\nProduct: ' + product
}
