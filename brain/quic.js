/*
Quic - Make Complex functions easy.
*/
function randomFromList(list) {
    return list[Math.floor(Math.random() * list.length)]; 
}

module.exports.randomFromList = randomFromList;
