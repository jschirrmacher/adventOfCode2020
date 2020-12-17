import 'should'
import readInput from '../lib/fileReader'
import { findFieldMapping, parse, run, solveA, getErrorRate, getValidTickets } from './puzzle16'

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

const input2 = parse(`class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
`.split('\n'))

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

  it('should find valid tickets', () => {
    const input = parse(readInput(line => line))
    const validTickets = getValidTickets(input.rules, input.nearby)
    validTickets.length.should.equal(190)
  })

  it('should find the field mapping', () => {
    const validTickets = input2.nearby.filter(ticket => getErrorRate(input2.rules, ticket) === 0)
    findFieldMapping(input2.rules, validTickets).should.deepEqual([
      { name: 'row', no: 0 },
      { name: 'class', no: 1 },
      { name: 'seat', no: 2 }
    ])
  })

  it('should return the result', () => {
    run().should.match(/16a: \d+\n16b: \d+/)
  })
})
