import randomWords from 'random-words';
import chalk from 'chalk';
const word = findWordleWord();
let guessCount = 0;
const maxGuessCount = 6;

// using recursian to ensure that the user will get a 5 letter word without calling for too big of a word count
function findWordleWord() {
    const wrd = randomWords({exactly: 5, maxLength: 5});
    for(let i = 0; i < wrd.length; i++) {
        if(wrd[i].length == 5)
            return wrd[i];
    }

    findWordleWord();
}

// this will check to see if the characters match in the word
// What we will want to do is take the generated word, and then match it against the guess character by character 
function checkLetter(wrd, guess) {
    const wordArr = guess.split('');
    for(let i = 0; i < wordArr.length; i++) {
        if(wordArr[i] == wrd[i]) 
            wordArr[i] = chalk.white.bgGreen(wordArr[i].toUpperCase());
        else if(wrd.includes(wordArr[i])) 
            wordArr[i] = chalk.white.bgYellow(wordArr[i].toUpperCase());
        else 
            wordArr[i] = chalk.white.bgBlack(wordArr[i].toUpperCase());
    }

    const cycledWord = wordArr.join('|');
    return cycledWord;
}

console.log(checkLetter(word, 'water'));
console.log(word); // this is just for debugging 