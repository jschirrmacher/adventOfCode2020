import 'should'
import { run, solveA } from './puzzle14'

const testData = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`.split('\n')

describe('Puzzle 14', () => {
  it('should solve part A', () => {
    solveA(testData).should.equal(165)
  })

  it('should return the results', () => {
    run().should.match(/14a: \d+/)
  })
})
