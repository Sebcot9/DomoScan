const schedule = require('node-schedule');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class AlarmClock {
	
	constructor(){
            var config = require("./config.json");
            this.io = null;
            this.houre= config.houre;
            this.minutes= config.minutes;
            var self = this;
            this.job = schedule.scheduleJob('0 '+this.minutes+' '+this.houre+' * * *', function(){
                    self.alarm();
            });
	}
        
	setIO(io){
            this.io = io;
        }
        
	updateActionsSheduleTask(){
            console.log("update wakeup");
            if(this.job){
                this.job.cancel();
            }
            var self = this;
            this.job = schedule.scheduleJob('0 '+this.minutes+' '+this.houre+' * * *', function(){
                self.alarm();
            });
	}
        
        async alarm(){
            console.log("do alarm clock actions ...");
            this.io.sockets.emit('serversays', "Bonjour");
            await sleep(3000);
            this.io.sockets.emit('serversays', "Il est l'heure de se lever");
        }
}

module.exports = new AlarmClock();

