import randomWords from 'random-words';
import chalk from 'chalk';
import prompt from 'prompts';

let wordChart = "";
const word = findWordleWord();
let guessCount = 6;
const maxGuessCount = 0;

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
    wordChart += cycledWord + '\n';
    return wordChart;
}

async function guessWord() {
    if(guessCount <= maxGuessCount) {
        console.log('Better luck next time. The word was ' + word);
        return;
    }
    else {
        const guess = await prompt({
            type: 'text',
            name: 'guess',
            message: `(${guessCount} guesses remain) Guess a 5 letter word: `
        });
        console.log(checkLetter(word, guess.guess));
        console.log(word); // this is just for debugging 
        guessCount--;
        guessWord();
    }
}

guessWord();

//console.log(checkLetter(word, 'water'));
