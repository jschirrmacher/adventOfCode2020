import readInput from "../lib/fileReader"

export type Rule = Matcher

export type Input = {
  rules: Rule[]
  messages: string[]
}

type MatcherResult = { matched: boolean, len: number }
type Matcher = (message: string) => MatcherResult

export function parse(input: string[]): Input {
  const rules = [] as Matcher[]
  const messages = [] as string[]
  const cache = {} as Record<string, MatcherResult>

  function parseRule(rule: string): Matcher {
    const matches = rule.match(/^"(.)"$/)
    if (matches) {
      return message => {
        return { matched: message.startsWith(matches[1]), len: 1 }
      }
    }
    const variants = rule.split('|').map(part => {
      return part.trim()
        .split(' ')
        .map(Number)
    })
  
    return message => {
      function listMatches(list: number[]): MatcherResult {
        return list.reduce((prev: MatcherResult, ruleId: number) => {
          return rules[ruleId](message.substr(prev.len))
        }, { matched: false, len: 0 })
      }
  
      for (const list of variants) {
        const result = listMatches(list)
        if (result.matched) {
          return result
        }
      }
      return { matched: false, len: 0 }
    }
  }
    
  input.forEach(line => {
    const matches = line.match(/^(\d+):\s*(.*)$/)
    if (matches) {
      rules[+matches[1]] = parseRule(matches[2])
    } else if (line.trim() !== '') {
      messages.push(line)
    }
  })
  return { rules, messages }
}

export function solve(input: Input): number {
  return input.messages.filter(message => input.rules[0](message).matched).length
}

export function parseB(input: string[]): Input {
  const modified = input
    .join('\n')
    .replace(/8: .*/, '8: 42 | 42 8')
    .replace(/11: .*/, '11: 42 31 | 42 11 31')
    .split('\n')
  return parse(modified)
}

export function run(): string {
  const input = readInput(line => line)
  return '19a: ' + solve(parse(input)) + '\n19b: ' + solve(parseB(input))
}