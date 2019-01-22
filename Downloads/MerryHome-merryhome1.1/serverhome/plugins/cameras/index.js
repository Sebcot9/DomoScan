/* global __dirname */

var request = require('request');
var fs = require('fs');                               
var Stream = require('stream').Transform;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class CamerasPlugin{
    
    constructor(){
        this.io= null;
        this.isStarting =false;
        this.cameras= require("./config.json").cameras;
    }
    
    setIO(io){
        this.io = io;
    }
    
    init(){
        for(var i in this.cameras){
            this.start(i);
        }
    }
    
    start(index){
        this.cameras[index].start= true;
        this.stream(index);
    }
    
    stop(index){
        this.cameras[index].start= false;
    }
    
    searchByName(name){
        for(var i in this.cameras){
            if(this.cameras[i].name === name){
                return i;
            }
        }
        return null;
    }
    
    startByName(name){
        var cameraIndex = this.searchByName(name);
        this.cameras[cameraIndex].start= true;
        this.stream(cameraIndex);
    }
    
    stopByName(name){
        var cameraIndex = this.searchByName(name);
        this.cameras[cameraIndex].start= false;
    }
    
    
    
    async stream(index){
        if(this.cameras[index].start){
            var self= this;
            var data= new Stream();
            var camera= this.cameras[index];
            request.get('http://'+camera.user+':'+camera.password+'@'+camera.host)
            .on('data', function(chunk) {
                data.push(chunk);  
            })
            .on('end', function(chunk) {
                //create file
                fs.writeFileSync(__dirname +'/images/'+camera.name+'.jpg', data.read());
                //stream file to socket
                fs.readFile(__dirname + '/images/'+camera.name+'.jpg', function(err, buf){
                    self.io.sockets.emit(camera.name, { image: true, buffer: buf.toString("base64") });
                });
            })
            .on('error', function(error){
                console.log(error);
            });
            await sleep(1000);
            self.stream(index);
        }
    }
}

        
 module.exports = new CamerasPlugin();