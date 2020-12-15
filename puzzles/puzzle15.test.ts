import 'should'
import { run, solveA, solveB } from './puzzle15'

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

  it('should solve part B', () => {
    solveB([0, 3, 6]).should.equal(175594)
    solveB([1, 3, 2]).should.equal(2578)
    solveB([2, 1, 3]).should.equal(3544142)
    solveB([1, 2, 3]).should.equal(261214)
    solveB([2, 3, 1]).should.equal(6895259)
    solveB([3, 2, 1]).should.equal(18)
    solveB([3, 1, 2]).should.equal(362)
  })

  it('should return the results', () => {
    run().should.match(/15a: \d+\n15b: \d+x/)
  })
})
