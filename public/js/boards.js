$(document).ready(function(){

	var element = common.getElementById("addBoardButton");
	if (element.addEventListener)
	    element.addEventListener("click", onClickAddBoardButton, false);
	else if (el.attachEvent)
	    element.attachEvent('onclick', onClickAddBoardButton);
	
	var url = "/api/v1/longpoll/boards/sync/321"
	jQuery.ajax(url, {
		method: 'GET',
		headers: { "PRIVATE-TOKEN": "anything" },
	}).success(function(data, textStatus, jqXHR) {
		var boardsData = data.boards;
		var boardsContainer = document.getElementById("boardsContainer");
		console.log('success!');
		
		for (var i = 0; i < boardsData.length; ++i) {
			var boardData = boardsData[i];
			
			// li
			var boardListItem = document.createElement("li");
			boardListItem.className = "boardItem";
			boardsContainer.appendChild(boardListItem);

			// p
			var paragraphNode = document.createElement("p");
			paragraphNode.className = "boardName";
			boardListItem.appendChild(paragraphNode);

			// column name
			var textNode = document.createTextNode(boardData.name);
			paragraphNode.appendChild(textNode);
		}

	}).error(function(jqXHR, textStatus, errorThrown) {
		console.log('error thrown: ' + errorThrown);
	});

});

function onClickAddBoardButton(event) {
	var textInput = common.getElementById('addBoardNameTextInput');
	var textValue = textInput.value;
	var textValueS = common.sanitizeAlphanumeric(textValue);
	if (textValueS.length > 0) {
		var url = "/kanban/api/v1/boards";
		var boardProperties = { boardName: textValue }
		jQuery.ajax(url, {
			data: boardProperties,
			method: 'POST',
			headers: { "PRIVATE-TOKEN": "anything" },
		}).success(function(data, textStatus, jqXHR) {
			console.log('successful save!');
			var columnsData = data.columns;
		}).error(function(jqXHR, textStatus, errorThrown) {
			console.log('error thrown: ' + errorThrown);
		});	
	}
	
	// console.log('onClickAddBoardButton(event): ' + textValueS);
	// console.log('onClickAddBaordButton(event): ' + event);
	// console.log('onClickAddBoardButton(event.target): ' + event.target);
}
