let dataTable = {};
let classNumbers = ['fa-sort', 'fa-sort-numeric-up-alt', 'fa-sort-numeric-down-alt'];
let classString = ['fa-sort', 'fa-sort-alpha-down', 'fa-sort-alpha-down-alt'];
function DataTable(config, data, idButton, typeSortNew)
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
	(idButton) ? (counter = 0) : (dataTable[config.parent + '.data'] = dataArray);
	table += createHead(config, idButton, typeSortNew);
	table += createBody(data, config.parent);
	table += '</table>';
	document.getElementById(config.parent).innerHTML = table;
}

function createHead(config, idButton, typeSortNew)
{
	let counter = 0;
	let temp = '';
	let tmp2;
	(typeSortNew == 0) ? (tmp2 = 1) : (tmp2 = tmp2); (typeSortNew == 1) ? (tmp2 = 2) : (tmp2 = tmp2); (typeSortNew == 2) ? (tmp2 = 0) : (tmp2 = tmp2);
	table = '<thead><tr>';
	while(counter != config.columns.length)
	{
		temp = '<td>' + config.columns[counter].title + '</td>'; // если ифы дальше запустяться то темп перезапишется
		dataTable[config.parent + '.nameProperties' + counter] = config.columns[counter].value;

		if(config.columns[counter].sortable && config.columns[counter].type == 'number')
		{
			(idButton && (idButton == config.parent + '_buttonSort' + counter)) ? (classBtn = classNumbers[tmp2]) : (classBtn = classString[1]); // (idButton) если функция запущена через кнопку
			temp = '<td>' + config.columns[counter].title + '<i class="fas ' + classBtn + '" id="' + config.parent + '_buttonSort' + counter + '" data-number="' + counter + '"onclick="sortAndBuildTable(`' + config.parent + '_buttonSort' + counter + '`, `' + config.parent + '`)"></i>' + '</td>';
		}
		else if(config.columns[counter].sortable)
		{
			(idButton && (idButton == config.parent + '_buttonSort' + counter)) ? (classBtn = classString[tmp2]) : (classBtn = classString[1]); // (idButton) если функция запущена через кнопку
			temp = '<td>' + config.columns[counter].title + '<i class="fas ' + classBtn + '" id="' + config.parent + '_buttonSort' + counter + '" data-number="' + counter + '"onclick="sortAndBuildTable(`' + config.parent + '_buttonSort' + counter + '`, `' + config.parent + '`)"></i>' + '</td>';
		}
		(idButton) ? (dataTable[config.parent + '.' + idButton + 'Type'] = typeSortNew) : (dataTable[config.parent + '.' + config.parent + '_buttonSort' + counter + 'Type'] = 0);

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
	typeSort = dataTable[id + '.' + idButton + 'Type'];
	nameColumn = dataTable[id + '.' + 'nameProperties' + document.getElementById(idButton).dataset.number];
	let counter = 0;
	while(dataNow[counter] != undefined)
	{
		dataNowArray[counter] = dataNow[counter];
		counter++;
	}
	if(typeSort == 0)
	{
		dataNowArray.sort(function(a, b) {return('' + a[nameColumn]).localeCompare(b[nameColumn]);});
		typeSort = 1;
	}
	else if(typeSort == 1)
	{
		dataNowArray.sort(function(a, b) {return('' + b[nameColumn]).localeCompare(a[nameColumn]);});
		typeSort = 2;
	}
	else if(typeSort == 2)
	{
		dataNowArray = dataTable[id + '.data'];
		typeSort = 0;
	}
	counter = 0;
	DataTable(dataTable[id + '.config'], dataNowArray, idButton, typeSort);
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