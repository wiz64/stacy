var spawn = require('child_process').spawn;
var kill  = require('tree-kill');
const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules


var a_child = []
function start(spawner,proc) {
var child = spawn(spawner,[proc], {
        detached: true
    });
a_child.push(child.pid)
var scriptOutput = "";
child.stdout.setEncoding('utf8');
child.stdout.on('data', function(data) {
    //Here is where the output goes
    console.log('stdout: ' + data);
    data=data.toString();
    scriptOutput+=data;
});

child.stderr.setEncoding('utf8');
child.stderr.on('data', function(data) {
    //Here is where the error output goes
    console.log('stderr: ' + data);
    data=data.toString();
    scriptOutput+=data;
});
child.on('close', function(code) {
    //Here you can get the exit code of the script
    console.log('closing code: ' + code);
    console.log('Full output of script: ',scriptOutput);
});

}

function killAll() {
a_child.forEach(child => {
    console.log("Killing child process: "+child)
    kill(child);
    });
    processlist = ['interfaces/web.js','interfaces/telegram.js','interfaces/discord.js']
    processlist.forEach(proc => {
        try {
    var output = execSync("kill $(ps aux | grep "+proc+" |  tr -s ' ' | cut -d ' ' -f 2| awk '{print $1}')", { encoding: 'utf-8' });
    console.log(output);}
    catch(e) { console.log("Tried Killing Process: "+proc)}
});
}
module.exports.start = start;
module.exports.killAll = killAll;