
var emailTemplates = require('email-templates');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "noreply@presseagles.com",
        pass: "superraptor"
    }
});

var path = require('path').join(__dirname, '../views');

exports.sendTo = function(email, success) {

	emailTemplates(path, function(err, template) {

		if (err) {
    		console.log(err);
  		} 
  		else {
  			var locals = {email: email};

  			template("publisher", locals, function(err, html, text) {

  				if (err) {
        			console.log(err);
      			} 
      			else {

      				smtpTransport.sendMail({
					    from: "Press Eagles <noreply@presseagles.com>",
					    to: email,
					    subject: "New",
					    html: html
					}, 
					function(error, response) {
					    if(error){
					        console.log(error);
					    }
					    else{
					    	// falta confirmar que el mensaje fue exitosamente enviado

					        console.log("Message sent: " + response.message);
					        success(email);
					    }
					});
      			}
  			});
		}
	});
}


