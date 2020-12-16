import readInput from "../lib/fileReader"

type Rule = {
  name: string,
  ranges: number [][]
}

type Ticket = number[]

type Input = {
  rules: Rule[],
  yours: Ticket,
  nearby: Ticket[]
}

export function parseRule(line: string): Rule {
  const parts = line.split(/^([\w\s]+): (.*)$/)
  const name = parts[1]
  const ranges = parts[2]
    .split(' or ')
    .map(r => r.split('-').map(Number))
  return { name, ranges }
}

export function parse(lines: string[]): Input {
  const parts = lines
    .join('\n')
    .split(/^(.*?)your ticket:(.*?)nearby tickets:(.*)$/s)
    .map(p => p.trim().split('\n'))

  const rules = parts[1].map(parseRule)
  const yours = parts[2][0].split(',').map(Number)
  const nearby = parts[3].map(n => n.split(',').map(Number))
  return { rules, yours, nearby }
}

function isInRange(range: number[], value: number): boolean {
  return value >= range[0] && value <= range[1]
}

function fulfilsRule(rule: Rule, value: number): boolean {
  return rule.ranges.some(range => isInRange(range, value))
}

function isValidValue(rules: Rule[], value: number): boolean {
  return rules.some(rule => fulfilsRule(rule, value))
}

function getErrorRate(rules: Rule[], ticket: Ticket): number {
  return ticket
    .filter(value => isValidValue(rules, value) ? 0 : value)
    .reduce((sum, value) =>  sum + value, 0)
}

export function solveA(input: Input): number {
  return input.nearby.reduce((sum, ticket) => sum + getErrorRate(input.rules, ticket), 0)
}

export function run(): string {
  const input = parse(readInput())
  return '16a: ' + solveA(input)
}
