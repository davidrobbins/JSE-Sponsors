﻿//staff account: username: "lyle", password: "davesnothere"//Let's test our email daemon../*var theEmailWorker = new SharedWorker("Workers/emailDaemon.js", "emailDaemon");var thePort = theEmailWorker.port; // MessagePort to communicate with the email shared worker.thePort.postMessage({what: 'sendNewPassword', recipient: "davidrobbins2011@gmail.com", password: "davesnothere"});thePort.postMessage({what: 'htmlEmailTest', name: "Dave", value: "Robbins"});*///var one = ds.Person("9FA0221F4C474350997D83973DB7B16F")//one.interestCollection//ds.Interest.all()//ds.Interest.query("person.ID = :1", "4C651C5357904FC09B9A2EF3E2797161")//ds.Person.query("ID = :1", "FFB13DA2170A44DBB614BC80B8A85C1B")//7968B1A275A84A4C9FA36589690BCEBC/**/if (loginByPassword("lyle", "davesnothere")) {	ds.Person.all()//	ds.Interest.remove();//	ds.Person.remove();//	ds.Sponsor.remove();}//ds.Person.all()/*var interestArr = [];//Interestds.Interest.remove();var people = ds.Person.all();var sponsors = ds.Sponsor.all();people.forEach(function(person) {	sponsors.forEach(function(sponsor) {		interestArr.push({person: person.firstName, sponsor: sponsor.name});	});});interestArr*//*var assetsPath = application.getFolder('path') + "assets" + '/',	sponsorPath = assetsPath + "sponsor.json",	sponsorContent = null,	sponsorList = null;		ds.Sponsor.remove();debugger	sponsorContent = loadText(sponsorPath);sponsorList = JSON.parse(sponsorContent);for (var i = 0, len = sponsorList.length; i < len; i++) {	var sponsor = new ds.Sponsor(sponsorList[i]);	sponsor.save();}*/