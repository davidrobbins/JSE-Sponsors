
WAF.onAfterInit = function onAfterInit() {// @lock
	signOutButton$ = $('#signOutButton'),
	loginContainer$ = $('#loginContainer'),
	adminHomeContainer$ = $('#adminHomeContainer'),
	cardThree = $$('cardThreeContainer'),
	cardTwo = $$('cardTwoContainer'),
	cardOne = $$('cardOneContainer');
	
	function signMeIn(signInObj) {
		if (jseUtil.signIn(signInObj)) {
			loginContainer$.hide();
			signOutButton$.show();
			adminHomeContainer$.show();
			//signedInText.setValue(waf.directory.currentUser().userName + " share your email with our sponsors: ");
			signInObj.email = "";
			signInObj.password = "";
			waf.sources.signInObj.sync();
			//jseUtil.setMessage("Welcome " + waf.directory.currentUser().fullName, 5000, "normal"); //error		
		} else {
			loginContainer$.show();
			signOutButton$.hide();
			adminHomeContainer$.hide();
			//signedInText.setValue("");
			//jseUtil.setMessage("We could not sign you in.", 5000, "normal"); //error		
		} //end - (jseUtil.signIn(signInObj)).
	} //end - signMeIn(signInObj).
	
	function handleMainMenuBarSelect(ev) {
		switch(ev.buttonElemId) {
			case "adminOneButton" :
			//console.log('one clicked');
			cardOne.show();
			cardTwo.hide();
			cardThree.hide();
			break;
			
			case "adminTwoButton" :
			//console.log('two clicked');
			cardOne.hide();
			cardTwo.show();
			cardThree.hide();
			break;
			
			case "adminThreeButton" :
			//console.log('three clicked');
			cardOne.hide();
			cardTwo.hide();
			cardThree.show();
			break;
		} //end - switch(ev.buttonElemId).

	} //end - handleMainMenuBarSelect.
	
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
		jseUtil.mainMenubarObj = new jseUtil.MetroRadioMenuBar('mainMenubarContainer');
		jseUtil.mainMenubarObj.subscribe(handleMainMenuBarSelect, "on select"); 
		jseUtil.mainMenubarObj.setSelectedMenuItem(0);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("signOutButton", "click", signOutButton.click, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
