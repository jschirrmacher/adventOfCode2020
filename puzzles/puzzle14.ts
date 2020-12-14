import readInput from "../lib/fileReader"

function createMachine() {
  const machine = {
    andMask: BigInt('0b' + '1'.repeat(36)),
    orMask: BigInt('0b' + '0'.repeat(36)),
    mem: {} as Record<number, number>,

    exec(command: string): void {
      if (command.match(/^mask = ([X01]{36})$/)) {
        const mask = RegExp.$1
        machine.andMask = BigInt('0b' + mask.replace(/X/g, '1'))
        machine.orMask = BigInt('0b' + mask.replace(/X/g, '0'))
      } else {
        const matches = command.match(/^mem\[(\d+)\] = (\d+)$/)
        if (matches) {
          const register = parseInt(matches[1])
          const value = BigInt(matches[2]) & machine.andMask | machine.orMask
          machine.mem[register] = Number(value)
        } else {
          console.error('Unknoen command ' + command)
        }
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

export function run(): string {
  const input = readInput(line => line)
  return '14a: ' + solveA(input)
}
