import 'should'
import { applyMask, run, solveA, solveB } from './puzzle14'

const testData = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`.split('\n')

const testDataB = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`.split('\n')

describe('Puzzle 14', () => {
  it('should solve part A', () => {
    solveA(testData).should.equal(165)
  })

  it('should apply an address mask', () => {
    applyMask('101010', 'X1001X').should.equal('X1101X')
  })

  it('should solve part B', () => {
    solveB(testDataB).should.equal(208)
  })

  it('should return the results', () => {
    run().should.match(/14a: \d+\n14b: \d+/)
  })
})
