
var Inotify = require('inotify').Inotify;
var inotify = new Inotify();

var notification = function() {
}

var _callback = function(event) {
    var mask = event.mask;
    var type = mask & Inotify.IN_ISDIR ? 'directory ' : 'file ';
    event.name ? type += ' ' + event.name + ' ': ' ';

    if(mask & Inotify.IN_CLOSE_WRITE) {
    	notification();
    }
}

var watch = inotify.addWatch({ 
    path: './',
    watch_for: Inotify.IN_CLOSE_WRITE,
    callback: _callback
});

exports.notification = function(callback) {
	notification = callback;
}
