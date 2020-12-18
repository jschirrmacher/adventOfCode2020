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
  const min = (field: keyof Coordinate): number => cubes.length && cubes.reduce((min, c) => Math.min(min, c[field]), Number.MAX_SAFE_INTEGER)
  const max = (field: keyof Coordinate): number => cubes.length && cubes.reduce((max, c) => Math.max(max, c[field]), Number.MIN_SAFE_INTEGER)
  const size = (field: keyof Coordinate): number => max(field) - min(field) + 1
  const empty = (field: keyof Coordinate, fill: unknown): unknown[] => {
    const arr = Array(size(field)).fill(JSON.stringify(fill))
    return JSON.parse('[' + arr.join(',') + ']')
  }

  const matrix = empty('z', empty('y', empty('x', '.'))) as string[][][]
  cubes.forEach(cube => {
    const z = cube.z - min('z')
    const y = cube.y - min('y')
    const x = cube.x - min('x')
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
    exists(cubes, { x: -1, y: -1, z: 0 }).should.be.false()
    exists(cubes, { x: 0, y: 0, z: 0 }).should.be.false()
    exists(cubes, { x: 2, y: 1, z: 0 }).should.be.true()
    exists(cubes, { x: 1, y: 0, z: 0 }).should.be.true()
  })

  it('should add coordinates', () => {
    addCoordinates({ x: 2, y: 1, z: 0 }, { x: -1, y: 2, z: 0 }).should.deepEqual({ x: 1, y: 3, z: 0 })
  })

  it('should find neighbors', () => {
    const cubes = makeCubes(testData)
    neighbors(cubes, { x: 2, y: 1, z: 0 }).should.deepEqual([
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 2, z: 0 },
      { x: 2, y: 2, z: 0 }
    ])
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
