import 'should'
import { run, doCycle, makeCubes, solveA, Cubes, createCoordinate, exists, addCoordinates, neighbors } from './puzzle17'

const testData = `.#.
..#
###`.split('\n')

const expectedAt1Cycle = `#..
..#
.#.

#.#
.##
.#.

#..
..#
.#.`

const expectedAt2Cycles = `.....
.....
..#..
.....
.....

..#..
.#..#
....#
.#...
.....

##...
##...
#....
....#
.###.

..#..
.#..#
....#
.#...
.....

.....
.....
..#..
.....
.....`

const expectedAt3Cycles = `.......
.......
..##...
..###..
.......
.......
.......

..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

...#...
.......
#......
.......
.....##
.##.#..
...#...

..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

.......
.......
..##...
..###..
.......
.......
.......`

function stringify(cubes: Cubes): string {
  const min = (field: number): number => [...cubes].length && [...cubes].reduce((min, c) => Math.min(min, +c.split(' ')[field]), Number.MAX_SAFE_INTEGER)
  const max = (field: number): number => [...cubes].length && [...cubes].reduce((max, c) => Math.max(max, +c.split(' ')[field]), Number.MIN_SAFE_INTEGER)
  const size = (field: number): number => max(field) - min(field) + 1
  const empty = (field: number, fill: unknown): unknown[] => {
    const arr = Array(size(field)).fill(JSON.stringify(fill))
    return JSON.parse('[' + arr.join(',') + ']')
  }

  const matrix = empty(2, empty(1, empty(0, '.'))) as string[][][]
  const origin = createCoordinate(-min(0), -min(1), -min(2))
  cubes.forEach(cube => {
    const [x, y, z] = addCoordinates(cube, origin).split(' ').map(Number)
    try {
      matrix[z][y][x] = '#'
    } catch (error) {
      debugger
    }
  })
  return matrix.map(tier => tier.map(row => row.join('')).join('\n')).join('\n\n')
}

describe('Puzzle 17', () => {
  it('should generate the data structure', () => {
    stringify(makeCubes(testData)).should.equal(testData.join('\n'))
  })

  it('should identify existing cubes', () => {
    const cubes = makeCubes(testData)
    exists(cubes, createCoordinate(-1, -1, 0)).should.be.false()
    exists(cubes, createCoordinate(0, 0, 0)).should.be.false()
    exists(cubes, createCoordinate(2, 1, 0)).should.be.true()
    exists(cubes, createCoordinate(1, 0, 0)).should.be.true()
  })

  it('should add coordinates', () => {
    addCoordinates(createCoordinate(2, 1, 0), createCoordinate(-1, 2, 0)).should.deepEqual(createCoordinate(1, 3, 0))
  })

  it('should find neighbors', () => {
    const cubes = makeCubes(testData)
    neighbors(cubes, createCoordinate(2, 1, 0)).should.deepEqual([createCoordinate(1, 0, 0), createCoordinate(1, 2, 0), createCoordinate(2, 2, 0)])
  })

  it('should do 1 cycle', () => {
    stringify(doCycle(makeCubes(testData))).should.equal(expectedAt1Cycle)
  })

  it('should do 2 cycles', () => {
    stringify(doCycle(doCycle(makeCubes(testData)))).should.equal(expectedAt2Cycles)
  })

  it('should do 3 cycles', () => {
    stringify(doCycle(doCycle(doCycle(makeCubes(testData))))).should.equal(expectedAt3Cycles)
  })

  it('should solve part A', () => {
    solveA(testData).should.equal(112)
  })

  it('should return the result', () => {
    run().should.match(/17a: \d+/)
  })
})
