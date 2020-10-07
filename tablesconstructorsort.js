let dataTable = {};
function DataTable(config, data, idButton, typeSortNew, classsButton)
{
	let table = '<table class="table">';
	let counter = 0;
	let dataArray = [];
	dataObj = {...data};
	while(dataObj[counter] != undefined)
	{
		dataArray[counter] = dataObj[counter];
		counter++;
	}
	dataTable[config.parent + '.config'] = {...config};
	(idButton) ? (counter = 0) : (dataTable[config.parent + '.data'] = dataArray) ;
	table += createHead(config, idButton, typeSortNew, classsButton);
	table += createBody(data, config.parent);
	table += '</table>';
	document.getElementById(config.parent).innerHTML = table;
}

function createHead(config, idButton, typeSortNew, classsButton)
{
	let counter = 0;
	let temp = '';
	table = '<thead><tr>';
	while(counter != config.columns.length)
	{
		temp = '<td>' + config.columns[counter].title + '</td>';
		dataTable[config.parent + '.nameProperties' + counter] = config.columns[counter].value;
		if(config.columns[counter].sortable)
		{
			(classsButton) ? (classBtn = classsButton) : (classBtn = 'fa-sort');
			temp = '<td>' + config.columns[counter].title + '<i class="fas ' + classBtn + '" id="' + config.parent + '_buttonSort' + counter + '" data-number="' + counter + '"onclick="sortAndBuildTable(`' + config.parent + '_buttonSort' + counter + '`, `' + config.parent + '`)"></i>' + '</td>';
			(idButton) ? (dataTable[config.parent + '.' + idButton + 'Type'] = typeSortNew) : (dataTable[config.parent + '.' + config.parent + '_buttonSort' + counter + 'Type'] = 1);
		}
		table += temp;
		dataTable[config.parent + '.type' + counter] = (config.columns[counter].type == 'number') ? 1 : 0;
		counter++;
	}
	dataTable[config.parent + '.size'] = counter;
	table += '</tr></thead>';
	return table;
}
function createBody(data, id)
{
	dataObj = {...data};
	let dataArray = [];
	let counter = 0;
	while(dataObj[counter] != undefined)
	{
		dataArray[counter] = dataObj[counter];
		counter++;
	}
	dataTable[id + '.dataNow'] = dataArray;
	let counter1 = 0;
	counter = 0;
	let temp = '';
	table = '<tbody>';
	while(counter1 != data.length)
	{
		counter = 1;
		table += '<tr><td>' + counter1 + '</td>';
		while(counter != dataTable[id + '.size'])
		{
			temp = dataTable[id + '.nameProperties' + counter];
			if(dataTable[id + '.type' + counter])
			{
				table += '<td class="align-right">' + data[counter1][temp] + '</td>';
			}
			else
			{	
				table += '<td>' + data[counter1][temp] + '</td>';
			}
			counter++;
		}
		table += '</tr>';
		counter1++;
	}
	table += '</tbody>';
	return table;
}	

function sortAndBuildTable(idButton, id)
{
	let dataNow = dataTable[id + '.dataNow'];
	let dataNowArray = [];
	let typeSortNew;
	typeSort = dataTable[id + '.' + idButton + 'Type'];
	nameColumn = dataTable[id + '.' + 'nameProperties' + document.getElementById(idButton).dataset.number];
	let counter = 0;
	while(dataNow[counter] != undefined)
	{
		dataNowArray[counter] = dataNow[counter];
		counter++;
	}
	if(typeSort == 1)
	{
		dataNowArray.sort((a, b) => a[nameColumn] > b[nameColumn] ? 1 : -1);
		typeSortNew = 2;
		classsButton = 'fa-sort-up';
	}
	if(typeSort == 2)
	{
		dataNowArray.sort((a, b) => a[nameColumn] < b[nameColumn] ? 1 : -1);
		typeSortNew = 0;
		classsButton = 'fa-sort-down';
	}
	if(typeSort == 0)
	{
		dataNowArray = dataTable[id + '.data'];
		typeSortNew = 1;
		classsButton = 'fa-sort';
	}
	counter = 0;
	DataTable(dataTable[id + '.config'], dataNowArray, idButton, typeSortNew, classsButton);
}
// function objectToArray(direction)
// {
// 	let counter = 0;
// 	let tempArray = [];
// 	while(direction[counter] != undefined)
// 	{
// 		tempArray[counter] = direction[counter];
// 		counter++;
// 	}
// 	return tempArray;
// }