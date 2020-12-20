import 'should'
import { parse, buildTree, solveA, run } from './puzzle19'

const testData = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`

const parsed = parse(testData.split('\n'))
const tree = buildTree(parsed.rules)

describe('Puzzle 19', () => {
  it('should parse rules', () => {
    parsed.rules.should.deepEqual(['4 1 5', '2 3 | 3 2', '4 4 | 5 5', '4 5 | 5 4', '"a"', '"b"'])
  })

  it('should parse messages', () => {
    parsed.messages.should.deepEqual(['ababbb', 'bababa', 'abbbab', 'aaabbb', 'aaaabbb'])
  })

  it('should validate test data entries', () => {
    tree('ababbb').should.equal(6)
    tree('abbbab').should.equal(6)
    tree('bababa').should.not.equal(6)
    tree('aaabbb').should.not.equal(6)
    tree('aaaabbb').should.not.equal(7)
  })

  it('should solve part A', () => {
    solveA(parsed).should.equal(2)
  })

  it('should return the result', () => {
    run().should.match(/^19a: \d+/)
  })
})
