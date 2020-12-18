import readInput from "../lib/fileReader"

export type Coordinate = number[]

export type Cubes = Coordinate[]

const surrounding = [] as Coordinate[]
[-1, 0, 1].forEach(x => {
  [-1, 0, 1].forEach(y => {
    [-1, 0, 1].forEach(z => {
      if (x || y || z) {
        surrounding.push([ x, y, z ] as Coordinate)
      }
    })
  })
})

export function addCoordinates(coord1: Coordinate, coord2: Coordinate): Coordinate {
  return [ +coord1[0] + coord2[0], +coord1[1] + coord2[1], +coord1[2] + coord2[2] ]
}

export function exists(cubes: Cubes, coordinate: Coordinate): boolean {
  return cubes.findIndex(cube => cube[0] === coordinate[0] && cube[1] === coordinate[1] && cube[2] === coordinate[2]) !== -1
}

export function neighbors(cubes: Cubes, cube: Coordinate): Coordinate[] {
  return surrounding
    .map(c => addCoordinates(c, cube))
    .filter(c => exists(cubes, c))
}

export function doCycle(cubes: Cubes): Cubes {
  const newActive = [] as Coordinate[]
  const staysActive = cubes.filter(cube => {
    const directNeighbors = surrounding.map(c => addCoordinates(c, cube))
    directNeighbors.filter(c => neighbors(cubes, c).length === 3).forEach(c => newActive.push(c))
    return [2, 3].includes(directNeighbors.filter(c => exists(cubes, c)).length)
  })
  return [ ...staysActive, ...newActive ]
}

export function makeCubes(startFlatRegion: string[]): Cubes {
  const cubes = [] as Cubes

  startFlatRegion.forEach((row, y) => {
    row.split('').forEach((cube, x) => {
      if (cube === '#') {
        cubes.push([ x, y, 0 ])
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
  return cubes.length
}

export function run(): string {
  const input = readInput(line => line)
  return '17a: ' + solveA(input)
}