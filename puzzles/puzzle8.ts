import readInput from "../lib/fileReader"

export enum Operation {
  'acc' = 'acc',
  'jmp' = 'jmp',
  'nop' = 'nop',
}
export type Instruction = { op: Operation, val: number }

function Machine(instructions: Instruction[]) {
  const visited = {} as Record<number, boolean>

  const machine = {
    accumulator: 0,
    programCounter: 0,

    run(): void {
      do {
        visited[machine.programCounter] = true
        const currentInstruction = instructions[machine.programCounter]
        operations[currentInstruction.op](currentInstruction.val)
      } while (!visited[machine.programCounter])
    }
  }
  const operations = {
    nop: (): void => {
      machine.programCounter++
    },
    jmp: (val: number): void => {
      machine.programCounter += val
    },
    acc: (val: number): void => {
      machine.accumulator += val
      machine.programCounter++
    }
  }
  
  return machine
}

export function parseInstruction(line: string): Instruction {
  const [ op, val ] = line.split(' ')
  return { op: op as Operation, val: parseInt(val) }
}

export function solveA(instructions: Instruction[]): number {
  const machine = Machine(instructions)
  machine.run()
  return machine.accumulator
}

export function run(): string {
  const instructions = readInput(parseInstruction)
  return '8a: ' + solveA(instructions) + '\n'
}
