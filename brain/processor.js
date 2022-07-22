// MAIN PROCESSSOR MODULE
// ===========================================================================
// This module is the main processor module. It is responsible for processing the input/text passed onto

// quic is a frequently used library, we are defining it globally so that we can use it in the plugins
global.quic = require('./quic.js');


spinal_cord = require('./spinal_cord.js')
plugin_system = require('./plugin_system.js');
stc_Plugins = plugin_system.loadPlugins();

function process(data) {
        ctx = data.ctxObj;
        data.modules = {
            quic : require('./quic.js'),
        }
        // for each plugin in the stc_Plugins array, call OnMessageEvent of every plugin
        for (var i = 0; i < stc_Plugins.length; i++) {
            var plugin = stc_Plugins[i];
            if (typeof plugin.OnMessageEvent !== "undefined") { 
                // safe to use the function
                try {
                    plugin.OnMessageEvent(data, spinal_cord);
                }
                catch(err) {error = "[ERROR] "+plugin.info.name+" failed to process message ";console.log(error);quic.log(err,"error");return}
            }
        }
    }

module.exports.process = process;