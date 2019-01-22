module.exports = function(philipshue) {
    var dataView = { 
        "type" : "listItem",
        "itemType" : "PluginSwitchButton",
        "items" : []
    };
    
    for(var id in philipshue.config.lights){
        var item=  {
            name: philipshue.config.lights[id].name,
            device: id,
            action: "changeStatus",
            data : philipshue.config.lights[id].state.on
        };
        dataView.items.push(item);
    }
    
    dataView.items = dataView.items.sort(function(a, b) {
       return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0); 
    });
    return dataView;
};