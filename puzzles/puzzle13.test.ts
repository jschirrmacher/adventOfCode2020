import 'should'
import { run, solveA } from './puzzle13'

describe('Puzzle 13', () => {
  it('should solve part A', () => {
    solveA(939, [ 7, 13, 59, 31, 19 ]).should.equal(295)
  })

  it('should return the results', () => {
    run().should.match(/13a: \d+/)
  })
})
