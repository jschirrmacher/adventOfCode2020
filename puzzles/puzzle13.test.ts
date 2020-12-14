import 'should'
import { run, solveA, solveB } from './puzzle13'

describe('Puzzle 13', () => {
  it('should solve part A', () => {
    solveA(939, '7,13,x,x,59,x,31,19').should.equal(295)
  })

  it('should solve part B', () => {
    solveB('7,13,x,x,59,x,31,19').should.equal(1068781)
    solveB('17,x,13,19').should.equal(3417)
    solveB('67,7,59,61').should.equal(754018)
    solveB('67,x,7,59,61').should.equal(779210)
    solveB('67,7,x,59,61').should.equal(1261476)
    solveB('1789,37,47,1889').should.equal(1202161486)
  })

  it('should return the results', () => {
    run().should.match(/13a: \d+\n13b: \d+/)
  })
})
