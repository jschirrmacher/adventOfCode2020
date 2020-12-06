import 'should'
import { solve, solveSingle, decode, findMissing, run } from './puzzle5'

const testData = [
  {input: 'FBFBBFFRLR', result: { row: 44, col: 5, ID: 357 }},
  {input: 'BFFFBBFRRR', result: { row: 70, col: 7, ID: 567 }},
  {input: 'FFFBBBFRRR', result: { row: 14, col: 7, ID: 119 }},
  {input: 'BBFFBBFRLL', result: { row: 102, col: 4, ID: 820 }},
]

describe('puzzle 5a', () => {
  testData.forEach(entry => {
    it('should find the row for ' + entry.input, () => {
      solveSingle(entry.input).row.should.equal(entry.result.row)
    })

    it('should find the col for ' + entry.input, () => {
      solveSingle(entry.input).col.should.equal(entry.result.col)
    })

    it('should find the ID for ' + entry.input, () => {
      solveSingle(entry.input).ID.should.equal(entry.result.ID)
    })
  })

  it('should find the maximum ID', () => {
    solve(decode(testData.map(e => e.input))).should.equal(820)
  })

  it('should find the missing seat', () => {
    findMissing([46, 47, 48, 50, 51]).should.equal(49)
  })

  it('should return the result', () => {
    run().should.match(/5a: \d+\n5b: \d+/)
  })
})
