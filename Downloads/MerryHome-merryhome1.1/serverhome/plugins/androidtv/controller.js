var androidtv = require("./index");

class AndroidTVController {
        
        constructor(io){
            this.io = io;
        }
        
        getView(req, res){
            var dataView = require("./view");
            res.end(JSON.stringify(dataView));
        }
        
	postAction(req, res){
            switch(req.params.actionId){
                case "changeChanel":
                    let name = req.body.channelValue.toUpperCase();
                    try{
                        androidtv.sendChannel(name);
                        res.end(JSON.stringify({resultText: "ok"}));
                    }catch(error){
                        res.end(JSON.stringify({resultText: error}));
                    }
                    break;
                case "changeChanelByNumber":
                    let chanelNumber = req.body.data;
                    console.log("changeChanelByNumber "+chanelNumber);
                    androidtv.sendChannelByNumber(chanelNumber);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "volumeUp":
                    console.log("androidtv volumeUp");
                    androidtv.sendCommand("VOLUME_UP");
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "volumeDown":
                    console.log("androidtv volumeDown");
                    androidtv.sendCommand("VOLUME_DOWN");
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "volumeMute":
                    console.log("androidtv volumeMute");
                    androidtv.sendCommand("VOLUME_MUTE");
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                default:
                        res.end(JSON.stringify({}));
                    break;
            }
	}
}

module.exports = AndroidTVController;