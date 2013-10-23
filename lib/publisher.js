
var Kinvey = require('kinvey');

var promise = Kinvey.init({
    appKey    : 'kid_TPuvIvc3fq',
    appSecret : '99e7ef016ff24348873d4aa19d30fa62'
});

exports.init = function(callback) {
	promise.then(function(activeUser) {
	    Kinvey.ping().then(function(response) {
	        console.log('Kinvey Service is alive');

	        Kinvey.User.login('publisher', 'publisher', {
	            success: function(response) {
	                callback();
	            }
	        });
	    }, 
	    function(error) {
	        console.log('Kinvey Ping Failed. Response: ' + error.description);
	    });
	}, 
	function(error) {
	    console.log("Error with Kinvey");
	});	
}

exports.getEmails = function() {
	
}
