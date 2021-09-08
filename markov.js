/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map()
    for (let i = 0; i < this.words.length; i++) {
      let nextWord;
      if (i == this.words.length - 1) {
        nextWord = null
      } else {
        nextWord = this.words[i + 1]
      }

      if (chains.has(this.words[i])) {
        chains.get(this.words[i]).push(nextWord)
      } else {
        chains.set(this.words[i], [nextWord])
      }
    }
    return chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let res = [];

    let keys = Array.from(this.chains.keys());
    let random = Math.floor(Math.random() * keys.length)
    res.push(keys[random])
    for (let i = 0; i < numWords; i++) {
      let lastWord = keys[random]
      keys = this.chains.get(lastWord)
      random = Math.floor(Math.random() * keys.length)
      if (keys[random] === null) {
        break
      } else {
        res.push(keys[random])
      }
    }

    return res.join(' ')
  }
}

module.exports = { MarkovMachine }