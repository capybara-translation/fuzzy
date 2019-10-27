import { levenshtein, ngram, ngramDiceCoefficient } from '../src'

describe('index.js', () => {
  describe('levenshtein', () => {
    it('exact match', () => {
      const tokens1 = ['this', 'is', 'an', 'apple', '.']
      const tokens2 = ['this', 'is', 'an', 'apple', '.']
      const score = levenshtein(tokens1, tokens2)
      expect(score).toBe(100)
    })

    it('case only difference', () => {
      const tokens1 = ['I', 'am', 'a', 'student', '.']
      const tokens2 = ['i', 'am', 'a', 'student', '.']
      const score = levenshtein(tokens1, tokens2)
      expect(score).toBe(99)
    })

    it('original tokens empty', () => {
      const tokens1: string[] = []
      const tokens2 = ['this', 'is', 'an', 'apple', '.']
      const score = levenshtein(tokens1, tokens2)
      expect(score).toBe(0)
    })

    it('new tokens empty', () => {
      const tokens1 = ['I', 'am', 'a', 'student', '.']
      const tokens2: string[] = []
      const score = levenshtein(tokens1, tokens2)
      expect(score).toBe(0)
    })

    it('both tokens empty', () => {
      const tokens1: string[] = []
      const tokens2: string[] = []
      const score = levenshtein(tokens1, tokens2)
      expect(score).toBe(100)
    })

    it('fuzzy match', () => {
      const tokens1 = ['I', 'am', 'a', 'student', '.']
      const tokens2 = ['i', 'am', 'a', 'doctor', '.']
      const score = levenshtein(tokens1, tokens2)
      expect(score).toBe(60)
    })
  })

  describe('ngram', () => {
    it('3-gram', () => {
      const text = 'This is an apple.'
      const expected = ['thi', 'his', 'is ', 's i',
        ' is', 'is ', 's a', ' an', 'an ', 'n a',
        ' ap', 'app', 'ppl', 'ple', 'le.', 'e.']
      const tokens = ngram(text, 3)
      expect(tokens.toString() === expected.toString()).toBeTruthy()
    })
  })

  describe('ngramDiceCoefficient', () => {
    it('exact match', () => {
      const text1 = 'I am a student.'
      const text2 = 'I am a student.'
      const score = ngramDiceCoefficient(text1, text2)
      expect(score).toBe(100)
    })

    it('case-only difference', () => {
      const text1 = 'i am a student.'
      const text2 = 'I am a student.'
      const score = ngramDiceCoefficient(text1, text2)
      expect(score).toBe(99)
    })

    it('fuzzy match', () => {
      const text1 = 'There is an apple on the table in the green house.'
      const text2 = 'There is an apple on the desk in the green house.'
      const score = ngramDiceCoefficient(text1, text2)
      expect(score).toBe(87)
    })
  })
})
