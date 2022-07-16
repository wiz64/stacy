// MAIN PROCESSSOR MODULE
// ===========================================================================
// This module is the main processor module. It is responsible for processing the input/text passed onto

spinal_cord = require('./spinal_cord.js')
plugin_system = require('./plugin_system.js');
stc_Plugins = plugin_system.loadPlugins();

function process(data) {
        ctx = data.ctxObj;
        // for each plugin in the stc_Plugins array, call OnMessageEvent of every plugin
        for (var i = 0; i < stc_Plugins.length; i++) {
            var plugin = stc_Plugins[i];
            if(plugin.OnMessageEvent) {
                plugin.OnMessageEvent(data, spinal_cord);
            }
        }

        console.log(`[TG] ${ctx.update.message.from.first_name} (${ctx.update.message.from.username}) sent: ${ctx.update.message.text}`)
       // ctx.reply(`Hello ${data.user.firstname}`)
    }

module.exports.process = process;