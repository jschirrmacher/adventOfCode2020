import 'should'
import { doCycle, makeCubes, solveA, Cubes, Coordinate, exists, addCoordinates, neighbors } from './puzzle17'

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
  const min = (field: number): number => cubes.length && cubes.reduce((min, c) => Math.min(min, c[field]), Number.MAX_SAFE_INTEGER)
  const max = (field: number): number => cubes.length && cubes.reduce((max, c) => Math.max(max, c[field]), Number.MIN_SAFE_INTEGER)
  const size = (field: number): number => max(field) - min(field) + 1
  const empty = (field: number, fill: unknown): unknown[] => {
    const arr = Array(size(field)).fill(JSON.stringify(fill))
    return JSON.parse('[' + arr.join(',') + ']')
  }

  const matrix = empty(2, empty(1, empty(0, '.'))) as string[][][]
  cubes.forEach(cube => {
    const z = cube[2] - min(2)
    const y = cube[1] - min(1)
    const x = cube[0] - min(0)
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
    exists(cubes, [ -1, -1, 0 ]).should.be.false()
    exists(cubes, [ 0, 0, 0 ]).should.be.false()
    exists(cubes, [ 2, 1, 0 ]).should.be.true()
    exists(cubes, [ 1, 0, 0 ]).should.be.true()
  })

  it('should add coordinates', () => {
    addCoordinates([ 2, 1, 0 ], [ -1, 2, 0 ]).should.deepEqual([ 1, 3, 0 ])
  })

  it('should find neighbors', () => {
    const cubes = makeCubes(testData)
    neighbors(cubes, [ 2, 1, 0 ]).should.deepEqual([[ 1, 0, 0 ], [ 1, 2, 0 ], [ 2, 2, 0 ]])
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
})
