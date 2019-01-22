var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

class PluginHue{
     
    constructor(){
        var connect = require("./config.json");
        this.user=connect.user;
        this.host=connect.host;
        this.config={};
        var self = this;
        this.api = new HueApi(this.host, this.user);
        this.api.getFullState(function(err, config) {
            //console.log(JSON.stringify(config.lights, null, 2));
            self.config = config;
        });
        this.state = lightState.create();
    }
    
    changeState(lampeId, value){
        this.config.lights[lampeId].state.on= value;
        this.api.setLightState(lampeId, {"on": value}) // provide a value of false to turn off
        .then(this.displayResult)
        .fail(this.displayError)
        .done();
    }
    
    displayResult(result) {
        //console.log(result);
    };
 
    displayError(err) {
        console.error(err);
    };
}

module.exports = new PluginHue();