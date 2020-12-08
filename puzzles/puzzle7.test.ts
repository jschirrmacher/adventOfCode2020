import 'should'
import { lineParser, run, Rules, solveA, solveB } from './puzzle7'

const testData = [
  'light red bags contain 1 bright white bag, 2 muted yellow bags.',
  'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
  'bright white bags contain 1 shiny gold bag.',
  'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
  'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
  'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
  'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
  'faded blue bags contain no other bags.',
  'dotted black bags contain no other bags.'
]

const expected = {
  'light red': { 'bright white': 1, 'muted yellow': 2 },
  'dark orange': { 'bright white': 3, 'muted yellow': 4 },
  'bright white': { 'shiny gold': 1 },
  'muted yellow': { 'shiny gold': 2, 'faded blue': 9 },
  'shiny gold': { 'dark olive': 1, 'vibrant plum': 2 },
  'dark olive': { 'faded blue': 3, 'dotted black': 4 },
  'vibrant plum': { 'faded blue': 5, 'dotted black': 6 },
  'faded blue': {},
  'dotted black': {}
} as Rules

describe('puzzle 7', () => {
  it('should parse input lines', () => {
    testData.forEach(line => {
      const result = lineParser(line)
      expected.should.containDeep(result)
    })
  })

  it('should solve test data for puzzla 7a', () => {
    solveA(Object.assign({}, ...testData.map(lineParser))).should.equal(4)
  })

  it('should solve test data for puzzle 7b', () => {
    solveB(expected).should.equal(32)
  })

  it('should return the results', () => {
    run().should.match(/7a: \d+\n7b: \d+/)
  })
})
