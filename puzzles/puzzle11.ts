import readInput from "../lib/fileReader"

export type Seats = string []

export function doRound(seats: string, cols: number): string {
  function occupiedSeatsAround(index: number): number {
    return (+seats[index - cols - 1])
         + (+seats[index - cols])
         + (+seats[index - cols + 1])
         + (+seats[index - 1])
         + (+seats[index + 1])
         + (+seats[index + cols - 1])
         + (+seats[index + cols])
         + (+seats[index + cols + 1])
  }
  
  return seats.replace(/[01]/g, (seat, index) => {
    const occupied = occupiedSeatsAround(index)
    if (seat === '0' && occupied === 0) {
      return '1'
    } else if (seat === '1' && occupied >= 4) {
      return '0'
    }
    return seat
  })
}

function doRoundsUntilStable(seats: string, cols: number): string {
  let newSeats: string = seats
  do {
    seats = newSeats
    newSeats = doRound(seats, cols)
  } while (seats !== newSeats)
  return newSeats
}

export function addBorder(seats: string[]): string[] {
  const cols = seats[0].length + 2
  const emptyRow = ' '.repeat(cols)
  return [emptyRow, ...seats.map(row => ' ' + row + ' '), emptyRow]
}

export function solveA(input: string[]): number {
  const seats = doRoundsUntilStable(addBorder(input).join(''), input[0].length + 2)
  return (seats.match(/1/g) || []).length
}

export function mapBinary(row: string): string {
  const mapping = {
    '#': '1',
    'L': '0',
    '.': ' '
  }
  return row.replace(/./g, seat => mapping[seat as keyof typeof mapping])
}

export function run(): string {
  const input = readInput(line => mapBinary(line))
  return '11a: ' + solveA(input)
}
