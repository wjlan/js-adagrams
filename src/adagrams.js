const LETTER_POOL = {
  A: 9, 
  B: 2, 
  C: 2, 
  D: 4, 
  E: 12, 
  F: 2, 
  G: 3, 
  H: 2, 
  I: 9, 
  J: 1, 
  K: 1, 
  L: 4, 
  M: 2, 
  N: 6, 
  O: 8, 
  P: 2, 
  Q: 1, 
  R: 6, 
  S: 4, 
  T: 6, 
  U: 4, 
  V: 2, 
  W: 2, 
  X: 1, 
  Y: 2, 
  Z: 1
};

const SCORE_CHART = {
  A: 1, 
  B: 3, 
  C: 3, 
  D: 2, 
  E: 1, 
  F: 4, 
  G: 2, 
  H: 4, 
  I: 1, 
  J: 8, 
  K: 5, 
  L: 1, 
  M: 3, 
  N: 1, 
  O: 1, 
  P: 3, 
  Q: 10, 
  R: 1, 
  S: 1, 
  T: 1, 
  U: 1, 
  V: 4, 
  W: 4, 
  X: 8, 
  Y: 4, 
  Z: 10
}


export const drawLetters = () => {
  const letterBank = []
  const keys = Object.keys(LETTER_POOL);
  while (letterBank.length < 10) {
    const randomLetter = keys[Math.floor(Math.random() * keys.length)];
    if (letterBank.filter(x => x === randomLetter).length < LETTER_POOL[randomLetter]) {
    letterBank.push(randomLetter);
    }
  } 
  return letterBank; 
};


export const usesAvailableLetters = (input, lettersInHand) => {
  const inputUpperCase = input.toUpperCase();
  const inputList = inputUpperCase.split("");
  for (const char of inputList) {
    if (!lettersInHand.includes(char)) {
      return false;
    } else if (inputList.filter(x => x === char).length > lettersInHand.filter(x => x === char).length) {
      return false;
    } 
  }
  return true;
}


export const scoreWord = (word) => {
  const wordUpperCase = word.toUpperCase();
  const wordList = wordUpperCase.split("");
  let score = 0;
  if (wordList.length >= 7) {
    score += 8;
  }
  for (const char of wordList) {
    score += SCORE_CHART[char]
  }
  return score;
};


export const highestScoreFrom = (words) => {
  let highestScore = 0;
  let winningWord = null;
  for (const word of words) {
    const score = scoreWord(word);
    if (score > highestScore) {
      highestScore = score;
      winningWord = word;
    } else if (score === highestScore) {
      if (word.length === 10 && winningWord.length !== 10) {
        winningWord = word;
      } else if (word.length < winningWord.length && winningWord.length !== 10) {
        winningWord = word;
      }
    }
  }
  return {"score": highestScore, "word": winningWord};
};
