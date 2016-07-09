const meetups = require('./meetup');

function Command() {
    this.isCommand = function(_command) {
        return this.hasOwnProperty(_command);
    },
    this.exec = function(_command, args, callback) {
        if (!this.isCommand(_command))
            return callback("Syntax Error: Command not found.");

        return this[_command](args, callback);
    }
}

function SlackCommand() {
    Command.call(this);

    this.help = function(args, callback) {
        return callback("Help command " + args);
    },
    this.meetups = function(args, callback) {
        meetups.getEvents(callback);
    }
};


module.exports = SlackCommand;