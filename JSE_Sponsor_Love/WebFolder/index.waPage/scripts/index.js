
WAF.onAfterInit = function onAfterInit() {// @lock

	var itemsUL$ = $('#itemsUL'),
	//Get jQuery reference to our <ul> for listing the collection.
	listTemplateSource = $("#list-template").html(),
	listTemplateFn = Handlebars.compile(listTemplateSource),
	loginContainer$ = $('#loginContainer'),
	appContainer$ = $('#appContainer'),
	signOutButton$ = $('#signOutButton');
	
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
			signOutButton$.hide();
			loginContainer$.show();
		}
	};// @lock

	signInButton.click = function signInButton_click (event)// @startlock
	{// @endlock
		if (jseUtil.signIn(signInObj)) {
			loginContainer$.hide();
			signOutButton$.show();
			appContainer$.show();
			buildItemsList();
			
		} else {
			loginContainer$.show();
			signOutButton$.hide();
			appContainer$.hide();
		} //end - if (jseUtil.signIn(signInObj)).
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("signOutButton", "click", signOutButton.click, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
