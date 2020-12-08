import 'should'
import { run, solveA, solveB, Instruction, parseInstruction } from './puzzle8'

const testInstructions = [
  { op: 'nop', val: +0 },
  { op: 'acc', val: +1 },
  { op: 'jmp', val: +4 },
  { op: 'acc', val: +3 },
  { op: 'jmp', val: -3 },
  { op: 'acc', val: -99 },
  { op: 'acc', val: +1 },
  { op: 'jmp', val: -4 },
  { op: 'acc', val: +6 }
] as Instruction[]

describe('Puzzle 8', () => {
  it('should parse operations and values', () => {
    parseInstruction('nop +0').should.deepEqual({ op: 'nop', val: 0 })
    parseInstruction('jmp +3').should.deepEqual({ op: 'jmp', val: 3 })
    parseInstruction('acc -5').should.deepEqual({ op: 'acc', val: -5 })
  })

  it('should solve test data for puzzla 8a', () => {
    solveA(testInstructions).should.equal(5)
  })

  it('should terminate correctly with an accumulator value of 8', () => {
    solveB(testInstructions).should.equal(8)
  })

  it('should return the results', () => {
    run().should.match(/8a: \d+\n8b: \d+/)
  })
})