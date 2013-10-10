
WAF.onAfterInit = function onAfterInit() {// @lock

	var itemsUL$ = $('#itemsUL'),
	//Get jQuery reference to our <ul> for listing the collection.
	listTemplateSource = $("#list-template").html(),
	listTemplateFn = Handlebars.compile(listTemplateSource),
	loginContainer$ = $('#loginContainer'),
	appContainer$ = $('#appContainer'),
	signOutButton$ = $('#signOutButton'),
	signedInText = $$('signedInMessageText');
	
	function buildItemsList() {
		itemsUL$.children().remove(); 
		
		ds.Interest.all({
			autoExpand: "person, sponsor",
			onSuccess: function(ev1) {
				ev1.entityCollection.forEach({
					onSuccess: function(ev2) {
						itemData = 	{
							//sponsorName: ev2.entity.sponsor.relEntity.name.getValue(),
							imagePath: "/rest/Sponsor(" + ev2.entity.sponsor.relEntity.ID.getValue() + ")/logo?$imageformat=best&$expand=logo"
						}
						itemsUL$.append(listTemplateFn(itemData));
					}
				}); //ev1.entityCollection.forEach
			} //end - onSuccess: function(ev1)
		}); //end- ds.Interest.all();
	} //end - buildItemsList.
	
	function signMeIn(signInObj) {
		if (jseUtil.signIn(signInObj)) {
			loginContainer$.hide();
			signOutButton$.show();
			appContainer$.show();
			signedInText.setValue(waf.directory.currentUser().userName + " share your email with our sponsors: ");
			buildItemsList();
			
		} else {
			loginContainer$.show();
			signOutButton$.hide();
			appContainer$.hide();
			signedInText.setValue("");
			jseUtil.setMessage("We could not sign you in.", 5000, "normal"); //error
		} //end - if (jseUtil.signIn(signInObj)).
	} //end - signMeIn().
	
// @region namespaceDeclaration// @startlock
	var signOutButton = {};	// @button
	var signInButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	signOutButton.click = function signOutButton_click (event)// @startlock
	{// @endlock
		if (jseUtil.signOut()) {
			appContainer$.hide();
			signedInText.setValue("");
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
		//Make return key trigger login when user email or password input fields have focus.
		$("#textField2, #textField3").on('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			signMeIn(signInObj);
	    	}
		});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("signOutButton", "click", signOutButton.click, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
