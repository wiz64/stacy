var stc_Plugins = [];
var fs = require('fs');
var path = require('path');

function loadPlugins() {
// load all plugins from the plugins folder, scan inside folders recursively create a new object for each plugin and add it to the stc_Plugins array

    var plugin_path = path.join(__dirname, '../plugins');
    var plugins = fs.readdirSync(plugin_path);
    for (var i = 0; i < plugins.length; i++) {
        try {
        var plugin_name = plugins[i];
        var plugin_path = path.join(__dirname, '../plugins', plugin_name);
        var plugin_data = require(plugin_path + '/main.js');
        if (plugin_data.info["type"] == 'plugin') {
            plugin = {
                info: plugin_data.info,
                init: plugin_data.init,
                OnMessageEvent: plugin_data.OnMessageEvent
            }
            plugin.init();
            stc_Plugins.push(plugin);
        
        
        }
        } catch(err) {console.log(err)}
}

        return stc_Plugins;
}
module.exports.loadPlugins = loadPlugins;