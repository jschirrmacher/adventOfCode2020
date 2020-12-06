import readInput from "../lib/fileReader"
import { create as getBufferedParser } from "../lib/bufferedParser"

type GroupAnswer = string[]

export function createEntry(buffer: string[]): GroupAnswer {
  return [ ...buffer ]
}

const intersection = (a: string[], b: string[]) => a.filter(e => b.indexOf(e) > -1)
const intersectAll = (...arrs: string[][]) => arrs.splice(1).reduce((arr, current) => intersection(arr, current), arrs[0])

export const solver = {
  a(groupAnswer: GroupAnswer): number {
    return groupAnswer
      .join('')
      .split('')
      .sort()
      .filter((el, i, a) => i === a.indexOf(el))
      .length
  },
  
  b(groupAnswer: GroupAnswer): number {
    return intersectAll(...groupAnswer.map(e => e.split(''))).length
  }
}

export function solve(data: GroupAnswer[], countType: keyof typeof solver): number {
  return data.reduce((sum, current) => sum + solver[countType](current), 0)
}

export function run(): string {
  const parser = getBufferedParser(createEntry)
  const input = readInput(parser.parse).concat(parser.flush()) as GroupAnswer[]
  return '6a: ' + solve(input, 'a') +
    '\n6b: ' + solve(input, 'b')
}
