import 'should'
import { parseCommand, run, solveA, solveB } from './puzzle12'

const testData = `F10
N3
F7
R90
F11`.split('\n')

describe('Puzzle 12', () => {
  it('should solve part A', () => {
    solveA(testData.map(parseCommand)).should.equal(25)
  })

  it('should solve part B', () => {
    solveB(testData.map(parseCommand)).should.equal(286)
  })

  it('should return the results', () => {
    run().should.match(/12a: \d+\n12b: \d+/)
  })
})
