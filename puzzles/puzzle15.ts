function findNthNumber(numbers: number[], n: number): number {
  const indexes = {} as Record<number, number>
  numbers.slice(0, -1).forEach((num, i) => indexes[num] = i)
  numbers.reverse()
  while (numbers.length < n) {
    const last = numbers[0]
    const index = indexes[last]
    const newValue = 'undefined' === typeof index ? 0 : numbers.length - indexes[last] - 1
    indexes[last] = numbers.length - 1
    numbers.unshift(newValue)
  }
  return numbers[0]
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
