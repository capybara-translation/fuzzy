import { levenshtein, ngram, ngramDiceCoefficient } from '../src'
import test from 'ava'

test('levenshtein', t => {
  let tokens1 = ['this', 'is', 'an', 'apple', '.']
  let tokens2 = ['this', 'is', 'an', 'apple', '.']
  let score = levenshtein(tokens1, tokens2)
  t.true(score === 100)

  tokens1 = []
  tokens2 = ['this', 'is', 'an', 'apple', '.']
  score = levenshtein(tokens1, tokens2)
  t.true(score === 0)

  tokens1 = ['I', 'am', 'a', 'student', '.']
  tokens2 = ['i', 'am', 'a', 'student', '.']
  score = levenshtein(tokens1, tokens2)
  t.true(score === 99)

  tokens1 = ['I', 'am', 'a', 'student', '.']
  tokens2 = []
  score = levenshtein(tokens1, tokens2)
  t.true(score === 0)

  tokens1 = []
  tokens2 = []
  score = levenshtein(tokens1, tokens2)
  t.true(score === 100)

  tokens1 = ['I', 'am', 'a', 'student', '.']
  tokens2 = ['i', 'am', 'a', 'doctor', '.']
  score = levenshtein(tokens1, tokens2)
  t.true(score === 60)
})

test('ngram', t => {
  const text = 'This is an apple.'
  const expected = ['thi', 'his', 'is ', 's i',
    ' is', 'is ', 's a', ' an', 'an ', 'n a',
    ' ap', 'app', 'ppl', 'ple', 'le.', 'e.']
  const tokens = ngram(text, 3)
  t.true(tokens.toString() === expected.toString())
})

test('ngramDiceCoefficient', t => {
  let text1 = 'I am a student.'
  let text2 = 'I am a student.'
  let score = ngramDiceCoefficient(text1, text2)
  t.true(score === 100)

  text1 = 'i am a student.'
  text2 = 'I am a student.'
  score = ngramDiceCoefficient(text1, text2)
  t.true(score === 99)

  text1 = 'There is an apple on the table in the green house.'
  text2 = 'There is an apple on the desk in the green house.'
  score = ngramDiceCoefficient(text1, text2)
  t.true(score === 87)
})
