import fs from 'fs'

type Parser = (line: string) => unknown

export default function readInput(fileWithPath: string, parseLine: Parser): Array<unknown> {
  return fs.readFileSync(fileWithPath)
    .toString()
    .split('\n')
    .map(parseLine)
}
