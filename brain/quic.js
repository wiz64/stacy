/*
Quic - Make Complex functions easy.
*/
function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }

function randomFromList(list) {
    return list[Math.floor(Math.random() * list.length)]; 
}

function log(text) {
    var DIR = "logs/";
    if(!fs.existsSync(DIR)){
        fs.mkdirSync(DIR)
      }
    // add current timestamp to text and log it
    text  = new Date().toLocaleString() + ": " + text;
    fs.appendFileSync('logs/log.txt', text + '\n');
}
module.exports= {
    isInt: isInt,
    randomFromList: randomFromList,
    log : log
}
