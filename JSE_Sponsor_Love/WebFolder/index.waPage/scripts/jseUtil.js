﻿//Utility library for Wakanda JSE Sponsor application.var jseUtil = (function() {	//Private Functions and Vars ----- Start	//Private Functions and Vars ----- End		var jseUtilObj = {}; //This is the object we will return to create our module.				jseUtilObj.signIn = function(signInObj) {		if (waf.directory.loginByPassword(signInObj.email, signInObj.password)) {			return true;		} else {			return false;		} //end - if (waf.directory.loginByPassword	}; //end - jseUtilObj.signIn.				jseUtilObj.signOut = function() {		if (WAF.directory.logout()) {			return true;		} else {			return false;		}	}; //end - jseUtilObj.signOut.				return jseUtilObj;}()); 