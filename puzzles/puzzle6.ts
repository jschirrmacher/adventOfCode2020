import readInput from "../lib/fileReader"
import { create as getBufferedParser } from "../lib/bufferedParser"

type GroupAnswer = string[]

export function createEntry(buffer: string[]): GroupAnswer {
  return [ ...buffer ]
}

export function solveGroup(groupAnswer: GroupAnswer): number {
  return groupAnswer
    .join('')
    .split('')
    .sort()
    .filter((el, i, a) => i === a.indexOf(el))
    .length
}

export function solve(data: GroupAnswer[]): number {
  return data.reduce((sum, current) => sum + solveGroup(current), 0)
}

export function run(): string {
  const parser = getBufferedParser(createEntry)
  return '6a: ' + solve(readInput(parser.parse).concat(parser.flush()) as GroupAnswer[])
}
