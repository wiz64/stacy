/* Stacy's Brain 
No Cyka Blyat Here !
How to call :
(Sample example)
var brain = require('brain/main.js')
var input = telegram.GetMessage()
brain.process(input)
*/
function process(input) {
    var processor = require('./brain/processor.js')
    processor.process(input)

}

module.exports.process = process;