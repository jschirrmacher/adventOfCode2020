import readInput from "../lib/fileReader"

type Bus = {
  id: number,
  offset: number
}

export function nextDepatureTime(time: number, id: number): number {
  return Math.ceil(time / id) * id
}

export function solveA(startTime: number, busIdString: string): number {
  const busIds = busIdString.split(',').filter(id => id !== 'x').map(Number)
  const nextDepatureTimes = busIds.map(id => nextDepatureTime(startTime, id))
  const result = nextDepatureTimes.reduce((info, time, id) => {
    return time < info.time ? { id, time } : info
  }, { id: 0, time: 99999999 })
  return (result.time - startTime) * busIds[result.id]
}

export function solveB(busIdString: string): number {
  function getNextTimestamp(time: number, inc: number, offset: number, busId: number): number {
    while ((time + offset) % busId !== 0) {
      time += inc
    }
    return time
  }

  const buses: Bus[] = busIdString.split(',')
    .map((id, offset) => ({ id: parseInt(id), offset }))
    .filter(bus => !isNaN(bus.id))

  let inc = 1
  let time = 0
  for (let index = 1; index < buses.length; index++) {
    inc *= buses[index - 1].id
    time = getNextTimestamp(time, inc, buses[index].offset, buses[index].id)
  }

  return time
}

export function run(): string {
  const input = readInput(line => line)
  return '13a: ' + solveA(parseInt(input[0]), input[1])
     + '\n13b: ' + solveB(input[1])
}
