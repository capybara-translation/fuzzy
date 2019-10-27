/**
 * Calculate a levenshtein distance between two arrays of tokens.
 *
 * @param {Array.<string>} tokensA tokens
 * @param {Array.<string>} tokensB tokens
 * @returns {number} levenshtein distance represented as a percentage normalized by the length of the longer one of the two tokens
 */
export function levenshtein (tokensA: string[], tokensB: string[]): number {
  const tokens1 = tokensA.filter(t => t)
  const tokens2 = tokensB.filter(t => t)
  if (tokens1.toString() === tokens2.toString()) {
    return 100
  }
  if (tokens1.toString().toLowerCase() === tokens2.toString().toLowerCase()) {
    return 99
  }
  const n = tokens1.length
  const m = tokens2.length

  let swap: number[] = []
  let cost = 0
  let matP = [...Array(n + 1)].map((_, i) => i)
  let matD: number[] = []
  for (let j = 1; j <= m; j++) {
    const obj2j = tokens2[j - 1]
    matD[0] = j
    for (let i = 1; i <= n; i++) {
      const obj1i = tokens1[i - 1]
      cost = (obj1i === obj2j) ? 0 : 1
      // Minimum of cell to the left+1, to the top+1, diagonally left and up + cost
      matD[i] = Math.min(matD[i - 1] + 1, matP[i] + 1, matP[i - 1] + cost)
    }
    // Copy current distance counts to 'previous row' distance counts
    swap = matP
    matP = matD
    matD = swap
  }
  // The last action in the above loop was to switch d and p
  // so now p has actually the most recent cost counts
  const longest = Math.max(n, m)
  return Math.floor((100 * (longest - matP[n])) / longest)
}

/**
 * Convert text into n grams
 *
 * @param {string} text text
 * @param {number} n number of grams
 * @returns {Array.<string>} An array of grams
 */
export function ngram (text: string, n: number): string[] {
  const grams: string[] = []
  let i: number
  for (i = 0; i <= text.length - n; i++) {
    grams.push(text.substr(i, n).toLowerCase())
  }
  if (i < text.length) {
    grams.push(text.substr(i))
  }
  return grams
}

/**
 * Calculate a dice coefficient between two strings
 *
 * @param {string} text1 text
 * @param {string} text2 text
 * @returns {number} dice coefficient
 */
export function ngramDiceCoefficient (text1: string, text2: string): number {
  if (text1 === text2) {
    return 100
  }
  if (text1.toLowerCase() === text2.toLowerCase()) {
    return 99
  }

  const tokens1 = new Set(ngram(text1, 3))
  const tokens2 = new Set(ngram(text2, 3))

  const originalSize = tokens1.size
  const newSize = tokens2.size
  tokens1.forEach(t => {
    if (!tokens2.has(t)) {
      tokens1.delete(t)
    }
  })
  const intersection = tokens1.size
  return Math.round((2.0 * intersection) / (originalSize + newSize) * 100.0)
}
