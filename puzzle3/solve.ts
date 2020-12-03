import readInput from '../lib/fileReader'
import path from 'path'

type Forrest = string[]

function countTrees(forrest: Forrest, right: number, down: number): number {
  let count = 0
  let row = 0
  let col = 0
  while (row < forrest.length) {
    console.log(row, col, forrest[row])
    if (forrest[row][col] === '#') {
      count++
    }
    col = (col + right) % forrest[row].length
    row += down
  }
  return count
}

const forrest = readInput(path.resolve(__dirname, 'input.txt'), line => line) as Forrest
console.log(countTrees(forrest, 3, 1))
