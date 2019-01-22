var alarmClock = require("./index.js");

class AlarmClockController {
        
        constructor(io){
            this.io = io;
            alarmClock.setIO(io);
        }
        
	postAction(req, res){
            switch(req.params.actionId){
                case "getWakeUp":
                    var response= "Le réveil est réglé sur "+alarmClock.houre+" heure ";
                    if(alarmClock.minutes){
                            response+= alarmClock.minutes;
                    }
                    res.end(JSON.stringify({resultText: response}));
                    break;
                case "changeWakeUp":
                    alarmClock.houre = req.body.houre;
                    alarmClock.minutes = req.body.minutes;
                    alarmClock.updateActionsSheduleTask();
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                default:
                        res.end(JSON.stringify({}));
                    break;
            }
	}
}

module.exports = AlarmClockController;