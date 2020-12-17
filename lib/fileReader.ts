import fs from 'fs'
import path from 'path'

type Parser<T> = (line: string) => T
type StackEntry = { getFileName: () => string }

const emptyParser = ((line: string) => line) as Parser<unknown>

function getTestDataFileName(): string {
  const originalFunc = Error.prepareStackTrace
  try {
    const err = new Error() as unknown as { stack: StackEntry[] }
    Error.prepareStackTrace = (err, stack) => stack
    while (err.stack.length && err.stack[0].getFileName() === __filename) {
      err.stack.shift()
    }
    const caller = err.stack[0].getFileName()
    const fileName = path.basename(caller).replace(/(\.test)?\.ts$/, '.txt')
    return path.resolve(path.dirname(caller), 'testdata', fileName)
  } catch {
    return ''
  } finally {
    Error.prepareStackTrace = originalFunc
  }
}

export default function readInput<T>(lineParser = emptyParser as Parser<T>): Array<T> {
  return fs.readFileSync(getTestDataFileName())
    .toString()
    .split('\n')
    .map(lineParser)
    .filter(entry => entry) as Array<T>
}
