import readInput from "../lib/fileReader"

type MatchState = { matched: string; rest: string }
type Matcher = (message: string) => string[]
export type Input = {
  rules: Matcher[]
  messages: string[]
}

export function parse(input: string[]): Input {
  const rules = [] as Matcher[]
  const messages = [] as string[]
  const resultCache = {} as Record<string, string[]>
  const ruleCache = [] as Array<Matcher>

  function parseRule(rule: string, ruleIndex: number): Matcher {
    function getCharMatcher(char: string): Matcher {
      return (message: string) => message.startsWith(char) ? [char] : []
    }

    function getRuleMatcher(parsedRule: number[][]): Matcher {
      return (message: string) => {
        const key = ruleIndex + '-' + message
        if ('undefined' === typeof resultCache[key]) {
          resultCache[key] = parsedRule.flatMap((list) => {
            let matchStates: MatchState[] = [{ matched: '', rest: message }]
  
            for (const ruleId of list) {
              matchStates = matchStates.flatMap(({ matched, rest }) => {
                return ruleCache[ruleId](rest).map(part => ({
                  matched: matched + part,
                  rest: rest.replace(part, '')
                }))
              })
            }
  
            return matchStates.map(m => m.matched)
          })
        }
        return resultCache[key]
      }
    }

    if (!ruleCache[ruleIndex]) {
      if (rule.match(/^"(.)"$/)) {
        ruleCache[ruleIndex] = getCharMatcher(RegExp.$1)
      } else {
        const parsedRule = rule
          .split('|')
          .map(part => part.trim().split(' ').map(Number))
        ruleCache[ruleIndex] = getRuleMatcher(parsedRule)
      }
    }
    return ruleCache[ruleIndex]
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
  return input.rules[0](message).includes(message)
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