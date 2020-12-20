import 'should'
import { parse, buildTree, solveA, run, validate } from './puzzle19'

const testData = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`

describe('Puzzle 19', () => {
  it('should build a tree', () => {
    buildTree(parse(testData).rules).should.deepEqual({
      "list": [
        "a",
        { "alternatives": [{
            "list": [
              { "alternatives": [ { "list": ["a", "a"] }, { "list": ["b", "b"] }] },
              { "alternatives": [ { "list": ["a", "b"] }, { "list": ["b", "a"] }] }
            ]
          }, {
            "list": [
              { "alternatives": [ { "list": ["a", "b"] }, { "list": ["b", "a"] }] },
              { "alternatives": [ { "list": ["a", "a"] }, { "list": ["b", "b"] }] }
            ]
          }]
        },
        "b"
      ] 
    })
  })

  it('should validate a char', () => {
    validate('a', 'a').should.equal(1)
    validate('a', 'b').should.equal(0)
  })

  it('should validate a list', () => {
    validate({ list: ['a', 'b'] }, 'ab').should.equal(2)
    validate({ list: ['a', 'b'] }, 'ba').should.equal(0)
  })

  it('should validate an alternative', () => {
    validate({ alternatives: ['a', 'b'] }, 'a').should.equal(1)
    validate({ alternatives: ['a', 'b'] }, 'b').should.equal(1)
  })

  it('should validate an alternative of lists', () => {
    const tree = { alternatives: [{ list: ['a', 'b'] },{ list: ['b', 'a'] }] }
    validate(tree, 'ab').should.equal(2)
    validate(tree, 'ba').should.equal(2)
    validate(tree, 'aa').should.equal(0)
  })

  it('should validate first entry of test data', () => {
    const tree = buildTree(parse(testData).rules)
    validate(tree, 'ababbb').should.equal(6)
  })

  it('should solve part A', () => {
    solveA(parse(testData)).should.equal(2)
  })

  it('should return the result', () => {
    run().should.match(/^19a: \d+x/)
  })
})
