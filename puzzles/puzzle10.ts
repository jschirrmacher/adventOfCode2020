import readInput from "../lib/fileReader"

export function solveA(adapters: number[]): number {
  const differenceCounts = [0, 0, 1]
  const last = adapters.reduce((max, current) => Math.max(max, current))
  let currentJolts = 0
  do {
    const possibleAdapters = adapters.filter(a => a > currentJolts && a <= currentJolts + 3)
    const currentAdapter = possibleAdapters.reduce((min, current) => Math.min(min, current), last)
    const difference = currentAdapter - currentJolts - 1
    differenceCounts[difference]++
    currentJolts = currentAdapter
  } while (currentJolts < last)
  return differenceCounts[0] * differenceCounts[2]
}

export function run(): string {
  const input = readInput(Number)
  return '10a: ' + solveA(input)
}
