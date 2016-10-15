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
day = tomorrowDate.getDate();
month = tomorrowDate.getMonth() + 1;
year = tomorrowDate.getFullYear();
var tomorrow = year + "-" + month + "-" + day;
var todEvents = [];
var tomEvents = [];
var sortTodEvents = [];
var sortTomEvents = [];

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(request,response){
        for(var i = 0; i < orgs.length; i++){
                needle.get("https://graph.facebook.com/v2.8/" + orgs[i] + "/events?access_token=1811986875725516%7C5795c6703e4db096806ef20f81de9fd0&__mref=message_bubble", function(error, response) {
                        if (!error && response.statusCode == 200)
                                for(var j = 0; j < response.body.data.length; j++){
                                        var start = response.body.data[j].start_time;
                                        if(start.includes(today)){
                                                todEvents.push(response.body.data[j]);
                                        }
                                        else if(start.includes(tomorrow)){
                                                tomEvents.push(response.body.data[j]);
                                        }
                                }
                        for(var k = 0; k < todEvents.length; k++){
                                var eventTime = todEvents[k].start_time.substring(11,13) + todEvents[k].start_time.substring(14,16);
                                var eventTimeTemp = parseInt(eventTime);
                                //console.log(eventTimeTemp);
                                var eventObj = {"time": eventTimeTemp,"event": todEvents[k]}
                                sortTodEvents[k] = eventObj;
                                sortTodEvents.sort(function(a, b) {
                                        return a.time - b.time;
                                });
                        }

                        for(var k = 0; k < tomEvents.length; k++){
                                var eventTime = tomEvents[k].start_time.substring(11,13) + tomEvents[k].start_time.substring(14,16);
                                var eventTimeTemp = parseInt(eventTime);
                                //console.log(eventTimeTemp);
                                var eventObj = {"time": eventTimeTemp,"event": tomEvents[k]}
                                sortTomEvents[k] = eventObj;
                                sortTomEvents.sort(function(a, b) {
                                        return a.time - b.time;
                                });
                        }
                });
        }
})
app.post("/derp",function(request,response){
        console.log(request.body);
        var name = request.body.name;
        response.send("Hello " + name);
})
app.set("port",(5000));
app.listen(app.get("port"),function(){

})
