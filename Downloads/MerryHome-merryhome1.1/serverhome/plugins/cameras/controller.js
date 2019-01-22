var plugincamera = require("./index");

class CamerasController {
        
    constructor(io){
        plugincamera.setIO(io);
        //plugincamera.init();
        io.sockets.on('connection', function(socket){ 
            for(var i in plugincamera.cameras){
                var camera= plugincamera.cameras[i];
                socket.on(camera.name+'.start', function(name){
                    plugincamera.startByName(name);
                });
                socket.on(camera.name+'.stop', function(name){
                    plugincamera.stopByName(name);
                });
            }
        });

    }

    getView(req, res){
        var dataView = { 
            "type" : "listItem",
            "itemType" : "PluginCameraItem",
            "items" : []
        };
        for(var i in plugincamera.cameras){
            dataView.items.push({
                name: plugincamera.cameras[i].name,
                data:  plugincamera.cameras[i].start
            });
        }
        res.end(JSON.stringify(dataView));
    }

    postAction(req, res){
       res.end(JSON.stringify({})); 
    }
}

module.exports = CamerasController;