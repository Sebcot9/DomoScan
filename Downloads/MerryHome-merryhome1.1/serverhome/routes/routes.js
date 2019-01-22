//Setting routes
const fs = require('fs');

module.exports = function(app, io) {  
	
	app.get('/', function (req, res) {
		res.send('MerryHome server welcoms;p');
	});
	
        //Search and load all plugins
	var pluginsFolder=__dirname+"/../plugins";
        var pluginsForMenu = [];
        var plugins= [];
	fs.readdir(pluginsFolder, (err, files) => {
            files.forEach(file => {
                //if controller exists add plugin controller url
                var path = pluginsFolder+"/"+file+"/controller.js";
                if (fs.existsSync(path)) {
                    plugins.push(file);
                    console.log("setting plugin "+file);
                    var classPluginController= require(path);
                    var tmpPluginController = new classPluginController(io);
                    app.post('/api/'+file+'/action/:actionId', tmpPluginController.postAction);
                    //if view exists add plugin view url
                    if(tmpPluginController.getView){
                        app.get('/api/'+file+'/view', tmpPluginController.getView);
                        pluginsForMenu.push(file);
                    }
                }
            });
	});
        
	//Url for getting a list of plugin view
	app.get('/api/plugins', function (req, res) {
		res.end(JSON.stringify(pluginsForMenu));
	});
        
        //Url for getting all plugins expressions
        app.get('/api/expressions', function (req, res) {
            var allExpression= {};
            for(var i=0; i<plugins.length; i++){
                var pathExpressions = pluginsFolder+"/"+plugins[i]+"/expressions.json";
                if (fs.existsSync(pathExpressions)) {
                    var expressions= require(pathExpressions);
                    allExpression[plugins[i]]= expressions;
                }
            }
            res.send(JSON.stringify(allExpression));
	});
	
        //Url for getting all plugins configs
        app.get('/api/configs', function (req, res) {
            var allConfigs= {};
            for(var i=0; i<plugins.length; i++){
                var pathConfig = pluginsFolder+"/"+plugins[i]+"/config.json";
                if (fs.existsSync(pathConfig)) {
                    var config= require(pathConfig);
                    allConfigs[plugins[i]]= config;
                }
            }
            res.send(JSON.stringify(allConfigs));
        });
	
        //config actions google assistant
	var {dialogflow} = require('actions-on-google');
	var assistant = dialogflow();
	var helloWorldIntent= require("../google_intents/HelloWordIntent");
	var androidTVIntent= require("../google_intents/AndroidTVIntent");
	assistant.intent('helloWorld', helloWorldIntent);
	assistant.intent('AndroidTV', androidTVIntent);
	app.post('/webhook', assistant);
}