var express = require("express");
var bodyparser = require("body-parser");
var app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(request,response){
        console.log("Hello World!");
        response.send("Heyo");
})
app.post("/derp",function(request,response){
        console.log(request.body);
        var name = request.body.name;
        response.send("Hello " + name);
})
app.set("port",(5000));
app.listen(app.get("port"),function(){

})
