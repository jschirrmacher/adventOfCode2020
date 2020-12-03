import fs from 'fs'

type Parser<t> = (line: string) => t
type StackEntry = { getFileName: () => string }

const emptyParser = ((line: string) => line) as Parser<unknown>

function getCallerFile(): string {
  const originalFunc = Error.prepareStackTrace
  try {
    const err = new Error() as unknown as { stack: StackEntry[] }
    Error.prepareStackTrace = (err, stack) => stack
    while (err.stack.length && err.stack[0].getFileName() === __filename) {
      err.stack.shift()
    }
    return err.stack[0].getFileName()
  } catch {
    return ''
  } finally {
    Error.prepareStackTrace = originalFunc
  }
}

export default function readInput(lineParser = emptyParser): Array<unknown> {
  return fs.readFileSync(getCallerFile().replace(/\.ts$/, '.txt'))
    .toString()
    .split('\n')
    .map(lineParser)
}
