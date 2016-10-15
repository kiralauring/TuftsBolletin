var express = require("express");
var bodyparser = require("body-parser");
var needle = require("needle");
var app = express();

var orgs = require('./org.json');

var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
var today = year + "-" + month + "-" + day;
var tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
day = currentDate.getDate();
month = currentDate.getMonth() + 1;
year = currentDate.getFullYear();
var tomorrow = year + "-" + month + "-" + day;
var events = [];

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(request,response){
        for(var i = 0; i < orgs.length; i++){
                console.log(orgs[i]);
                needle.get("https://graph.facebook.com/v2.8/" + orgs[i] + "/events?access_token=1811986875725516%7C5795c6703e4db096806ef20f81de9fd0&__mref=message_bubble", function(error, response) {
                        var start;
                        if (!error && response.statusCode == 200)
                                for(var j = 0; j < response.body.data.length; j++){
                                        start = response.body.data[j].start_time;
                                        if(start.includes(today)||start.includes(tomorrow)){
                                                console.log(response.body.data[j]);
                                                events.push(response.body.data[j]);
                                        }
                                }
                });
        }
        for(var k = 0; k < events.length; k++)
                console.log(events[k]);
})
app.post("/derp",function(request,response){
        console.log(request.body);
        var name = request.body.name;
        response.send("Hello " + name);
})
app.set("port",(5000));
app.listen(app.get("port"),function(){

})
