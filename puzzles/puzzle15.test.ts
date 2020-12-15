import 'should'
import { run, solveA } from './puzzle15'

describe('Puzzle 15', () => {
  it('should solve part A', () => {
    solveA([0, 3, 6]).should.equal(436)
    solveA([1, 3, 2]).should.equal(1)
    solveA([2, 1, 3]).should.equal(10)
    solveA([1, 2, 3]).should.equal(27)
    solveA([2, 3, 1]).should.equal(78)
    solveA([3, 2, 1]).should.equal(438)
    solveA([3, 1, 2]).should.equal(1836)
  })

  it('should return the results', () => {
    run().should.match(/15a: \d+/)
  })
})
