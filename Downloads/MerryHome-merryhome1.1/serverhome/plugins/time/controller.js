class TimeController {
	
        constructor(io){
            this.io = io;
        }
        
	postAction(req, res){
		var now = new Date();
		var response= "Il est "+now.getHours()+" heure "+now.getMinutes()+".";
		res.end(JSON.stringify({resultText: response}));
	}
}

module.exports = TimeController;