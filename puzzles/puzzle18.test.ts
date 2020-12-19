import 'should'
import { calculate, calculateB, run, solveA, solveB, tokenize } from './puzzle18'

const testData = {
  '1 + 2 * 3 + 4 * 5 + 6': [71, 231],
  '1 + (2 * 3) + (4 * (5 + 6))': [51, 51],
  '2 * 3 + (4 * 5)': [26, 46],
  '5 + (8 * 3 + 9 + 3 * 4 * 3)': [437, 1445],
  '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))': [12240, 669060],
  '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2': [13632, 23340]
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
      calculate(input).should.equal(expected[0])
    })
  })

  it('should solve part A', () => {
    const expected = Object.values(testData).map(d => d[0]).reduce((sum, val) => sum + val)
    solveA(Object.keys(testData)).should.equal(expected)
  })

  Object.entries(testData).forEach(([input, expected], index) => {
    it('should calculate test data #' + index + ' for part B', () => {
      calculateB(input).should.equal(expected[1])
    })
  })

  it('should solve part B', () => {
    const expected = Object.values(testData).map(d => d[1]).reduce((sum, val) => sum + val)
    solveB(Object.keys(testData)).should.equal(expected)
  })

  it('should return the result', () => {
    run().should.match(/^18a: \d+\n18b: \d+/)
  })
})
