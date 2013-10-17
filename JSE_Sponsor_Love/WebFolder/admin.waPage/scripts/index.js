﻿
WAF.onAfterInit = function onAfterInit() {// @lock
	var sponsorsUL$ = $('#sponsorsUL'),
	//Get jQuery reference to our <ul> for listing the collection.
	sponsorListTemplateSource = $("#sponsor-list-template").html(),
	sponsoristTemplateFn = Handlebars.compile(sponsorListTemplateSource),
	
	winnersUL$ = $('#winnersUL'),
	//Get jQuery reference to our <ul> for listing the collection.
	winnerListTemplateSource = $("#winner-list-template").html(),
	winneristTemplateFn = Handlebars.compile(winnerListTemplateSource),
	congratsContainer$ = $('#congratsContainer'),
	
	
	signOutButton$ = $('#signOutButton'),
	loginContainer$ = $('#loginContainer'),
	adminHomeContainer$ = $('#adminHomeContainer'),
	cardDeckContainer$ = $('cardDeckContainer'),
	cardThree = $$('cardThreeContainer'),
	cardTwo = $$('cardTwoContainer'),
	cardOne = $$('cardOneContainer'),
	
	currentSponsor = null;
	
	function buildWinnersList() {
		winnersUL$.children().remove(); 
		
		ds.Winner.query("sponsor.ID = :1", currentSponsor.ID.getValue(), {
			autoExpand: "person",
			onSuccess: function(ev1) {
				ev1.entityCollection.forEach({
					onSuccess: function(ev2) {
						winnerData = 	{
							prize:  	ev2.entity.prize.getValue(),
							name: 		ev2.entity.person.relEntity.fullName.getValue(),
							//email: 		ev2.entity.person.relEntity.email.getValue(),
							dataId: 	ev2.entity.ID.getValue()
						};
						winnersUL$.append(winneristTemplateFn(winnerData));
					}
				});
			} //end - onSuccess: function(ev1).
		}); //end - ds.Winner.query("sponsor.ID = :1", currentSponsor.ID.
	} //end - buildWinnersList().
	
	
	
	function buildSponsorsList() {
		sponsorsUL$.children().remove(); 
		
		ds.Sponsor.all({
			autoExpand: "winners",
			onSuccess: function(ev1) {
				ev1.entityCollection.forEach({
					onSuccess: function(ev2) {
						sponsorData = 	{
							name:  		ev2.entity.name.getValue(),
							dataId: 	ev2.entity.ID.getValue(),
							imagePath: "/rest/Sponsor(" + ev2.entity.ID.getValue() + ")/logo?$imageformat=best&$expand=logo"
						};
						sponsorsUL$.append(sponsoristTemplateFn(sponsorData));
					} //end - onSuccess: function(ev2).
				}); //end - ev1.entityCollection.forEach.
			} //end - onSuccess: function(ev1).
		}); //end - ds.Sponsor.all.
	} //end - buildSponsorsList.
	
	
	
	function updateSponsorDetail(name) {
            sponsorObj.name = name;
            waf.sources.sponsorObj.sync();
    } //end - updateSponsorDetail().
	
	
	
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
			jseUtil.setMessage("We could not sign you in.", 5000, "normal"); //error		
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
			//jseUtil.setMessage("Not yet available.", 5000, "normal"); 
			cardOne.hide();
			cardTwo.show();
			cardThree.hide();
			break;
			
			case "adminThreeButton" :
			jseUtil.setMessage("Add Sponsor not yet available.", 5000, "normal"); 
			//console.log('three clicked');
			cardOne.hide();
			cardTwo.hide();
			cardThree.show();
			break;
		} //end - switch(ev.buttonElemId).

	} //end - handleMainMenuBarSelect.
	
