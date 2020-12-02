import fs from 'fs'
import path from 'path'

type Entry = {
  character: string,
  from: number,
  to: number,
  password: string
}

function parseLine(line: string): Entry {
  const [ rule, password ] = line.split(': ')
  const [ quantifier, character ] = rule.split(' ')
  const [ from, to ] = quantifier.split('-').map(Number)
  return {
    character,
    from,
    to,
    password
  }
}

function readInput(fileWithPath: string): Array<Entry> {
  return fs.readFileSync(fileWithPath)
    .toString()
    .split('\n')
    .map(parseLine)
}

function matchesPolicy(entry: Entry): boolean {
  const matches = entry.password.match(new RegExp(entry.character, 'g'))
  const count = matches ? matches.length : 0
  return count >= entry.from && count <= entry.to
}

console.log(
  readInput(path.resolve(__dirname, 'input.txt'))
    .filter(matchesPolicy)
    .length
)
