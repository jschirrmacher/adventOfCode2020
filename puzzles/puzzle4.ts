import readInput from '../lib/fileReader'

type Entry = {
  byr: string,
  iyr: string,
  eyr: string,
  hgt: string,
  hcl: string,
  ecl: string,
  pid: string,
  cid: string,
}

const savedLines = [] as string[]

function createEntryFromSavedLines() {
  const fields = savedLines.join(' ').match(/(\w{3}):([#\w]+)/g)?.map(info => info.split(':')).map(info => ({[info[0]]: info[1]}))
  const passport = Object.assign({}, ...(fields as Array<Record<string, string>>))
  savedLines.length = 0
  return passport as unknown as Entry
}
function lineParser(line: string): Entry | null {
  if (line.trim() === '') {
    return createEntryFromSavedLines()
  } else {
    savedLines.push(line)
    return null
  }
}

function isValid(passport: Entry): boolean {
  const relevantFields = Object.entries(passport)
    .filter(entry => entry[0] !== 'cid')
  return relevantFields.length === 7
} 

const passports = readInput(lineParser).concat(createEntryFromSavedLines()) as Entry[]

export function run(): string {
  // const debugOutput = passports.map(passport => `${Object.entries(passport).map(e => `${e[0]}: ${e[1]}`).join(' ')}: ${isValid(passport)}`).join('\n')
  return 'Number of valid passports: ' + passports.filter(isValid).length
}
