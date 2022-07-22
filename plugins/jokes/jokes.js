// read jokes.txt from memory/jokes.txt
var fs = require('fs');
var axios = require('axios');
var jokes = fs.readFileSync('./memory/jokes.txt', 'utf8').split('\n');
// if every string in jokes start with #, it is a comment, so remove it
for (var i = 0; i < jokes.length; i++) {
    if (jokes[i].startsWith('#')) {
        jokes.splice(i, 1);
    }
}

async function getJokeFromAPI() {
    
   // Make axios get request to  https://icanhazdadjoke.com/
    const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: {
            Accept: 'application/json',
            'User-Agent': 'github.com/wiz64/stacy'
        } // headers
    });
    //console.log(response.data);
    if (response.status == 200) {
        
        return response.data.joke;
    }
        else {
            return 0
        }
            
}

// get a random joke from the jokes array
async function getJoke() {
    // i is list of 0 and 1, get random number from the list of 1 and 0
    var i = quic.randomFromList([0, 1]);
    if(i == 1) {
        // get joke from api
        var joke = await getJokeFromAPI();
        if(joke) {
            return joke;
        } else {
            console.log("I couldn't get a joke from the API");
            i = 0;
        }
    } if (i == 0) {
        var random = Math.floor(Math.random() * jokes.length);
        return jokes[random];
    }
    
} 
module.exports = {
    getJoke: getJoke,
    getJokeFromAPI: getJokeFromAPI

}