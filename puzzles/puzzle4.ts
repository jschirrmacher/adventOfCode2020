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

function assert(condition: boolean) {
  if (!condition) {
    throw Error('doesn\t validate')
  }
}

function validateYearRange(value: number, min: number, max: number): boolean {
  try {
    assert(value >= min)
    assert(value <= max)
    return true
  } catch {
    return false
  }
}

function validateHeight(value: number, unit: string): boolean {
  try {
    if (unit === 'cm') {
      assert(value >= 150 && value <= 193)
    } else {
      assert(value >= 59 && value <= 76)
    }
    return true
  } catch {
    return false
  }
}

function isValid(passport: Entry, strict = false): boolean {
  const relevantFields = Object.entries(passport)
    .filter(entry => entry[0] !== 'cid')
  
  try {
    assert(relevantFields.length === 7)
    if (strict) {
      assert(!!passport.byr.match(/^\d{4}$/) && validateYearRange(+passport.byr, 1920, 2002))
      assert(!!passport.iyr.match(/^\d{4}$/) && validateYearRange(+passport.iyr, 2010, 2020))
      assert(!!passport.eyr.match(/^\d{4}$/) && validateYearRange(+passport.eyr, 2020, 2030))
      assert(!!passport.hgt.match(/^(1?\d\d)(in|cm)$/) && validateHeight(+RegExp.$1, RegExp.$2))
      assert(!!passport.hcl.match(/^#[\da-f]{6}$/))
      assert(!!passport.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/))
      assert(!!passport.pid.match(/^\d{9}$/))
    }
    return true
  } catch (error) {
    return false
  }
} 

const passports = readInput(lineParser).concat(createEntryFromSavedLines()) as Entry[]

function sortedFields(passport: Entry): string[][] {
  return Object.keys(passport).sort().map(key => ([key, passport[key as keyof Entry]]))
}

export function run(): string {
  console.log(passports
    .filter(passport => isValid(passport) && isValid(passport, true))
    .map(passport => `${sortedFields(passport).map(e => `${e[0]}: ${e[1]}`).join(' ')}: ${isValid(passport, true)}`).join('\n')
  )
  return 'Number of valid passports with lax validation: ' + passports.filter(passport => isValid(passport)).length + 
       '\nNumber of valid passports with strict validation: ' + passports.filter(passport => isValid(passport, true)).length
}
