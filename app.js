var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const https = require('https');
const bl = require('bl');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/', function(req, res) {
    console.log(req.body);

    var params = req.body.text.split(" ");
    var command = req.body.command;
    var command2 = params[0];

    switch (command2) {
        case 'meetups':
            getEventList(res);
            break;
        default:
            res.send("command not implemented");
            break;
    }

});


var getEventList = function(response) {
    https.get('https://api.meetup.com/IV-DEVS/events/', (res) => {

        console.log('statusCode: ', res.statusCode);

        res.pipe(bl(function(err, data) {
            if (err)
                return console.error(err);
            data = JSON.parse(data.toString());
            var text = 'Proximos Meetups: \n';
            data.forEach(function(element, index) {
                var eventName = element.name;
                var eventPlace = element.hasOwnProperty('venue') ? element.venue.name : 'Lugar a definir';
                var link = element.link;
                var date = new Date(1000 * element.time).toUTCString();
                text += eventName + ' - ' + eventPlace + ' - ' + date + ' More info : ' + link + '\n';
            });

            response.json({
                text: text
            });
        }));

    }).on('error', (e) => {
        console.error(e);
        response.send(e);
    });
}
app.listen(3000);