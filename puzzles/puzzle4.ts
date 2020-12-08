import readInput from '../lib/fileReader'
import { create as getBufferedParser } from '../lib/BufferedParser'

export type Entry = {
  byr: string,
  iyr: string,
  eyr: string,
  hgt: string,
  hcl: string,
  ecl: string,
  pid: string,
  cid: string,
}

export function createEntry(buffer: string[]): Entry {
  const matches = buffer.join(' ').match(/(\w{3}):([#\w]+)/g) as RegExpMatchArray
  const fields = matches.map(info => info.split(':')).map(info => ({[info[0]]: info[1]}))
  const passport = Object.assign({}, ...(fields as Array<Record<string, string>>))
  return passport as unknown as Entry
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

export function solveA(passports: Entry[]): number {
  return passports.filter(passport => isValid(passport)).length
}

export function solveB(passports: Entry[]): number {
  return passports.filter(passport => isValid(passport, true)).length
}

export function run(): string {
  const parser = getBufferedParser(createEntry)
  const passports = readInput(parser.parse).concat(parser.flush()) as Entry[]

  return '4a: ' + solveA(passports) +
       '\n4b: ' + solveB(passports)
}
