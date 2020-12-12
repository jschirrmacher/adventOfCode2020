import byNumber from "../lib/byNumber"
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

export function solveB(adapters: number[]): number {
  const knownResults: Record<number, number> = {}

  function solveFor(adapters: number[]): number {
    if (adapters.length === 1) {
      return 1
    }
    const currentAdapter = adapters[0]
    if (!knownResults[currentAdapter]) {
      const possibleAdapters = adapters.slice(1).filter(a => a <= adapters[0] + 3)
      const possibilitiesFrom = possibleAdapters.map(adapter => solveFor(adapters.filter(a => a >= adapter)))
      knownResults[currentAdapter] = possibilitiesFrom.reduce((sum, current) => sum + current, 0)
    }
    return knownResults[currentAdapter]
  }

  return solveFor([0].concat(adapters.sort(byNumber)))
}

export function run(): string {
  const input = readInput(Number)
  return '10a: ' + solveA(input) + '\n10b: ' + solveB(input)
}
