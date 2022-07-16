// read jokes.txt from memory/jokes.txt
fs = require('fs');
var jokes = fs.readFileSync('./memory/jokes.txt', 'utf8').split('\n');
// if every string in jokes start with #, it is a comment, so remove it
for (var i = 0; i < jokes.length; i++) {
    if (jokes[i].startsWith('#')) {
        jokes.splice(i, 1);
    }
}


// get a random joke from the jokes array
function getJoke() {
    var random = Math.floor(Math.random() * jokes.length);
    return jokes[random];
}
module.exports = {
    getJoke: getJoke
}