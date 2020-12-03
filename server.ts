import fs from 'fs'
import path from 'path'
import express, { Request, Response } from 'express'

const PORT = process.env.PORT || 3000
const app = express()

type Entry = {
  name: string,
  result: string
}

type Puzzle = {
  name: string,
  run: () => string
}

let puzzles: Puzzle[]

async function loadPuzzles() {
  puzzles = await Promise.all(fs.readdirSync(path.resolve(__dirname, 'puzzles'))
    .filter(name => name.match(/^puzzle\d+\.ts/))
    .map(async name => {
      const module = await import(`./puzzles/${name}`)
      return { name, run: module.run } as Puzzle
    }))
}

function getPuzzleResults(): Entry[] {
  return puzzles.map(puzzle => ({ name: puzzle.name, result: puzzle.run() }))
}

loadPuzzles()
app.use('/', express.static(path.resolve(__dirname, 'frontend')))
app.get('/results', (req: Request, res: Response) => res.json(getPuzzleResults()))

app.listen(PORT, () => console.log('Listenting on http://localhost:' + PORT))
