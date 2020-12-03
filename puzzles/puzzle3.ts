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
  return '' + countTrees(forrest, 3, 1)
}
