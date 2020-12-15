import readInput from "../lib/fileReader"

type AssignmentFN = (address: number, value: bigint) => void

export function applyMask(value: string, mask: string): string {
  return value.split('').map((bit, pos) => {
    if (mask[pos] === '1') {
      return '1'
    } else if (mask[pos] === 'X') {
      return 'X'
    } else {
      return bit
    }
  }).join('')
}

function createMachine(type = 1) {
  function assignValueToAddresses(adrMask: string, value: bigint): void {
    if (adrMask.match(/X/)) {
      assignValueToAddresses(adrMask.replace(/X/, '0'), value)
      assignValueToAddresses(adrMask.replace(/X/, '1'), value)
    } else {
      machine.mem[parseInt(adrMask, 2)] = Number(value)
    }
  }

  const assignments: Record<number, AssignmentFN> = {
    1: (address: number, value: bigint) => {
      machine.mem[address] = Number(value & machine.andMask | machine.orMask)
    },

    2: (address: number, value: bigint) => {
      const binAdr = address.toString(2).padStart(36, '0')
      const adrMask = applyMask(binAdr, machine.mask)
      assignValueToAddresses(adrMask, value)
    }
  }

  const machine = {
    mask: '0'.repeat(36),
    andMask: BigInt('0b' + '1'.repeat(36)),
    orMask: 0n,
    mem: {} as Record<number, number>,

    exec(command: string): void {
      if (command.match(/^mask = ([X01]{36})$/)) {
        machine.mask = RegExp.$1
        machine.andMask = BigInt('0b' + machine.mask.replace(/X/g, '1'))
        machine.orMask = BigInt('0b' + machine.mask.replace(/X/g, '0'))
      } else {
        const matches = command.match(/^mem\[(\d+)\] = (\d+)$/) as string[]
        assignments[type](parseInt(matches[1]), BigInt(matches[2]))
      }
    },

    getMemSum(): number {
      return Object.values(machine.mem).reduce((sum, val) => sum + val)
    }
  }

  return machine
}

export function solveA(input: string[]): number {
  const machine = createMachine()
  input.forEach(machine.exec)
  return machine.getMemSum()
}

export function solveB(input: string[]): number {
  const machine = createMachine(2)
  input.forEach(machine.exec)
  return machine.getMemSum()
}

export function run(): string {
  const input = readInput(line => line)
  return '14a: ' + solveA(input) + '\n14b: ' + solveB(input)
}
