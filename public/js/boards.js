$(document).ready(function(){

	var element = common.getElementById("addBoardButton");
	if (element.addEventListener)
	    element.addEventListener("click", onClickAddBoardButton, false);
	else if (el.attachEvent)
	    element.attachEvent('onclick', onClickAddBoardButton);

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
	
	console.log('onClickAddBoardButton(event): ' + textValueS);
	console.log('onClickAddBaordButton(event): ' + event);
	console.log('onClickAddBoardButton(event.target): ' + event.target);
}