// @region namespaceDeclaration// @startlock
	var closeConratsButton = {};	// @button
	var pickAwinnerButton = {};	// @button
	var addPersonButton = {};	// @button
	var addNewPersonButton = {};	// @button
	var signOutButton = {};	// @button
	var signInButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	closeConratsButton.click = function closeConratsButton_click (event)// @startlock
	{// @endlock
		congratsContainer$.hide();
		$$('winnersNameRichText').setValue("");
	};// @lock

	pickAwinnerButton.click = function pickAwinnerButton_click (event)// @startlock
	{// @endlock
		
		if (currentSponsor !== null) {
			currentSponsor.pickWinner(prizeVar, {
				onSuccess: function(event) {
					congratsContainer$.fadeIn(4000, function() {
						$$('winnersNameRichText').setValue(event.result.fullName.getValue());
						buildWinnersList();
						prizeVar = "";
						waf.sources.prizeVar.sync();
					});
				}
			}); //end - currentSponsor.pickWinner.
			
		} else {
			jseUtil.setMessage("Please select a Sponsor.", 5000, "normal"); 
		}
		
	};// @lock

	addPersonButton.click = function addPersonButton_click (event)// @startlock
	{// @endlock
		ds.Person.addNewPerson(personObj, {
			onSuccess: function(event) {
				jseUtil.setMessage(event.result, 5000, "normal"); 
				personObj.attendeeNumber = "";
				personObj.firstName = "";
				personObj.lastName = "";
				personObj.email = "";
				waf.sources.personObj.sync();
			}
		});
	};// @lock

	addNewPersonButton.click = function addNewPersonButton_click (event)// @startlock
	{// @endlock
		jseUtil.setMessage("Under construction.", 4000, "normal"); 
	};// @lock

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
		
		if (WAF.directory.currentUser() === null) {
			adminHomeContainer$.hide();
			signOutButton$.hide();
			loginContainer$.show();
		
		} else {
			loginContainer$.hide();
			signOutButton$.show();
			adminHomeContainer$.show();
			cardOne.show();
			cardTwo.hide();
			cardThree.hide();
			signInObj.email = "";
			signInObj.password = "";
			waf.sources.signInObj.sync();
		}
		
		buildSponsorsList();
		
		sponsorsUL$.on('mouseenter', '.sponsorPreview', function (event) {
	   		$(this).addClass('sponsorSelected');
		});

		sponsorsUL$.on('mouseleave', '.sponsorPreview', function (event) {
	   		$(this).removeClass('sponsorSelected');
		});
		
		sponsorsUL$.on('click', '.sponsorPreview', function (event) {
			var this$ = $(this),
				sponsorId = this$.children('div.sponsorIdent').attr('data-id');
	   		this$.addClass('sponsorPermSelected');
	   		this$.siblings().removeClass('sponsorPermSelected');
	   		
	   		//Get the current Sponsor entity.
	   		ds.Sponsor.find("ID = :1", sponsorId, {
            	onSuccess: function(event) {  
            		currentSponsor = event.entity; 
            		buildWinnersList();
               		//console.log(event.entity.name.getValue());          
               		updateSponsorDetail(event.entity.name.getValue());
               }
           });
           
		}); //end - sponsorsUL$.on('click'.
		
		
		//Make return key trigger login when user email or password input fields have focus.
		$("#textField2, #textField3").on('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			signMeIn(signInObj);
	    	}
		});

		jseUtil.mainMenubarObj = new jseUtil.MetroRadioMenuBar('mainMenubarContainer');
		jseUtil.mainMenubarObj.subscribe(handleMainMenuBarSelect, "on select"); 
		jseUtil.mainMenubarObj.setSelectedMenuItem(0);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("closeConratsButton", "click", closeConratsButton.click, "WAF");
	WAF.addListener("pickAwinnerButton", "click", pickAwinnerButton.click, "WAF");
	WAF.addListener("addPersonButton", "click", addPersonButton.click, "WAF");
	WAF.addListener("addNewPersonButton", "click", addNewPersonButton.click, "WAF");
	WAF.addListener("signOutButton", "click", signOutButton.click, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
