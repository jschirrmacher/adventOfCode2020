function findNthNumber(numbers: number[], n: number): number {
  const indexes = {} as Record<number, number>
  numbers.slice(0, -1).forEach((num, i) => indexes[num] = i)
  let count = numbers.length
  let last = numbers[count - 1]
  while (count < n) {
    const index = indexes[last]
    const newValue = 'undefined' === typeof index ? 0 : count - indexes[last] - 1
    indexes[last] = count - 1
    last = newValue
    count++
  }
  return last
}

export function solveA(numbers: number[]): number {
  return findNthNumber(numbers, 2020)
}

export function solveB(numbers: number[]): number {
  return findNthNumber(numbers, 30000000)
}

export function run(): string {
  const input = [ 9, 19, 1, 6, 0, 5, 4 ]
  return '15a: ' + solveA(input)
}
