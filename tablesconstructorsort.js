let dataTable = {};
function DataTable(config, data)
{
	let table = '<table class="table">';
	dataTable[config.parent + '.config'] = Object.assign({}, config);
	dataTable[config.parent + '.data'] = Object.assign({}, data);
	table += createHead(config);
	table += createBody(data, config.parent);
	table += '</table>';
	document.getElementById(config.parent).innerHTML = table;
}

function createHead(config)
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
			temp = '<td>' + config.columns[counter].title + '<i class="fas fa-sort" id="' + config.parent + '_buttonSort' + counter + '" data-type="1" data-number="' + counter + '"onclick="sortConfigArray(`' + config.parent + '_buttonSort' + counter + '`, `' + config.parent + '`)"></i>' + '</td>';
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
	dataTable[id + '.dataNow'] = Object.assign({}, data);
	let counter1 = 0;
	let counter;
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

function sortConfigArray(idButton, id)
{
	let data = Object.assign({}, dataTable[id + '.dataNow']);
	typeSort = document.getElementById(idButton).dataset.type;
	nameColumn = dataTable[id + '.' + 'nameProperties' + document.getElementById(idButton).dataset.number];
	console.log(data)
	data.sort((a, b) => a.name > b.name ? 1 : -1);
	console.log(data)
	// DataTable(dataTabel[id + '.config'], data);
}