import 'should'
import { run, solveA, solveB, } from './puzzle3'

const testData = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`

const forrest = testData.split('\n')

describe('Puzzle 3', () => {
  it('should solve test data for puzzla 3a', () => {
    solveA(forrest).should.equal(7)
  })

  it('should solve test data for puzzle 3b', () => {
    solveB(forrest).should.equal(336)
  })

  it('should return the results', () => {
    run().should.match(/3a: \d+\n3b: \d+/)
  })
})