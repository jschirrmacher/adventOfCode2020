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
        if (!operations[currentInstruction.op]) {
          throw Error(`Unknown operation '${currentInstruction.op}'`)
        }
        operations[currentInstruction.op](currentInstruction.val)
      } while (machine.programCounter < instructions.length && !visited[machine.programCounter])
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

function modifyOperation(op: Operation): Operation {
  return op === Operation.nop ? Operation.jmp : op === Operation.jmp ? Operation.nop : op
}

function modifyInstruction(instruction: Instruction): Instruction {
  return {
    op: modifyOperation(instruction.op),
    val: instruction.val
  }
}

let modifyPos = -1
function getNextModifiation(instructions: Instruction[]): Instruction[] {
  while (instructions[++modifyPos].op === Operation.acc) {
    // no need to modify
  }
  return instructions.map((instruction, index) => {
    return index === modifyPos ? modifyInstruction(instruction) : instruction
  })
}

export function solveB(instructions: Instruction[]): number {
  let machine
  do {
    const modified = getNextModifiation(instructions)
    machine = Machine(modified)
    machine.run()
  } while (machine.programCounter < instructions.length)
  return machine.accumulator
}

export function run(): string {
  const instructions = readInput(parseInstruction)
  return '8a: ' + solveA(instructions) + '\n8b: ' + solveB(instructions)
}
