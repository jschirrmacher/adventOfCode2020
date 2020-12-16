import 'should'
import { parse, run, solveA } from './puzzle16'

const testData = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`.split('\n')

const input = parse(testData)

describe('Puzzle 16', () => {
  it('should parse testData correctly', () => {
    input.should.deepEqual({
      rules: [
        { name: 'class', ranges: [[ 1, 3 ],[ 5, 7 ]] },
        { name: 'row', ranges: [[ 6, 11 ],[ 33, 44 ]] },
        { name: 'seat', ranges: [[ 13, 40 ],[ 45, 50 ]] },
      ],
      yours: [ 7, 1, 14 ],
      nearby: [
        [ 7, 3, 47 ],
        [ 40, 4, 50 ],
        [ 55, 2, 20 ],
        [ 38, 6, 12 ],
      ]
    })
  })

  it('should solve part A', () => {
    solveA(input).should.equal(71)
  })

  it('should return the result', () => {
    run().should.match(/16a: \d+/)
  })
})
