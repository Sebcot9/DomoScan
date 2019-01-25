class MyPLugin{
     
    constructor(){
        var connect = require("./config.json");
        this.user=connect.user;
    }
}

module.exports = new MyPLugin();