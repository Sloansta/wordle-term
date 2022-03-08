#!/usr/bin/env node

const chalk = require('chalk');
const randomWords = require('./src/words');
const prompt = require('prompts');
//const tty = require('tty');

let wordChart = "";
const word = findWordleWord();
let guessCount = 6;
const maxGuessCount = 0;
let exitGame = false;

// using recursian to ensure that the user will get a 5 letter word without calling for too big of a word count
function findWordleWord() {
    const wrd = randomWords[random(randomWords.length - 1)];
    return wrd;
}

// this will check to see if the characters match in the word
// What we will want to do is take the generated word, and then match it against the guess character by character 
function checkLetter(wrd, guess) {
    if(!exitGame) {
        if(guess.length > 5) {
            console.log('Word too long, try again.');
            return false;
        } else if(guess.length < 5) {
            console.log('Word too short, try again');
            return false;
        }
        const wordArr = guess.split('');
        for(let i = 0; i < wordArr.length; i++) {
            if(wrd[i] == wordArr[i]) 
                wordArr[i] = chalk.white.bgGreen(wordArr[i].toUpperCase());
            else if(wrd.includes(wordArr[i])) 
                wordArr[i] = chalk.white.bgYellow(wordArr[i].toUpperCase());
            else 
                wordArr[i] = chalk.white.bgBlack(wordArr[i].toUpperCase());
        }
    
        const cycledWord = wordArr.join('|');
        wordChart += cycledWord + '\n';
        console.log(wordChart);
        return true;
    }
}

function random(max) {
    return Math.floor(Math.random() * max);
}

// this is a recursive async function that will wait for prompt to finish getting user information
// to then execute once the user has hit enter. More checks to be added soon
async function guessWord() {
    // console.log(word); this is used for debug mode
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

        let validGuess = checkLetter(word, guess.guess);

        if(guess.guess == word) {
            console.log('Good work! You guessed the word.');
            return;
        }

        if(validGuess) {
            guessCount--;
            guessWord();
        }
        else if(!validGuess)
            guessWord();
    }
}

process.openStdin().on('keypress', function(chunk, key) {
    if(key && key.name === 'c' && key.ctrl) {
        exitGame = true;
        console.log('see ya');
        process.exit();
    }
});

try {
    process.stdin.setRawMode(true);
} catch (err) {
    require('tty').setRawMode(true);
}

guessWord();