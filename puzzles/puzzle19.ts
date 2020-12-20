import readInput from "../lib/fileReader"

type MatchState = { matched: string; rest: string }
type MatcherResult = string[]
type Matcher = (message: string) => MatcherResult
export type Input = {
  rules: Matcher[]
  messages: string[]
}

export function parse(input: string[]): Input {
  const rules = [] as Matcher[]
  const messages = [] as string[]
  const cache = {} as Record<string, MatcherResult>

  function parseRule(rule: string, ruleIndex: number): Matcher {
    if (rule.match(/^"(.)"$/)) {
      const char = RegExp.$1
      return (message: string) => message.startsWith(char) ? [char] : []
    } else {
      return (message: string) => {
        const key = ruleIndex + '-' + message
        if (!cache[key]) {
          cache[key] = rule.split('|')
            .map(part => part.trim().split(' ').map((n) => parseInt(n)))
            .flatMap((list) => {
              let matchStates: MatchState[] = [{ matched: '', rest: message }]
    
              for (const ruleId of list) {
                matchStates = matchStates.flatMap(({ matched, rest }) => {
                  return rules[ruleId](rest).map(part => ({
                    matched: matched + part,
                    rest: rest.replace(part, '')
                  }))
                })
              }
    
              return matchStates.map(m => m.matched)
            })
        }
        return cache[key]
      }
    }
  }
    
  input.forEach(line => {
    const matches = line.match(/^(\d+):\s*(.*)$/)
    if (matches) {
      rules[+matches[1]] = parseRule(matches[2], +matches[1])
    } else if (line.trim() !== '') {
      messages.push(line)
    }
  })
  return { rules, messages }
}

export function isValid(input: Input, message: string): boolean {
  const result = input.rules[0](message)
  return result.length === 1 && result[0] === message
}

export function solve(input: Input): number {
  return input.messages.filter(message => isValid(input, message)).length
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