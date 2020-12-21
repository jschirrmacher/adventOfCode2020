import readInput from '../lib/fileReader'
import { create as getBufferedParser } from '../lib/BufferedParser'

type Tile = {
  id: number
  data: string[]
  borders: string[]
  toString(): string
}

function createTile(data: string[]): Tile {
  const title = data.shift() as string
  const id = parseInt((title.match(/Tile (\d+):/) as string[])[1], 10)
  const borders = [ data[0], data.map(r => r[0]).join(''), data[9], data.map(r => r[9]).join('') ]
  borders.push(...borders.map(b => b.split('').reverse().join('')))
  const toString = () => 'Tile ' + id + ':\n' + data.join('\n')

  return { id, borders, data, toString }
}

function tileMatcher(tile: Tile) {
  return (other: Tile) => {
    return tile.id !== other.id && tile.borders.some(border => other.borders.includes(border))
  }
}

function getMatchingTiles(tiles: Tile[]): Record<number, Tile[]> {
  return Object.assign({}, ...tiles.map(tile => {
    return {[ tile.id ]: tiles.filter(tileMatcher(tile)) || {} }
  }))
}

function run(): string {
  const parser = getBufferedParser(createTile)
  const tiles = readInput(parser.parse).concat(parser.flush()) as Tile[]
  const matchingTiles = getMatchingTiles(tiles)
  const cornerTiles = Object.keys(matchingTiles).filter((t: string) => matchingTiles[+t].length === 2)
  return '' + cornerTiles.reduce((sum, id) => sum * id, 1)
  // return Object.entries(matchingTiles).map(([tile, matching]) => tile + ': ' + matching.map(m => m.id)).join('\n')
}

console.log(run())
