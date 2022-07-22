/*
Quic - a js function library for stacy
contains commonly used functions and code
*/
function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }

function CurrentTime_() {
    // get current timestamp and convert it to hh_mm_ss-mm_dd_yyyy and return it
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var time = hours + "_" + minutes + "_" + seconds + "-" + month + "_" + day + "_" + year;
    return time;
}
function randomFromList(list) {
    return list[Math.floor(Math.random() * list.length)]; 
}

function containsWords(text,list) {
    // lowercase the words in the list and check if the list contains all of the words in the text
    var text = text.toLowerCase();
    var list = list.map(function(word) {
        return word.toLowerCase();
    }
    );
    var words = text.split(" ");
    var contains = true;
    list.forEach(function(word) {
        if(!words.includes(word)) {
            contains = false;
        }
    });
    return contains;
}

function log(text,type) {
    var fs = require('fs');
    var filename = CurrentTime_()+".log";
    var DIR = "logs/";
    if(type == undefined) {type = "info";}

    if(type == "error") {DIR += "error/";}
    if(type == "info") {DIR += "info/";}
    if(type == "debug") {DIR += "debug/";}

    
    if(!fs.existsSync(DIR)){
        fs.mkdirSync(DIR)
      }
    // add current timestamp to text and log it
    text  = new Date().toLocaleString() + ": " + text;
    fs.appendFileSync(DIR+filename, text + '\n');
}
module.exports= {
    isInt: isInt,
    randomFromList: randomFromList,
    log : log,
    containsWords: containsWords,
    CurrentTime_ : CurrentTime_

}
