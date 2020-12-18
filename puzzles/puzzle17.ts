import readInput from "../lib/fileReader"

export type Coordinate = string

export type Cubes = {
  dimensions: number,
  active: Set<string>,
}

export function createCoordinate(...parts: number[]): Coordinate {
  return parts.join(' ') + (parts.length === 3 ? ' 0' : '')
}

const surrounding = [] as Coordinate[]
[-1, 0, 1].forEach(x => {
  [-1, 0, 1].forEach(y => {
    [-1, 0, 1].forEach(z => {
      [-1, 0, 1].forEach(w => {
        if (x || y || z || w) {
          surrounding.push(createCoordinate(x, y, z, w))
        }
      })
    })
  })
})

function dimension(dim: number) {
  if (dim === 4) {
    return (coord: Coordinate) => coord
  }
  return (coord: Coordinate) => coord.split(' ')[3] === '0'
}

export function addCoordinates(coord1: Coordinate, coord2: Coordinate): Coordinate {
  const one = coord1.split(' ').map(Number)
  const two = coord2.split(' ').map(Number)
  return createCoordinate(...one.map((p, i) => p + two[i]))
}

export function exists(cubes: Cubes, coordinate: Coordinate): boolean {
  return cubes.active.has(coordinate)
}

export function neighbors(cubes: Cubes, cube: Coordinate): Coordinate[] {
  return surrounding.filter(dimension(cubes.dimensions))
    .map(c => addCoordinates(c, cube))
    .filter(c => exists(cubes, c))
}

export function doCycle(cubes: Cubes): Cubes {
  const newActive = [] as Coordinate[]
  const staysActive = [...cubes.active].filter(cube => {
    const directNeighbors = surrounding.filter(dimension(cubes.dimensions)).map(c => addCoordinates(c, cube))
    directNeighbors.filter(c => neighbors(cubes, c).length === 3).forEach(c => newActive.push(c))
    return [2, 3].includes(directNeighbors.filter(c => exists(cubes, c)).length)
  })
  return {
    dimensions: cubes.dimensions,
    active: new Set([ ...staysActive, ...newActive ])
  }
}

export function makeCubes(startFlatRegion: string[], dimensions: number): Cubes {
  const cubes = {
    dimensions,
    active: new Set()
  } as Cubes

  startFlatRegion.forEach((row, y) => {
    row.split('').forEach((cube, x) => {
      if (cube === '#') {
        cubes.active.add(createCoordinate(x, y, 0))
      }
    })
  })

  return cubes
}

export function solveA(startFlatRegion: string[]): number {
  let cubes = makeCubes(startFlatRegion, 3)
  for (let i=0; i < 6; i++) {
    cubes = doCycle(cubes)
  }
  return cubes.active.size
}

export function solveB(startFlatRegion: string[]): number {
  let cubes = makeCubes(startFlatRegion, 4)
  for (let i=0; i < 6; i++) {
    cubes = doCycle(cubes)
  }
  return cubes.active.size
}

export function run(): string {
  const input = readInput(line => line)
  return '17a: ' + solveA(input) + '\n17b: ' + solveB(input)
}