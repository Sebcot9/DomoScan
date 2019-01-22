const { exec } = require('child_process');

async function work(cmds) {
    for(var i in cmds){
        console.log(cmds[i]);
	exec(cmds[i]);
	await sleep(500);
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


class PluginAndroidTV {
	
	constructor(){
		this.host= require("./config.json").device;
		this.channels = require("./lib/channels.json");
		this.script = __dirname+"/lib/android-tv-remote.py";
	}
	
	sendChannel(channelName){
            var channelNumber = this.channels[channelName];
            if(channelNumber){
                this.sendChannelByNumber(channelNumber);
            }else{
                throw "Nom de chaîne incorect, réessayer";
            }
	}
        
        sendChannelByNumber(channelNumber){
            var cmds= [];
            for(var i=0; i<channelNumber.length; i++){
                    var value = channelNumber[i];
                    var cmd='python '+this.script+' --host '+this.host+' --input KEYCODE_'+value;
                    cmds.push(cmd);
            }
            work(cmds);
	}
        
        sendCommand(command){
            var cmd='python '+this.script+' --host '+this.host+' --input KEYCODE_'+command;
            work([cmd]);
	}
}

module.exports = new PluginAndroidTV();