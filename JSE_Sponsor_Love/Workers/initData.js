﻿var assetsPath = application.getFolder('path') + "assets" + '/',	peopleFile = File(assetsPath + "people.txt"), //"peopleTest.txt"  people.txt	sponsorPath = assetsPath + "sponsor.json",	logosPath = assetsPath + "logos/";	sponsorContent = null,	sponsorList = null,	currentLogoPath = null,	theEmailWorker = new SharedWorker("Workers/emailDaemon.js", "emailDaemon"),	thePort = theEmailWorker.port,	mail = require('waf-mail/mail'); // MessagePort to communicate with the email shared worker.	function sendTheMail(recipient, password, userID) {	//var mail = require('waf-mail/mail'),	var	username = 'jseverywhere2013', // enter a valid account here		password = 'davelylexiang',  // enter a valid password here		address = 'smtp.gmail.com',		port = 465,  // SSL port				recip =  recipient, //"davidrobbins2011@gmail.com"		mailMessage = new mail.Mail(),		mailBody = "";		mailBody += "<html>";	mailBody += "We are so glad you are joining us for JS.everywhere(2013).";	mailBody += "<br/><br/>";	mailBody += "We are also very pleased to be sponsored by some great companies.";	mailBody += "In an effort to connect you with our sponsors we are empowering you to decide ";	mailBody += "who get's your email and contact info. ";	mailBody += "Additionally some of our speakers are doing some drawings ";	mailBody += "for free goodies, and they will pick random names ";	mailBody += "from the list of you who have chosen to hear from them. ";	mailBody += "Does that make sense? Well it will.";		mailBody += "<br/><br/>";		mailBody += "The long and the short of it is use the link below to auto-login and ";	mailBody += "choose which companies you want to hear from.";		mailBody += "<br/><br/>";		var loginURL = "http://jse.4d.com/fastLogin/" + message.userID + "/" + message.password;	mailBody += '<a href="' + loginURL + '">JSE 2013 Sponsors</a>';			mailBody += "<br/><br/>";	mailBody += "Here is your password in case you need to login with your email address: " + password;	mailBody +="</html>";							mailMessage.setBodyType("text/html");	mailMessage.from= username + '@gmail.com';	mailMessage.to=recip;	mailMessage.subject = "JS.everywhere(2013) - App Invite";	mailMessage.setBody(mailBody); 	//mailMessage.setBody('<html><b>Login to jsesponsors.com</b><br/>Your email is your username. Here is your password: ' + message.password + '<br/><br/></html>'); 	mailReturnObj = mailMessage.send(address, port , true, username, password);		new ds.Log({email: recip, sent: mailReturnObj.isOk, action: mailReturnObj.action}).save();}//Winnersds.Winner.remove();	//Peopleds.Person.remove();if (ds.Person.length == 0) {	var input = TextStream(peopleFile,"read");	if (!input.end()) {				var count = 0;				while (!input.end()) {			record = input.read("\n");//read one row  \n			var recordArray = record.split("\t");			if (recordArray.length > 1) {				var personRow = new ds.Person();				personRow.attendeeNumber 	= count; 				personRow.firstName 		= recordArray[1];				personRow.lastName 			= recordArray[0];				personRow.email 			= recordArray[2];								count += 1;								//Let's generate the password and send it to them.				var thePassword 			= require('utils').generatePassword(); 				personRow.password  		= thePassword;				personRow.loginCode  		= thePassword; //Just for now so I can see the passwords. Repurpose it later. Oct 11, 2013				//Pass the info to our email daemon so it can send the password to our new user.				//thePort.postMessage({what: 'sendNewPassword', recipient: personRow.email, password: thePassword});								personRow.save();								thePort.postMessage({what: 'sendNewPassword', recipient: personRow.email, password: thePassword, userID: personRow.ID});				//sendTheMail(personRow.email, thePassword, personRow.ID);											} //end - if (recordArray.length > 1).		} //end - while (!input.end()).		input.close();	} //end - if (!input.end()).}//end - if (ds.Person.length === 0).			//Sponsorsds.Sponsor.remove();sponsorContent = loadText(sponsorPath);sponsorList = JSON.parse(sponsorContent);for (var i = 0, len = sponsorList.length; i < len; i++) {	var sponsor = new ds.Sponsor(sponsorList[i]);	//Get logo	currentLogoPath = logosPath + sponsorList[i].logoPictureName;	sponsor.logo = loadImage(currentLogoPath);	sponsor.save();}			//Interestds.Interest.remove();var people = ds.Person.all();var sponsors = ds.Sponsor.all();people.forEach(function(person) {	sponsors.forEach(function(sponsor) {		new ds.Interest({			hire: false,			info: false,			person: person,			sponsor: sponsor		}).save();	});});			