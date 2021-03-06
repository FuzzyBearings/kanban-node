$(document).ready(function(){
	
	// automatically fetch board
	var url = "/api/v1/longpoll/board/sync/123"
	jQuery.ajax(url, {
		method: 'GET',
		headers: { "PRIVATE-TOKEN": "anything" },
	}).success(function(data, textStatus, jqXHR) {
		var columnsData = data.columns;
		var columnsContainer = document.getElementById("columnsContainer");
		for (var i = 0; i < columnsData.length; ++i) {
			var columnData = columnsData[i];
			
			// li
			var columnListItem = document.createElement("li");
			columnListItem.className = "column";
			columnsContainer.appendChild(columnListItem);
						
			// p
			var paragraphNode = document.createElement("p");
			paragraphNode.className = "columnName";
			columnListItem.appendChild(paragraphNode);

			// column name
			var textNode = document.createTextNode(columnData.name);
			paragraphNode.appendChild(textNode);

			// cards
			for (var j = 0; j < columnData.cards.length; ++j) {
				var cardData = columnData.cards[j];
				var cardNode = document.createElement("dl");
				cardNode.className = "card";
				columnListItem.appendChild(cardNode);
				
				var cardNameNode = document.createElement("dt");
				cardNameNode.className = "card";
				textNode = document.createTextNode(cardData.name);
				cardNameNode.appendChild(textNode);
				cardNode.appendChild(cardNameNode);

				var cardDescriptionNode = document.createElement("dd");
				cardDescriptionNode.className = "card";
				textNode = document.createTextNode(cardData.description)				
				cardDescriptionNode.appendChild(textNode);
				cardNode.appendChild(cardDescriptionNode);
			}
		}
		// columns.forEach(function(column) {
		// 	console.log('columnName: ' + column.name);
		// });
	}).error(function(jqXHR, textStatus, errorThrown) {
		console.log('error thrown: ' + errorThrown);
	});

});
