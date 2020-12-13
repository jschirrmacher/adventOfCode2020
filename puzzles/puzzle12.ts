import { schedulingPolicy } from "cluster"
import readInput from "../lib/fileReader"

export type Command = {
  action: string,
  value: number
}

export type Ship = {
  positionX: number,
  positionY: number,
  orientation: number,
  getManhattanDistance: () => number,
  move: (command: Command) => void,
}

function normalize(angle: number): number {
  return angle % 360
}

export const actions: Record<string, (ship: Ship, value: number) => unknown> = {
  'N': (ship: Ship, value: number): number => ship.positionY += value,
  'S': (ship: Ship, value: number): number => ship.positionY -= value,
  'E': (ship: Ship, value: number): number => ship.positionX += value,
  'W': (ship: Ship, value: number): number => ship.positionX -= value,
  'L': (ship: Ship, value: number): void => {
    ship.orientation = normalize(ship.orientation - value)
  },
  'R': (ship: Ship, value: number): void => {
    ship.orientation = normalize(ship.orientation + value)
  },
  'F': (ship: Ship, value: number): void => {
    ship.positionX += value * Math.cos(ship.orientation / 180 * Math.PI)
    ship.positionY -= value * Math.sin(ship.orientation / 180 * Math.PI)
  }
}

export function parseCommand(line: string): Command {
  return {
    action: line[0],
    value: parseInt(line.substr(1))
  }
}

function createShip() {
  const ship = {
    positionX: 0,
    positionY: 0,
    orientation: 0,
  
    getManhattanDistance: () => Math.abs(ship.positionX) + Math.abs(ship.positionY),

    move(command: Command): void {
      actions[command.action](ship, command.value)
      console.log(command.action + command.value + ' moved the ship to ' + ship.positionX + ', ' + ship.positionY)
    },
  }

  return ship
}

export function solveA(commands: Command[]): number {
  const ship = createShip()
  commands.forEach(ship.move)
  return ship.getManhattanDistance()
}

export function run(): string {
  const input = readInput(parseCommand)
  return '12a: ' + solveA(input)
}