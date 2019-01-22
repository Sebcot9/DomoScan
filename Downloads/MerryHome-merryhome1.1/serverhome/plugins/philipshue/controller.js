var philipshue = require("./index");

class HueController {
	
        constructor(io){
            this.io = io;
            
        }
        
        getView(req, res){
            var dataView = require("./view")(philipshue);
            //console.log(dataView);
            res.end(JSON.stringify(dataView));
        }
        
	postAction(req, res){
            switch(req.params.actionId){
                case "turnlightOn":
                    philipshue.changeState("2", true);
                    philipshue.changeState("4", true);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "turnlightOff":
                    philipshue.changeState("2", false);
                    philipshue.changeState("4", false);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "turnLitlelightOn":
                    philipshue.changeState("2", true);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "turnLitlelightOff":
                    philipshue.changeState("2", false);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "changeStatus":
                    philipshue.changeState(req.body.device, req.body.value);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                default:
                    res.end(JSON.stringify({}));
                    break;
            }
	}
}

module.exports = HueController;