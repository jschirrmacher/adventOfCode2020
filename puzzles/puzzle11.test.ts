import 'should'
import { run, solveA, solveB, doRound, addBorder, mapBinary, occupiedSeatsAround } from './puzzle11'

const testData = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`.split('\n').map(mapBinary)

function prepareExpected(expected: string[]): string[] {
  return expected.map(s => addBorder(s.split('\n').map(r => mapBinary(r.trim()))).join(''))
}

const expectedAfterRounds = prepareExpected([
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
])

const expectedInPartB = prepareExpected([
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
  `#.LL.LL.L#
  #LLLLLL.LL
  L.L.L..L..
  LLLL.LL.LL
  L.LL.LL.LL
  L.LLLLL.LL
  ..L.L.....
  LLLLLLLLL#
  #.LLLLLL.L
  #.LLLLL.L#`,
  `#.L#.##.L#
  #L#####.LL
  L.#.#..#..
  ##L#.##.##
  #.##.#L.##
  #.#####.#L
  ..#.#.....
  LLL####LL#
  #.L#####.L
  #.L####.L#`,
  `#.L#.L#.L#
  #LLLLLL.LL
  L.L.L..#..
  ##LL.LL.L#
  L.LL.LL.L#
  #.LLLLL.LL
  ..L.L.....
  LLLLLLLLL#
  #.LLLLL#.L
  #.L#LL#.L#`,
  `#.L#.L#.L#
  #LLLLLL.LL
  L.L.L..#..
  ##L#.#L.L#
  L.L#.#L.L#
  #.L####.LL
  ..#.#.....
  LLL###LLL#
  #.LLLLL#.L
  #.L#LL#.L#`,
  `#.L#.L#.L#
  #LLLLLL.LL
  L.L.L..#..
  ##L#.#L.L#
  L.L#.LL.L#
  #.LLLL#.LL
  ..#.L.....
  LLL###LLL#
  #.LLLLL#.L
  #.L#LL#.L#`
])

describe('Puzzle 11', () => {
  it('should match expected seat occupations for part A', () => {
    let seats = addBorder(testData).join('')
    expectedAfterRounds.forEach(expected => {
      const newSeats = doRound(seats, 12)
      newSeats.should.deepEqual(expected)
      seats = newSeats
    })
  })

  it('should solve part A', () => {
    solveA(testData).should.equal(37)
  })

  it('should see eight occupied seats for thw first example of part B', () => {
    const seats = addBorder(`.......#.
    ...#.....
    .#.......
    .........
    ..#L....#
    ....#....
    .........
    #........
    ...#.....`.split('\n').map(r => mapBinary(r.trim()))).join('')

    occupiedSeatsAround(seats, 11, true, seats.split('').findIndex(seat => seat === '0')).should.equal(8)
  })

  it('should see no occupied seats for the second example of part B', () => {
    const seats = addBorder(`.............
    .L.L.#.#.#.#.
    .............`.split('\n').map(r => mapBinary(r.trim()))).join('')

    occupiedSeatsAround(seats, 14, true, seats.split('').findIndex(seat => seat === '0')).should.equal(0)
  })

  it('should see no occupied seats for the third example of part B', () => {
    const seats = addBorder(`.##.##.
    #.#.#.#
    ##...##
    ...L...
    ##...##
    #.#.#.#
    .##.##.`.split('\n').map(r => mapBinary(r.trim()))).join('')

    occupiedSeatsAround(seats, 9, true, seats.split('').findIndex(seat => seat === '0')).should.equal(0)
  })

  it('should match expected seat occupations for part B', () => {
    let seats = addBorder(testData).join('')
    expectedInPartB.forEach((expected) => {
      const newSeats = doRound(seats, 12, true)
      newSeats.should.deepEqual(expected)
      seats = newSeats
    })
  })

  it('should solve part B', () => {
    solveB(testData).should.equal(26)
  })

  it('should output the result', () => {
    run().should.match(/11a: \d+\n11b: \d+/)
  })
})

