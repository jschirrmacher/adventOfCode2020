import readInput from "../lib/fileReader"

export type Seats = string []

export function nextSeat(seats: string, cols: number, visibleSeats: boolean, index: number, offset: number): number {
  const newIndex = index + offset
  const newCol = newIndex % cols
  if (newIndex < 0 || newIndex >= seats.length || newCol === 0 || newCol === cols - 1) {
    return 0
  }
  const seat = seats[newIndex]
  if (seat === ' ') {
    return visibleSeats ? nextSeat(seats, cols, visibleSeats, newIndex, offset) : 0
  } else {
    return +seat
  }
}

export function occupiedSeatsAround(seats: string, cols: number, visibleSeats: boolean, index: number): number {
  const offsets = [ - cols - 1, - cols, - cols + 1, - 1, 1, cols - 1, cols, cols + 1] as number[]
  return offsets.reduce((sum, offset) => sum + nextSeat(seats, cols, visibleSeats, index, offset), 0)
}

export function doRound(seats: string, cols: number, visibleSeats = false): string {
  return seats.replace(/[01]/g, (seat, index) => {
    const occupied = occupiedSeatsAround(seats, cols, visibleSeats, index)
    if (seat === '0' && occupied === 0) {
      return '1'
    } else if (seat === '1' && occupied >= (visibleSeats ? 5 : 4)) {
      return '0'
    }
    return seat
  })
}

function doRoundsUntilStable(seats: string, cols: number, visibleSeats = false): string {
  let newSeats: string = seats
  do {
    seats = newSeats
    newSeats = doRound(seats, cols, visibleSeats)
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

export function solveB(input: string[]): number {
  const seats = doRoundsUntilStable(addBorder(input).join(''), input[0].length + 2, true)
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
  return '11a: ' + solveA(input) + '\n11b: ' + solveB(input)
}
