import readInput from "../lib/fileReader"

export type Rule = string

export type Input = {
  rules: Rule[]
  messages: string[]
}

export function parse(input: string[]): Input {
  const rules = [] as string[]
  const messages = [] as string[]
  input.forEach(line => {
    const matches = line.match(/^(\d+):\s*(.*)$/)
    if (matches) {
      rules[+matches[1]] = matches[2]
    } else if (line.trim() !== '') {
      messages.push(line)
    }
  })
  return { rules, messages }
}

export function buildTree(rules: Rule[], ruleNo = 0): (message: string) => number {
  function handleList(listStr: string): (message: string) => number {
    return message => listStr.trim().split(' ').reduce((pos, ruleNo) => {
      return pos + buildTree(rules, +ruleNo)(message.substr(pos))
    }, 0)
  }

  const rule = rules[ruleNo]
  const matches = rule.match(/^"(.)"$/)
  if (matches) {
    return message => message.startsWith(matches[1]) ? 1 : 0
  }
  const variants = rule.split('|')
  return message => {
    return variants.map(variant => handleList(variant)(message))
      .reduce((max, current) => Math.max(max, current))
  }
}

export function solveA(input: Input): number {
  const tree = buildTree(input.rules)
  return input.messages.filter(message => tree(message) === message.length).length
}

export function run(): string {
  const input = parse(readInput(line => line))
  return '19a: ' + solveA(input)
}