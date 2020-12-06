import readInput from "../lib/fileReader"

type Result = {
  row: number,
  col: number,
  ID: number
}

const rowMapper = (c: string): string => c === 'F' ? '0' : c === 'B' ? '1' : ''
const colMapper = (c: string): string => c === 'L' ? '0' : c === 'R' ? '1' : ''

export function solveSingle(input: string): Result {
  const row = parseInt(input.replace(/./g, rowMapper), 2)
  const col = parseInt(input.replace(/./g, colMapper), 2)
  
  return {
    row,
    col,
    ID: row * 8 + col
  }
}

export function decode(input: string[]): Result[] {
  return input.map(line => solveSingle(line as string))
}

export function solve(decoded: Result[]): number {
  return decoded.reduce((max, current) => Math.max(current.ID, max), 0)
}

export function findMissing(ids: number[]): number {
  const list = ids.sort((a, b) => a - b)
  const index = list.findIndex((e, i) => i > 0 && e !== list[i - 1] + 1)
  return list[index - 1] + 1
}

export function run(): string {
  const input = readInput() as string[]
  const decoded = decode(input)

  return '5a: ' + solve(decoded) + '\n' +
    '5b: ' + findMissing(decoded.map(e => e.ID))
}
