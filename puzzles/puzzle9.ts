import readInput from "../lib/fileReader"
import byNumber from '../lib/byNumber'

export function hasAPairInPreamble(sortedPreamble: number[], num: number): boolean {
  let lowIndex = 0
  let highIndex = sortedPreamble.length - 1
  while (lowIndex < highIndex) {
    const sum = sortedPreamble[lowIndex] + sortedPreamble[highIndex]
    if (sum === num) {
      return true
    } else if (sum < num) {
      lowIndex++
    } else if (sum > num) {
      highIndex--
    }
  }
  return false
}

export function solveA(input: number[], preambleLength: number): number {
  return input.find((num, index) => {
    if (index >= preambleLength) {
      const preamble = input.slice(index - preambleLength, index)
      return index >= preambleLength && !hasAPairInPreamble(preamble.sort(byNumber), num)
    }
    return false
  }) as number
}

export function solveB(input: number[], searched: number): number {
  let lowIndex = 0
  let length = 2
  while (length < input.length - 2) {
    while (lowIndex < input.length - 2 - length) {
      const slice = input.slice(lowIndex, lowIndex + length)
      if (slice.includes(searched)) {
        break
      }
      const sum = slice.reduce((sum, current) => sum + current, 0)
      if (sum === searched) {
        const sorted = slice.sort(byNumber)
        return sorted[0] + sorted[sorted.length - 1]
      } else if (sum < searched) {
        lowIndex++
      } else {
        break
      }
    }
    lowIndex = 0
    length++
  }
  return 0
}

export function run(): string {
  const input = readInput(line => parseInt(line))
  const resultA = solveA(input, 25)
  return '9a: ' + resultA + '\n9b: ' + solveB(input, resultA)
}
