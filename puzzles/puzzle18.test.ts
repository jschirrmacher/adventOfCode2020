import 'should'
import { calculate, run, solveA, tokenize } from './puzzle18'

const testData = {
  '1 + 2 * 3 + 4 * 5 + 6': 71,
  '1 + (2 * 3) + (4 * (5 + 6))': 51,
  '2 * 3 + (4 * 5)': 26,
  '5 + (8 * 3 + 9 + 3 * 4 * 3)': 437,
  '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))': 12240,
  '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2': 13632
}

describe('Puzzle 18', () => {
  it('should tokenize test data', () => {
    tokenize(Object.keys(testData)[0]).should.deepEqual(['1', '+', '2', '*', '3', '+', '4', '*', '5', '+', '6'])
    tokenize(Object.keys(testData)[2]).should.deepEqual(['2', '*', '3', '+', '(', '4', '*', '5', ')'])
  })

  it('should calculate scalar values', () => {
    calculate('42').should.equal(42)
  })

  it('should calculate simple terms', () => {
    calculate('5 + 3').should.equal(8)
  })

  it('should calculate chains of terms', () => {
    calculate('1 + 2 + 3').should.equal(6)
  })

  it('should multiply', () => {
    calculate('2 * 3').should.equal(6)
  })

  it('should calculate step by step', () => {
    calculate('1').should.equal(1)
    calculate('1 + 2').should.equal(3)
    calculate('1 + 2 * 3').should.equal(9)
    calculate('1 + 2 * 3 + 4').should.equal(13)
    calculate('1 + 2 * 3 + 4 * 5').should.equal(65)
  })

  it('should handle parens', () => {
    calculate('1 + (2 * 3)').should.equal(7)
  })

  Object.entries(testData).forEach(([input, expected], index) => {
    it('should calculate test data #' + index, () => {
      calculate(input).should.equal(expected)
    })
  })

  it('should solve part A', () => {
    solveA(Object.keys(testData)).should.equal(Object.values(testData).reduce((sum, val) => sum + val))
  })

  it('should return the result', () => {
    run().should.match(/^18a: \d/)
  })
})
