﻿//Utility library for Wakanda JSE Sponsor application.var jseUtil = (function() {	//P R I V A T E   M E T H O D S   (S T A R T).	function bind(context, methodName) {	  return function() {	  	return context[methodName].apply(context, arguments);	  };	}	//P R I V A T E   M E T H O D S   (E N D).		var jseUtilObj = {}; //This is the object we will return to create our module.		jseUtilObj.mainMenubarObj = null;		//M E T R O   R A D I O   B U T T O N   T A B   (S T A R T)	//Let's make a Metro Radio Button Tab constructor.	jseUtilObj.MetroRadioMenuBar = function (el) {		this.el = document.getElementById(el);			//Implement a simple example of Observer pattern.		this.subscribers =  {			any: []		};				this.handleClick = function(ev) {			var theRadioButton = $('#' + ev.currentTarget.id),			radioButtonsContainer = theRadioButton.parent();						radioButtonsContainer.children().removeClass('selectedRadio');			theRadioButton.addClass('selectedRadio');		 	this.publish({buttonElemId: ev.currentTarget.id}, "on select");		};				//Create event handler.		$(this.el).off('click', 'button');		$(this.el).on('click', 'button', bind(this, "handleClick"));	};		jseUtilObj.MetroRadioMenuBar.prototype.setSelectedMenuItem = function(num, optionsObject) {	  var radioButtonsContainer$ = $(this.el),	  childButtons$ = radioButtonsContainer$.children('button');	  childButtons$.removeClass('selectedRadio');	  childButtons$.eq(num).addClass('selectedRadio');	  this.publish({buttonElemId: childButtons$.eq(num)["0"].id, options: optionsObject}, "on select");	};		//Observer Pattern methods.	jseUtilObj.MetroRadioMenuBar.prototype.subscribe = function(fn, type) {		type = type || 'any';		if (typeof this.subscribers[type] === 'undefined') {			this.subscribers[type] = [];		}		this.subscribers[type].push(fn);	}; //end - subscribe.		jseUtilObj.MetroRadioMenuBar.prototype.visitSubscribers = function(action, arg, type) {		var pubtype = type || 'any',			subscribers = this.subscribers[pubtype],			i,			max = subscribers.length;					for (i = 0; i < max; i += 1) {			if (action === 'publish') {				subscribers[i](arg);			} else {				if (subscribers[i] === arg) {					subscribers.splice(i, 1);					}			}		} //end - for	}; //end - visitSubscribers.		jseUtilObj.MetroRadioMenuBar.prototype.publish = function(publication, type) {		this.visitSubscribers('publish', publication, type);	};	//M E T R O   R A D I O   B U T T O N   T A B   (E N D)					jseUtilObj.signIn = function(signInObj) {		if (waf.directory.loginByPassword(signInObj.email, signInObj.password)) { //"troxell"			return true;		} else {			return false;		} //end - if (waf.directory.loginByPassword	}; //end - jseUtilObj.signIn.				jseUtilObj.signOut = function() {		if (WAF.directory.logout()) {			return true;		} else {			return false;		}	}; //end - jseUtilObj.signOut.		//M E S S A G E   O B J E C T	jseUtilObj.setMessage = function(text, displayTime, messageType) {		var displayTime = displayTime || 5000,			messageType = messageType || "normal";		//$$('messageText').setTextColor('#cc0000'); //e60000 4c4c4c		switch(messageType) {			case "normal" :			$$('messageText').setTextColor('#4c4c4c'); 			break;			case "error":			$$('messageText').setTextColor('#cc0000'); 			break;			default:			$$('messageText').setTextColor('#4c4c4c'); 		}		$$('messageText').setValue(text);		$('#messageContainer').fadeIn(700); //show		setTimeout(function() {$('#messageContainer').fadeOut(900);}, displayTime); //.hide	};		return jseUtilObj;}()); 