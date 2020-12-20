import { truncate } from 'fs'
import 'should'
import { parse, parseB, isValid, solve, run } from './puzzle19'

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

const testDataB = `42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`

const parsed = parse(testData.split('\n'))
const parsedB = parseB(testDataB.split('\n'))

describe('Puzzle 19', () => {
  it('should parse messages', () => {
    parsed.messages.should.deepEqual(['ababbb', 'bababa', 'abbbab', 'aaabbb', 'aaaabbb'])
  })

  it('should validate test data entries', () => {
    const result = Object.assign({}, ...parsed.messages.map(message => ({ [message]: isValid(parsed, message) })))
    result.should.deepEqual({
      ababbb: true,
      abbbab: true,
      bababa: false,
      aaabbb: false,
      aaaabbb: false,
    })
  })

  it('should solve part A', () => {
    solve(parsed).should.equal(2)
  })

  it('should reject "aaaabbaaaabbaaa" with modified ruleset', () => {
    isValid(parsed, 'aaaabbaaaabbaaa').should.be.false()
  })

  it('should validate test data for part B', () => { 
    const result = Object.assign({}, ...parsedB.messages.map(message => ({ [message]: isValid(parsedB, message) })))
    result.should.equal({
      abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa: false,
      bbabbbbaabaabba: true,
      babbbbaabbbbbabbbbbbaabaaabaaa: true,
      aaabbbbbbaaaabaababaabababbabaaabbababababaaa: true,
      bbbbbbbaaaabbbbaaabbabaaa: true,
      bbbababbbbaaaaaaaabbababaaababaabab: true,
      ababaaaaaabaaab: true,
      ababaaaaabbbaba: true,
      baabbaaaabbaaaababbaababb: true,
      abbbbabbbbaaaababbbbbbaaaababb: true,
      aaaaabbaabaaaaababaa: true,
      aaaabbaaaabbaaa: false,
      aaaabbaabbaaaaaaabbbabbbaaabbaabaaa: true,
      babaaabbbaaabaababbaabababaaab: false,
      aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba: true,
    })
})

  it('should solve part B', () => {
    solve(parsedB).should.equal(12)
  })

  it('should return the result', () => {
    run().should.match(/^19a: \d+\n19b: \d+x/)
  })
})
