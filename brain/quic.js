/*
Quic - a js function library for stacy
contains commonly used functions and code
*/
function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }
function command(text,command) {
    // if text starts with command prefix return true
    if (text.startsWith(stc_prefix+command)) { return true} else {return false};
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
function CurrentDate_() {
    // get current timestamp and convert it to mm_dd_yyyy and return it
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var time = month + "_" + day + "_" + year;
    return time;
}

function randomFromList(list) {
    return list[Math.floor(Math.random() * list.length)]; 
}

function containsWords(text,list) {
    // lowercase the words in the list and check if the list contains all of the words in the text
    var text = text.toLowerCase();
    // remove all non alphanumeric characters from the text
    text = text.replace(/[\u{0080}-\u{FFFF}]/gu, "");
    var list = list.map(function(word) {
        return word.toLowerCase();
    }
    );
    var words = text.split(" ");
    var contains = true;
    var index = [];
    list.forEach(function(word) { 
       if(word.includes("/")) {
         raw_word = word;
         word = word.split("/");
         index[list.indexOf(raw_word)] = false;
         word.forEach(function(phrase){
           if(words.includes(phrase)) {
             index[list.indexOf(raw_word)] = true;
           }
         })
       }
        else if(!words.includes(word)) {
            index[list.indexOf(word)] = false;
        }
      index.forEach(function(ind) {
        if(ind == false){
          contains = false
        }
        
      })
    });
    return contains;
}

function log(text,type) {
    var fs = require('fs');
    var filename = CurrentDate_()+".log";
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
    CurrentTime_ : CurrentTime_,
    command : command
}
