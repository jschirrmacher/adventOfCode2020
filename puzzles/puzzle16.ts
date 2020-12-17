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

type Candidate = {
  name: string,
  no: number
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

export function isValidTicket(rules: Rule[], ticket: Ticket): boolean {
  return !ticket.some(value => !isValidValue(rules, value))
}

export function getErrorRate(rules: Rule[], ticket: Ticket): number {
  return ticket
    .filter(value => isValidValue(rules, value) ? 0 : value)
    .reduce((sum, value) =>  sum + value, 0)
}

export function solveA(input: Input): number {
  return input.nearby.reduce((sum, ticket) => sum + getErrorRate(input.rules, ticket), 0)
}

export function getValidTickets(rules: Rule[], tickets: Ticket[]): Ticket[] {
  return tickets.filter(ticket => isValidTicket(rules, ticket))
}

function getCandidates(rules: Rule[], tickets: Ticket[]): Candidate[] {
  const candidates: Candidate[] = []
  tickets[0].forEach((_, no) => {
    const values = tickets.map(t => t[no])
    rules.forEach(rule => {
      if (!values.some(value => !fulfilsRule(rule, value))) {
        candidates.push({ name: rule.name, no })
      }
    })
  })
  return candidates
}

export function findFieldMapping(rules: Rule[], tickets: Ticket[]): Candidate[] {
  let candidates = getCandidates(rules, tickets)
  while (candidates.length > rules.length) {
    for (let i = 0; i < tickets[0].length; i++) {
      const matching = candidates.filter(m => m.no === i)
      if (matching.length == 1) {
        console.log('Found mapping:', matching[0])
        candidates = candidates.filter(m => m.name !== matching[0].name || m.no === matching[0].no)
      }
    }
  }
  return candidates
}

export function solveB(input: Input): number {
  const validTickets = [ input.yours, ...getValidTickets(input.rules, input.nearby)]
  console.log(input.nearby.length, validTickets.length)
  const fieldMapping = findFieldMapping(input.rules, validTickets)
  console.log(fieldMapping)
  const relevant = fieldMapping.filter(mapping => mapping.name.startsWith('departure'))
  return relevant.reduce((result, mapping) => result * input.yours[mapping.no], 1)
}

export function run(): string {
  const input = parse(readInput())
  return '16a: ' + solveA(input) + '\n16b: ' + solveB(input)
}
