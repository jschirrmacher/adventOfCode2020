import 'should'
import { run, solveA, doRound } from './puzzle11'

const testData = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`.split('\n')

const expectedAfterRounds = [
  `#.##.##.##
  #######.##
  #.#.#..#..
  ####.##.##
  #.##.##.##
  #.#####.##
  ..#.#.....
  ##########
  #.######.#
  #.#####.##`,
  `#.LL.L#.##
  #LLLLLL.L#
  L.L.L..L..
  #LLL.LL.L#
  #.LL.LL.LL
  #.LLLL#.##
  ..L.L.....
  #LLLLLLLL#
  #.LLLLLL.L
  #.#LLLL.##`,
  `#.##.L#.##
  #L###LL.L#
  L.#.#..#..
  #L##.##.L#
  #.##.LL.LL
  #.###L#.##
  ..#.#.....
  #L######L#
  #.LL###L.L
  #.#L###.##`,
  `#.#L.L#.##
  #LLL#LL.L#
  L.L.L..#..
  #LLL.##.L#
  #.LL.LL.LL
  #.LL#L#.##
  ..L.L.....
  #L#LLLL#L#
  #.LLLLLL.L
  #.#L#L#.##`,
  `#.#L.L#.##
  #LLL#LL.L#
  L.#.L..#..
  #L##.##.L#
  #.#L.LL.LL
  #.#L#L#.##
  ..L.L.....
  #L#L##L#L#
  #.LLLLLL.L
  #.#L#L#.##`
].map(s => s.split('\n').map(r => r.trim()).join(''))

describe('Puzzle 11', () => {
  it('should match expected seat occupations', () => {
    let seats = testData.join('')
    expectedAfterRounds.forEach(expected => {
      const newSeats = doRound(seats, 10, 10)
      newSeats.should.deepEqual(expected)
      seats = newSeats
    })
  })

  it('should solve part A', () => {
    solveA(testData).should.equal(37)
  })

  it('should output the result', () => {
    run().should.match(/11a: \d+\n/)
  })
})

