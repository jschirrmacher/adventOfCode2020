import readInput from "../lib/fileReader"

export type Seats = string []

export function doRound(seats: string, rows: number, cols: number): string {
  function countOccupied(row: number, col: number): number {
    return seats[row * cols + col] === '#' ? 1 : 0
  }

  function occupiedSeatsInRow(row: number, col: number): number {
    return (col > 0 ? countOccupied(row, col - 1) : 0)
         + countOccupied(row, col)
         + (col < cols ? countOccupied(row, col + 1) : 0)
  }
  
  function occupiedSeatsAround(row: number, col: number): number {
    return (row > 0 ? occupiedSeatsInRow(row - 1, col) : 0)
         + (col > 0 ? countOccupied(row, col - 1) : 0)
         + (col < cols ? countOccupied(row, col + 1) : 0)
         + (row < rows ? occupiedSeatsInRow(row + 1, col) : 0)
  }
  
  return seats.replace(/[L#]/g, (seat, index) => {
    const occupied = occupiedSeatsAround(Math.floor(index / rows), index % rows)
    if (seat === 'L' && occupied === 0) {
      return '#'
    } else if (seat === '#' && occupied >= 4) {
      return 'L'
    }
    return seat
  })
}

function doRoundsUntilStable(seats: string, rows: number, cols: number): string {
  let newSeats: string = seats
  do {
    seats = newSeats
    newSeats = doRound(seats, rows, cols)
  } while (seats !== newSeats)
  return newSeats
}

export function solveA(input: string[]): number {
  const seats = doRoundsUntilStable(input.join(''), input.length, input[0].length)
  return (seats.match(/#/g) || []).length
}

export function run(): string {
  const input = readInput(line => line)
  return '11a: ' + solveA(input)
}
