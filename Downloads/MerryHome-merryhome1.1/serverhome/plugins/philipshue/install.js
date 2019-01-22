var HueApi = require("node-hue-api").HueApi;
 
var host = "192.168.1.XX",
    userDescription = "device description goes here";
 
var displayUserResult = function(result) {
    console.log("Created user: " + JSON.stringify(result));
};
 
var displayError = function(err) {
    console.log(err);
};
 
var hue = new HueApi();
 
// --------------------------
// Using a promise
hue.registerUser(host, userDescription)
    .then(displayUserResult)
    .fail(displayError)
    .done();