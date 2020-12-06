import 'should'
import { run, solve, solver } from './puzzle6'

const testData = [
  { input: [ 'abc' ], expected: { a: 3, b: 3 } },
  { input: [ 'a', 'b', 'c' ], expected: { a: 3, b: 0 } },
  { input: [ 'ab', 'ac' ], expected: { a: 3, b: 1 } },
  { input: [ 'a', 'a', 'a', 'a' ], expected: { a: 1, b: 1 } },
  { input: [ 'b' ], expected: { a: 1, b: 1 } },
]

describe('puzzle 6a', () => {
  it('should count unique answers answered with "yes" in each group', () => {
    testData.forEach(group => {
      solver.a(group.input).should.equal(group.expected.a)
    })
  })

  it('should count questions which are all answered with "yes" in each group', () => {
    testData.forEach(group => {
      solver.b(group.input).should.equal(group.expected.b)
    })
  })

  it('should solve the puzzle 6a with test data', () => {
    solve(testData.map(d => d.input), 'a').should.equal(11)
  })

  it('should solve puzzle 6b with test data', () => {
    solve(testData.map(d => d.input), 'b').should.equal(6)
  })

  it('should return the results', () => {
    run().should.match(/6a: \d+\n6b: \d+/)
  })
})
