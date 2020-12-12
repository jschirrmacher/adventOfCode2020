import 'should'
import { run, solveA, solveB } from './puzzle10'

const testData = [ 16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4 ]
const testData2 = [ 28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24, 23, 49, 45, 19, 38, 39, 11, 1, 32, 25, 35, 8, 17, 7, 9, 4, 2, 34, 10, 3 ]

describe('Puzzle 10', () => {
  it('should return the result', () => {
    run().should.match(/10a: \d+\n10b: \d+/)
  })

  it('should solve part A', () => {
    solveA(testData).should.equal(35)
    solveA(testData2).should.equal(220)
  })

  it('should solve part B', () => {
    solveB(testData).should.equal(8)
    solveB(testData2).should.equal(19208)
  })
})