import readInput from "../lib/fileReader"

export function nextDepatureTime(time: number, id: number): number {
  return Math.ceil(time / id) * id
}

export function solveA(startTime: number, busIds: number[]): number {
  const nextDepatureTimes = busIds.map(id => nextDepatureTime(startTime, id))
  const result = nextDepatureTimes.reduce((info, time, id) => {
    return time < info.time ? { id, time } : info
  }, { id: 0, time: 99999999 })
  return (result.time - startTime) * busIds[result.id]
}

export function run(): string {
  const input = readInput(line => line)
  return '13a: ' + solveA(parseInt(input[0]), input[1].split(',').filter(id => id !== 'x').map(Number))
}
