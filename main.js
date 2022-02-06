import randomWords from 'random-words';
import chalk from 'chalk';
const word = findWordleWord();

// using recursian to ensure that the user will get a 5 letter word without calling for too big of a word count
function findWordleWord() {
    const wrd = randomWords({exactly: 5, maxLength: 5});
    for(let i = 0; i < wrd.length; i++) {
        if(wrd[i].length == 5)
            return wrd[i];
    }

    findWordleWord();
}

console.log(chalk.white.bgYellow(word));