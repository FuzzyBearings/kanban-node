$(document).ready(function(){

	var element = common.getElementById("addFamilyButton");
	if (element.addEventListener)
	    element.addEventListener("click", onClickAddFamilyButton, false);
	else if (el.attachEvent)
	    element.attachEvent('onclick', onClickAddFamilyButton);
	
	var url = "/api/v1/families"
	jQuery.ajax(url, {
		method: 'GET',
		headers: { "PRIVATE-TOKEN": "anything" },
	}).success(function(data, textStatus, jqXHR) {
		
		var familiesData = data.families;
		var changeset = data.changeset;
		var familiesContainer = document.getElementById("familiesContainer");
		console.log('Success fetching families - changeset: ' + changeset);

		for (var i = 0; i < familiesData.length; ++i) {

			// li
			var familyListItem = document.createElement("li");
			familyListItem.className = "item";
			familiesContainer.appendChild(familyListItem);

			// p
			var paragraphNode = document.createElement("p");
			paragraphNode.className = "itemName";
			familyListItem.appendChild(paragraphNode);

			// column name
			var familyData = familiesData[i];
			var textNode = document.createTextNode(familyData.name);
			paragraphNode.appendChild(textNode);
		}
		
		longPoll(changeset);

	}).error(function(jqXHR, textStatus, errorThrown) {
		console.log('Error thrown fetching families: ' + errorThrown);
	});

});

function onClickAddFamilyButton(event) {
	var textInput = common.getElementById('addFamilyNameTextInput');
	var textValue = textInput.value;
	var textValueS = common.sanitizeAlphanumeric(textValue);
	
	console.log('Family Name: ' + textValueS);
	
	if (textValueS.length > 0) {
		var url = "/api/v1/families";
		var properties = { familyName: textValue }
		jQuery.ajax(url, {
			data: properties,
			method: 'POST',
			headers: { "PRIVATE-TOKEN": "anything" },
		}).success(function(data, textStatus, jqXHR) {
			console.log('Successfully saved family!');
		}).error(function(jqXHR, textStatus, errorThrown) {
			console.log('Error thrown while saving family: ' + errorThrown);
		});	
	}
	// console.log('onClickAddBoardButton(event): ' + textValueS);
	// console.log('onClickAddBaordButton(event): ' + event);
	// console.log('onClickAddBoardButton(event.target): ' + event.target);
}

function longPoll(changeset) {
	var url = "/sync/v1/events/" + changeset;
	jQuery.ajax(url, {
		method: 'GET',
		headers: { "PRIVATE-TOKEN": "anything" },
	}).success(function(data, textStatus, jqXHR) {

		console.log('Success fetching events.');
		
		var eventsData = data.events;
		var changeset = data.changeset;
		
		console.log('Changeset: ' + changeset);

		// var familiesContainer = document.getElementById("familiesContainer");
		// console.log('Success fetching families - changeset: ' + changeset);
		//
		// for (var i = 0; i < familiesData.length; ++i) {
		//
		// 	// li
		// 	var familyListItem = document.createElement("li");
		// 	familyListItem.className = "item";
		// 	familiesContainer.appendChild(familyListItem);
		//
		// 	// p
		// 	var paragraphNode = document.createElement("p");
		// 	paragraphNode.className = "itemName";
		// 	familyListItem.appendChild(paragraphNode);
		//
		// 	// column name
		// 	var familyData = familiesData[i];
		// 	var textNode = document.createTextNode(familyData.name);
		// 	paragraphNode.appendChild(textNode);
		// }
		
		// longPoll(changeset);

	}).error(function(jqXHR, textStatus, errorThrown) {
		console.log('Error thrown fetching events: ' + errorThrown);
		// longPoll(changeset);
	});
}
