const SlackCommand = require('./command');
const slackCommand = new SlackCommand();

var args = ['help', 1, 2, 3, 4];
var command = args.shift();

console.log(slackCommand.exec(command, args));