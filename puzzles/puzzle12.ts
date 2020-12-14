import readInput from "../lib/fileReader"

export type Command = {
  action: string,
  value: number
}

type Actions = Record<string, (ship: Ship, value: number) => unknown>

type Coordinate = { x: number, y: number}

export type Ship = {
  actions: Actions,
  position: Coordinate,
  waypoint: Coordinate,
  orientation: number,
  getManhattanDistance: () => number,
  move: (command: Command) => void,
}

function normalize(angle: number): number {
  return angle % 360
}

export const actions: Actions = {
  'N': (ship: Ship, value: number): number => ship.position.y += value,
  'S': (ship: Ship, value: number): number => ship.position.y -= value,
  'E': (ship: Ship, value: number): number => ship.position.x += value,
  'W': (ship: Ship, value: number): number => ship.position.x -= value,
  'L': (ship: Ship, value: number): void => {
    ship.orientation = normalize(ship.orientation - value)
  },
  'R': (ship: Ship, value: number): void => {
    ship.orientation = normalize(ship.orientation + value)
  },
  'F': (ship: Ship, value: number): void => {
    ship.position.x += value * Math.cos(ship.orientation / 180 * Math.PI)
    ship.position.y -= value * Math.sin(ship.orientation / 180 * Math.PI)
  }
}

const turns = {
  90: (pos: Coordinate) => ({ x: -pos.y, y: pos.x }),
  180: (pos: Coordinate) => ({ x: -pos.x, y: -pos.y }),
  270: (pos: Coordinate) => ({ x: pos.y, y: -pos.x }),
}

export const actionsB: Actions = {
  'N': (ship: Ship, value: number): number => ship.waypoint.y += value,
  'S': (ship: Ship, value: number): number => ship.waypoint.y -= value,
  'E': (ship: Ship, value: number): number => ship.waypoint.x += value,
  'W': (ship: Ship, value: number): number => ship.waypoint.x -= value,
  'L': (ship: Ship, value: number): void => {
    ship.waypoint = turns[value as keyof typeof turns](ship.waypoint)
  },
  'R': (ship: Ship, value: number): void => {
    ship.waypoint = turns[(360 - value) as keyof typeof turns](ship.waypoint)
  },
  'F': (ship: Ship, value: number): void => {
    ship.position.x += value * ship.waypoint.x
    ship.position.y += value * ship.waypoint.y
  }
}

export function parseCommand(line: string): Command {
  return {
    action: line[0],
    value: parseInt(line.substr(1))
  }
}

function createShip(actions: Actions): Ship {
  const ship = {
    actions,
    position: { x: 0, y: 0 },
    waypoint: { x: 10, y: 1 },
    orientation: 0,
  
    getManhattanDistance: () => Math.abs(ship.position.x) + Math.abs(ship.position.y),

    move(command: Command): void {
      ship.actions[command.action](ship, command.value)
      console.log(command.action + command.value + ' moved the ship to ' + ship.position.x + ', ' + ship.position.y)
    },
  }

  return ship
}

export function solveA(commands: Command[]): number {
  const ship = createShip(actions)
  commands.forEach(ship.move)
  return ship.getManhattanDistance()
}

export function solveB(commands: Command[]): number {
  const ship = createShip(actionsB)
  commands.forEach(ship.move)
  return ship.getManhattanDistance()
}

export function run(): string {
  const input = readInput(parseCommand)
  return '12a: ' + solveA(input) + '\n12b: ' + solveB(input)
}