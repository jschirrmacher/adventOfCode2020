import readInput from '../lib/fileReader'

type Entry = {
  character: string,
  first: number,
  second: number,
  password: string,
  line: string
}

function lineParser(line: string): Entry {
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

const policies = readInput(lineParser) as Entry[]

export function run(): string {
  return '2a: ' +
    policies
      .filter(matchesPolicyA)
      .length
    + '\n2b: ' +
    policies
      .filter(matchesPolicyB)
      .length
}
