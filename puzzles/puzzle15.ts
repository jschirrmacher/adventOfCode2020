export function solveA(numbers: number[]): number {
  const previous = numbers.reverse()
  while (previous.length < 2020) {
    const last = previous[0]
    const index = previous.slice(1).findIndex(n => n === last) + 1
    numbers.unshift(index)
  }
  return previous[0]
}

export function run(): string {
  const input = [ 9, 19, 1, 6, 0, 5, 4 ]
  return '15a: ' + solveA(input)
}
