import readInput from "../lib/fileReader"

export function hasAPairInPreamble(preamble: number[], num: number): boolean {
  let lowIndex = 0
  let highIndex = preamble.length - 1
  while (lowIndex < highIndex) {
    const sum = preamble[lowIndex] + preamble[highIndex]
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
      return index >= preambleLength && !hasAPairInPreamble(preamble.sort((a, b) => a - b), num)
    }
    return false
  }) as number
}

export function run(): string {
  const input = readInput(line => parseInt(line))
  return '9a: ' + solveA(input, 25)
}
