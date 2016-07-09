var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var SlackCommand = require('./command');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.post('/', function(req, res) {
    console.log(req.body);

    var args = req.body.text.split(" ");
    var command = args.shift();
    var slackCommand = new SlackCommand();
    slackCommand.exec(command, args, function(err, data) {
        if (err) res.send(err);
        else res.json(data);
    });

});

var port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port);