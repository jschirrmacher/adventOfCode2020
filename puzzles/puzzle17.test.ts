import 'should'
import { run, doCycle, makeCubes, solveA, Cubes, createCoordinate, exists, addCoordinates, neighbors, solveB } from './puzzle17'

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
  const min = (field: number): number => cubes.active.size && [...cubes.active].reduce((min, c) => Math.min(min, +c.split(' ')[field] || 0), Number.MAX_SAFE_INTEGER)
  const max = (field: number): number => cubes.active.size && [...cubes.active].reduce((max, c) => Math.max(max, +c.split(' ')[field] || 0), Number.MIN_SAFE_INTEGER)
  const size = (field: number): number => max(field) - min(field) + 1
  const empty = (field: number, fill: unknown): unknown[] => {
    try {
      if (field >= cubes.dimensions) {
        return [fill]
      }
      const arr = Array(size(field)).fill(JSON.stringify(fill))
      return JSON.parse('[' + arr.join(',') + ']')
    } catch (error) {
      debugger
      return []
    }
  }

  const matrix = empty(3, empty(2, empty(1, empty(0, '.')))) as string[][][][]
  const origin = createCoordinate(-min(0), -min(1), -min(2), -min(3))
  cubes.active.forEach(cube => {
    const [x, y, z, w] = addCoordinates(cube, origin).split(' ').map(Number)
    try {
      matrix[w][z][y][x] = '#'
    } catch (error) {
      debugger
    }
  })
  return matrix.map(space => space.map(tier => tier.map(row => row.join('')).join('\n')).join('\n\n')).join('\n\n')
}

describe('Puzzle 17', () => {
  it('should generate the data structure', () => {
    stringify(makeCubes(testData, 3)).should.equal(testData.join('\n'))
    stringify(makeCubes(testData, 4)).should.equal(testData.join('\n'))
  })

  it('should identify existing cubes', () => {
    const cubes = makeCubes(testData, 3)
    exists(cubes, createCoordinate(-1, -1, 0)).should.be.false()
    exists(cubes, createCoordinate(0, 0, 0)).should.be.false()
    exists(cubes, createCoordinate(2, 1, 0)).should.be.true()
    exists(cubes, createCoordinate(1, 0, 0)).should.be.true()
  })

  it('should add coordinates', () => {
    addCoordinates(createCoordinate(2, 1, 0), createCoordinate(-1, 2, 0)).should.deepEqual(createCoordinate(1, 3, 0, 0))
    addCoordinates(createCoordinate(2, 1, 0, -2), createCoordinate(-1, 2, 0, 1)).should.deepEqual(createCoordinate(1, 3, 0, -1))
  })

  it('should find neighbors', () => {
    const cubes = makeCubes(testData, 3)
    neighbors(cubes, createCoordinate(2, 1, 0)).should.deepEqual([createCoordinate(1, 0, 0), createCoordinate(1, 2, 0), createCoordinate(2, 2, 0)])
  })

  it('should do 1 cycle', () => {
    stringify(doCycle(makeCubes(testData, 3))).should.equal(expectedAt1Cycle)
  })

  it('should do 2 cycles', () => {
    stringify(doCycle(doCycle(makeCubes(testData, 3)))).should.equal(expectedAt2Cycles)
  })

  it('should do 3 cycles', () => {
    stringify(doCycle(doCycle(doCycle(makeCubes(testData, 3))))).should.equal(expectedAt3Cycles)
  })

  it('should solve part A', () => {
    solveA(testData).should.equal(112)
  })

  it('should solve part B', function () {
    this.timeout(30000)
    solveB(testData).should.equal(848)
  })

  it('should return the result', function () {
    this.timeout(80000)
    run().should.match(/17a: \d+\n17b: \d+/)
  })
})
