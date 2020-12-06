import 'should'
import { run, solve, solveGroup } from './puzzle6'

const testData = [
  { input: [ 'abc' ], expected: { a: 3 } },
  { input: [ 'a', 'b', 'c' ], expected: { a: 3 } },
  { input: [ 'ab', 'ac' ], expected: { a: 3 } },
  { input: [ 'a', 'a', 'a', 'a' ], expected: { a: 1 } },
  { input: [ 'b' ], expected: { a: 1 } },
]

describe('puzzle 6a', () => {
  it('should count answers in each group', () => {
    testData.forEach(group => {
      solveGroup(group.input).should.equal(group.expected.a)
    })
  })

  it('should solve the puzzle 6a with test data', () => {
    solve(testData.map(d => d.input)).should.equal(11)
  })

  it('should return the result', () => {
    run().should.match(/6a: \d+/)
  })
})
