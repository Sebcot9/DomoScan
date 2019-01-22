var dataView = { 
    "type" : "listItem",
    "itemType" : "PluginActionButton",
    "items" : []
};

dataView.items.push({
    name: "vol Mute",
    icon: "volume-off",
    action: "volumeMute",
    data: null
});

dataView.items.push({
    name: "vol Down",
    icon: "volume-down",
    action: "volumeDown",
    data: null
});

dataView.items.push({
    name: "vol UP",
    icon: "volume-up",
    action: "volumeUp",
    data: null
});


var channels = require("./lib/channels.json");
for(var channel in channels){
    dataView.items.push({
        name: channel,
        action: "changeChanelByNumber",
        data: channels[channel]
    });
}

module.exports = dataView;
