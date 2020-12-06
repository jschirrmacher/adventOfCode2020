type BufferedParser = {
  parse(line: string): unknown | null,
  flush(): unknown | null
}

const buffer = [] as string[]

export function create<T>(createEntry: (buffer: string[]) => T): BufferedParser {
  return {
    parse(line: string): T | null {
      if (line.trim() === '') {
        const entry = createEntry(buffer)
        buffer.length = 0
        return entry
      } else {
        buffer.push(line)
        return null
      }
    },

    flush(): T | null {
      return createEntry(buffer)
    }
  }
}
