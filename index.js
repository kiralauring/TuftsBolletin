var express = require("express");
var bodyparser = require("body-parser");
var needle = require("needle");
var app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(request,response){
        needle.get('https://graph.facebook.com/v2.8/118585304884933/events?access_token=1811986875725516%7C5795c6703e4db096806ef20f81de9fd0&__mref=message_bubble', function(error, response) {
                if (!error && response.statusCode == 200)
                        console.log(response.body);
        });
})
app.post("/derp",function(request,response){
        console.log(request.body);
        var name = request.body.name;
        response.send("Hello " + name);
})
app.set("port",(5000));
app.listen(app.get("port"),function(){

})
