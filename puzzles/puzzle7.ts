import readInput from "../lib/fileReader"

export type Rule = Record<string, number>
export type Rules = Record<string, Rule>

function ruleParser(components: string[]): Rule {
  if (components.length === 1 && components[0] === 'no other bags') {
    return {} as Rule
  }
  return Object.assign({}, ...components
    .map(m => m.match(/(\d+) (.*) bags?/) as string[])
    .map(m => ({ [m[2]]: +m[1] }))
  )
}

export function lineParser(line: string): Rules {
  const matches = line.match(/^(\w+\s\w+) bags contain (.*).$/) as string[]
  const bag = matches[1] as string
  const list = matches[2].match(/(((\d+ (\w+\s\w+))|no other) bags?)+/g) as string[]
  return { [bag]: ruleParser(list) } as Rules
}

function reverseRules(rules: Rules) {
  const reverse = {} as Record<string, Record<string, boolean>>
  Object.keys(rules).forEach(bag => {
    Object.keys(rules[bag]).forEach(sub => {
      reverse[sub] = reverse[sub] || {} as Record<string, boolean>
      if (!reverse[sub][bag]) {
        reverse[sub][bag] = true
      }
    })
  })
  return reverse
}

function traverse(tree: Record<string, Record<string, boolean>>, bag: string): string[] {
  const subBags = Object.keys(tree[bag] || {})
  return subBags.concat(...subBags.map(sub => traverse(tree, sub)))
}

export function solveA(rules: Rules): number {
  const reverse = reverseRules(rules)
  const result = traverse(reverse, 'shiny gold').filter((x, i, a) => a.indexOf(x) == i)
  return result.length
}

function bagsInBag(rules: Rules, bag: string, indent = 0): number {
  console.debug(`${'  '.repeat(indent)}A ${bag} bag contains`)
  return Object.keys(rules[bag]).reduce((sum, sub) => {
    const result = sum + rules[bag][sub] * (1 + bagsInBag(rules, sub, indent + 1))
    return result
  }, 0)
}

export function solveB(rules: Rules): number {
  return bagsInBag(rules, 'shiny gold')
}

export function run(): string {
  const rules = Object.assign({}, ...readInput(lineParser))
  return '7a: ' + solveA(rules) + '\n7b: ' + solveB(rules)
}
