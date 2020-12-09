import 'should'
import { run, solveA, solveB } from './puzzle9'

const testData = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`.split('\n').map(Number)

describe('Puzzle 9', () => {
  it('should solve test data for part a', () => {
    solveA(testData, 5).should.equal(127)
  })

  it('should solve part b', () => {
    solveB(testData, 127).should.equal(62)
  })

  it('should return the results', () => {
    run().should.match(/9a: \d+\n9b: \d+/)
  })
})
