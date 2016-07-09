const MeetupAPI = require('meetup-api')()
const Meetup = function() {};

Meetup.prototype.list = function(callback) {
    $this = this;
    MeetupAPI.getEvents({
        'group_urlname': 'IV-DEVS'
    }, callback)
};

Meetup.prototype.slackFormat = function(list) {
    $this = this;

    var text = 'Proximos Meetups: \n';

    list = list.results;

    for (var index in list) {
        console.log(list[index]);
        var eventName = list[index].name;
        var eventPlace = list[index].hasOwnProperty('venue') ? list[index].venue.name : 'Lugar a definir';
        var link = list[index].event_url;
        var eventDate = new Date(list[index].time);
        eventDate = eventDate.getDay() + '-' + eventDate.getMonth() + '-' + eventDate.getFullYear();

        text += eventName + ' - ' + eventPlace + ' - ' + eventDate + ' More info: ' + link + ' \n';
    }

    return text;
};

Meetup.prototype.getEvents = function(callback) {
    $this = this;
    $this.list(function(err, list) {
        if (err) return callback(err);
        console.log(list.results);
        callback(err, {
            text: $this.slackFormat(list),
            response_type: 'ephemeral'
        });
    })
}

module.exports = new Meetup();