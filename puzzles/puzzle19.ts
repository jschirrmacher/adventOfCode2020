import readInput from "../lib/fileReader"

export type Rule = string

export type Input = {
  rules: Rule[]
  messages: string[]
}

export function parse(input: string): Input {
  const parts = input.split('\n\n')
  const rules = [] as string[]
  parts[0].split('\n').map(line => line.split(': ')).forEach(([no, value]) => {
    rules[+no] = value
  })
  const messages = parts[1].split('\n')
  return { rules, messages }
}

export function validate(node: Node, message: string, indent = ''): number {
  console.log(indent, node, message)
  const len = message.length
  let result = 0
  if (typeof node === 'string') {
    result = message[0] === node ? 1 : 0
  } else if (node.alternatives) {
    result = node.alternatives.some(alternative => validate(alternative, message, indent + ' ')) ? len : 0
  } else if (node.list) {
    let pos = 0
    const lengths = node.list.map(node => {
      const subLen = validate(node, message.substr(pos), indent + ' ')
      pos += subLen
      return subLen
    })
    result = lengths.some(l => !l) ? 0 : pos
  }
  console.log(indent, '->', result)
  return result
}

type Node = string | {
  list?: Node[]
  alternatives?: Node[]
}

export function buildTree(rules: Rule[], ruleNo = 0): Node {
  const getList = (rule: string) => rule.trim().split(' ').map(ruleNo => buildTree(rules, +ruleNo))
  const rule = rules[ruleNo]
  const matches = rule.match(/^"(.)"$/)
  if (matches) {
    return matches[1]
  }
  const variants = rule.split('|')
  if (variants.length > 1) {
    return { alternatives: variants.map(variant => ({ list: getList(variant) })) }
  } else {
    return { list: getList(rule) }
  }
}

export function solveA(input: Input): number {
  const tree = buildTree(input.rules)
  return input.messages.filter(message => validate(tree, message)).length
}

export function run(): string {
  const input = parse(readInput(line => line).join('\n'))
  return '19a: ' + solveA(input)
}