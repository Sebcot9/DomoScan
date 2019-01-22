var androidtv = require("../plugins/androidtv/index.js");

module.exports = function(agent) {  
	let name = agent.parameters.TVChannels;
	androidtv.sendChannel(name);
	agent.close('ok');
}