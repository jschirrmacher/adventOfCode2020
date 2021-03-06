import readInput from "../lib/fileReader"

export function tokenize(str: string): string[] {
  return str.replace(/\s*([\(\)])\s*/g, ' $1 ').trim().split(/\s+/)
}

export function evaluate(tokens: string[], precedence: Record<string, number>): number {
  const operators = [] as string[]
  const operands = [] as number[]

  function consume(): void {
    if (operators[operators.length - 1] === '(') {
      return
    }
    const op = operators.pop()
    const lhs = operands.pop() as number
    const rhs = operands.pop() as number
    if (op === '+') {
      operands.push(lhs + rhs)
    } else if (op === '*') {
      operands.push(lhs * rhs)
    } else {
      throw Error('Unknown operator "' + op + '"')
    }
  }

  let token
  while ((token = tokens.shift())) {
    switch (token) {
      case '+':
      case '*':
        if (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
          consume()
        }
        operators.push(token)
        break

      case '(':
        operators.push(token)
        break
        
      case ')':
        while (operators[operators.length - 1] !== '(') {
          consume()
        }
        operators.pop()
        break

      default:
        operands.push(parseInt(token))
    }
  }
  while (operators.length) {
    consume()
  }
  return operands.pop() as number
}

export function calculate(input: string): number {
  const tokens = tokenize(input)
  return evaluate(tokens, { '*': 1, '+': 1, '(': 3 })
}

export function calculateB(input: string): number {
  const tokens = tokenize(input)
  return evaluate(tokens, { '*': 1, '+': 2, '(': 3 })
}

export function solveA(input: string[]): number {
  return input.map(calculate).reduce((sum, current) => sum + current)
}

export function solveB(input: string[]): number {
  return input.map(calculateB).reduce((sum, current) => sum + current)
}

export function run(): string {
  const input = readInput(line => line)
  return '18a: ' + solveA(input) + '\n18b: ' + solveB(input)
}
