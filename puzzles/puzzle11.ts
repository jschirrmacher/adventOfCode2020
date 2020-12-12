import readInput from "../lib/fileReader"

export type Seats = string[]

export function doRound(seats: string, rows: number, cols: number): string {
  function isValidSeat(row: number, col: number): boolean {
    return row >= 0 && row < rows && col >= 0 && col < cols
  }

  function countOccupied(row: number, col: number): number {
    return isValidSeat(row, col) && seats[row * rows + col] === '#' ? 1 : 0
  }

  function occupiedSeatsInRow(row: number, col: number, countMiddle = true): number {
    return (countMiddle ? countOccupied(row, col) : 0)
          + countOccupied(row, col - 1)
          + countOccupied(row, col + 1)
  }
  
  function occupiedSeatsAround(row: number, col: number): number {
    return occupiedSeatsInRow(row - 1, col)
         + occupiedSeatsInRow(row, col, false)
         + occupiedSeatsInRow(row + 1, col)
  }
  
  return seats.split('').map((seat, index) => {
    const occupied = occupiedSeatsAround(Math.floor(index / rows), index % rows)
    if (seat === 'L' && occupied === 0) {
      return '#'
    } else if (seat === '#' && occupied >= 4) {
      return 'L'
    }
    return seat
  }).join('')
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
