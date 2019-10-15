# Usage

```
import { levenshtein, ngramDiceCoefficient } from 'fuzzy'

const tokens1 = ['this', 'is', 'an', 'apple', '.']
const tokens2 = ['this', 'is', 'an', 'apple', '.']
let score = levenshtein(tokens1, tokens2)
console.log(score)

const text1 = 'There is an apple on the table in the green house.'
const text2 = 'There is an apple on the desk in the green house.'
score = ngramDiceCoefficient(text1, text2)
console.log(score)
```