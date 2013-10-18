
var Inotify = require('inotify').Inotify;

var inotify = new Inotify();

var mailer = require('./lib/mailer');

var callback = function(event) {
    var mask = event.mask;
    var type = mask & Inotify.IN_ISDIR ? 'directory ' : 'file ';
    event.name ? type += ' ' + event.name + ' ': ' ';

    if(mask & Inotify.IN_CLOSE_WRITE) {

        var email = "cbottner@hotmail.com";

        mailer.sendTo(email, function(e){
            console.log("Email was sent");
        });
    }
}

var watch = inotify.addWatch({ 
    path: './',
    watch_for: Inotify.IN_CLOSE_WRITE,
    callback: callback
});

console.log("ready");
