
var express = require('express');
var bodyParser = require('body-parser');
// Why don't we need to require Jade? Because it is built into express!


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // Where I am storing my static content (pictures of heroes, stylesheets, and template files)

app.set('port', (5000));
app.set('view engine', 'pug'); // Tell express to use jade for templating

app.get('/', function(request, response) {
	var eventNameV = "dummy Event";
	var hostV = "dummy Host";
	var desV = "dummy des dummy des dummy des dummy des dummy des dummy des";
	var rsvpV = "https://google.com/"
	var timeV = "8:00 PM"

                response.render('layoutclndr', { // format for providing data to template is templateVariable: nodeVariable
			    eventName: eventNameV,
			    host: hostV,
			    des: desV,
			    facebookLink: rsvpV,
			    time: timeV
                });
                response.end();
                return;
});


app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
});
