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

export function solve(input: string[]): number {
  const decoded = input.map(line => solveSingle(line as string))
  return decoded.reduce((max, current) => Math.max(current.ID, max), 0)

}

export function run(): string {
  return '4a: ' + solve(readInput() as string[])
}
