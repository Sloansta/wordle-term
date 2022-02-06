const randomWords = require('random-words');

let word = findWordleWord();

function findWordleWord() {
    const wrd = randomWords({exactly: 5, maxLength: 5});
    for(let i = 0; i < wrd.length; i++) {
        if(wrd[i].length == 5)
            return wrd[i];
    }

    findWordleWord();
}

console.log(word);