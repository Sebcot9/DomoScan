require('localenv');
var port = process.env.PORT || 3300,
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    cors = require('cors'),
    app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Basic Auth
const basicAuth = require('express-basic-auth');
app.use(basicAuth({
    users: { [process.env.SERVER_USERNAME] : process.env.SERVER_PASSWORD },
        challenge: true,
        realm: 'Imb4T3st4pp'
    }));
//create server and socket
var server = require('http').createServer(app);
var io = require('socket.io')(server,  { pingTimeout: 30000 });

require('socketio-auth')(io, {
  authenticate: function (socket, data, callback) {
    //get credentials sent by the client
    var username = data.username;
    var password = data.password;
    return callback(null, username === process.env.SERVER_USERNAME && password=== process.env.SERVER_PASSWORD );
  }
});

//Routes
var serverRoutes = require('./routes/routes');
serverRoutes(app, io);

//Server web http
server.listen(port, function () {
  console.log('serverhome app listening on port '+port+'!')
});