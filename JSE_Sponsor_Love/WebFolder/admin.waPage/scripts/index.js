
WAF.onAfterInit = function onAfterInit() {// @lock
	signOutButton$ = $('#signOutButton'),
	loginContainer$ = $('#loginContainer'),
	adminHomeContainer$ = $('#adminHomeContainer');
	
	function signMeIn(signInObj) {
		if (jseUtil.signIn(signInObj)) {
			loginContainer$.hide();
			signOutButton$.show();
			adminHomeContainer$.show();
			//signedInText.setValue(waf.directory.currentUser().userName + " share your email with our sponsors: ");
			signInObj.email = "";
			signInObj.password = "";
			waf.sources.signInObj.sync();
			jseUtil.setMessage("Welcome " + waf.directory.currentUser().fullName, 5000, "normal"); //error		
		} else {
			loginContainer$.show();
			signOutButton$.hide();
			adminHomeContainer$.hide();
			//signedInText.setValue("");
			jseUtil.setMessage("We could not sign you in.", 5000, "normal"); //error		
		} //end - (jseUtil.signIn(signInObj)).
	} //end - signMeIn(signInObj).
	
	
// @region namespaceDeclaration// @startlock
	var signOutButton = {};	// @button
	var signInButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	signOutButton.click = function signOutButton_click (event)// @startlock
	{// @endlock
		if (jseUtil.signOut()) {
			adminHomeContainer$.hide();
			//signedInText.setValue("");
			signOutButton$.hide();
			loginContainer$.show();
		}
	};// @lock

	signInButton.click = function signInButton_click (event)// @startlock
	{// @endlock
		signMeIn(signInObj);
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("signOutButton", "click", signOutButton.click, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
