import readInput from "../lib/fileReader"

export type Coordinate = string

export type Cubes = Set<string>

export function createCoordinate(x: number, y: number, z: number): Coordinate {
  return x + ' ' + y + ' ' + z
}

const surrounding = [] as Coordinate[]
[-1, 0, 1].forEach(x => {
  [-1, 0, 1].forEach(y => {
    [-1, 0, 1].forEach(z => {
      if (x || y || z) {
        surrounding.push(createCoordinate(x, y, z))
      }
    })
  })
})

export function addCoordinates(coord1: Coordinate, coord2: Coordinate): Coordinate {
  const [ x1, y1, z1 ] = coord1.split(' ').map(Number)
  const [ x2, y2, z2 ] = coord2.split(' ').map(Number)
  return createCoordinate(x1 + x2, y1 + y2, z1 + z2)
}

export function exists(cubes: Cubes, coordinate: Coordinate): boolean {
  return cubes.has(coordinate)
}

export function neighbors(cubes: Cubes, cube: Coordinate): Coordinate[] {
  return surrounding
    .map(c => addCoordinates(c, cube))
    .filter(c => exists(cubes, c))
}

export function doCycle(cubes: Cubes): Cubes {
  const newActive = [] as Coordinate[]
  const staysActive = [...cubes].filter(cube => {
    const directNeighbors = surrounding.map(c => addCoordinates(c, cube))
    directNeighbors.filter(c => neighbors(cubes, c).length === 3).forEach(c => newActive.push(c))
    return [2, 3].includes(directNeighbors.filter(c => exists(cubes, c)).length)
  })
  return new Set([ ...staysActive, ...newActive ])
}

export function makeCubes(startFlatRegion: string[]): Cubes {
  const cubes = new Set() as Cubes

  startFlatRegion.forEach((row, y) => {
    row.split('').forEach((cube, x) => {
      if (cube === '#') {
        cubes.add(createCoordinate(x, y, 0))
      }
    })
  })

  return cubes
}

export function solveA(startFlatRegion: string[]): number {
  let cubes = makeCubes(startFlatRegion)
  for (let i=0; i < 6; i++) {
    cubes = doCycle(cubes)
  }
  return [...cubes].length
}

export function run(): string {
  const input = readInput(line => line)
  return '17a: ' + solveA(input)
}