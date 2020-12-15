import 'should'
import { run, solveA, solveB } from './puzzle15'

const partBTestData = [
  { data: [0, 3, 6], expectedA: 436, expectedB: 175594 },
  { data: [1, 3, 2], expectedA: 1, expectedB: 2578 },
  { data: [2, 1, 3], expectedA: 10, expectedB: 3544142 },
  { data: [1, 2, 3], expectedA: 27, expectedB: 261214 },
  { data: [2, 3, 1], expectedA: 78, expectedB: 6895259 },
  { data: [3, 2, 1], expectedA: 438, expectedB: 18 },
  { data: [3, 1, 2], expectedA: 1836, expectedB: 362 },
]

describe('Puzzle 15', () => {
  partBTestData.forEach((testSet, index) => {
    it('should solve part A for data set #' + index, () => {
      solveA(testSet.data).should.equal(testSet.expectedA)
    })

    it('should solve part B for data set #' + index, () => {
      solveB(testSet.data).should.equal(testSet.expectedB)
    })
  })

  it('should return the results', () => {
    run().should.match(/15a: \d+\n15b: \d+/)
  })
})
