import fs from 'fs'
import path from 'path'

type Entry = {
  character: string,
  first: number,
  second: number,
  password: string,
  line: string
}

function parseLine(line: string): Entry {
  const [ rule, password ] = line.split(': ')
  const [ quantifier, character ] = rule.split(' ')
  const [ first, second ] = quantifier.split('-').map(Number)
  return {
    character,
    first,
    second,
    password,
    line
  }
}

function readInput(fileWithPath: string): Array<Entry> {
  return fs.readFileSync(fileWithPath)
    .toString()
    .split('\n')
    .map(parseLine)
}

function matchesPolicyA(entry: Entry): boolean {
  const matches = entry.password.match(new RegExp(entry.character, 'g'))
  const count = matches ? matches.length : 0
  return count >= entry.first && count <= entry.second
}

function matchesPolicyB(entry: Entry): boolean {
  const first = entry.password[entry.first - 1] === entry.character
  const second = entry.password[entry.second - 1] === entry.character
  return first !== second
}

const policies = readInput(path.resolve(__dirname, 'input.txt'))
console.log('2a: ' +
  policies
    .filter(matchesPolicyA)
    .length
)
console.log('2b: ' +
  policies
    .filter(matchesPolicyB)
    .length
)
