let dataTable = {};
function DataTable(config, data)
{
	let table = '<table>';
	table += DataHead(config);
	table += DataBody(data, config.parent);
	table += '</table>';
	document.getElementById(config.parent).innerHTML = table;
}

function DataHead(config)
{
	let counter = 0;
	table = '<thead><tr>';
	while(counter != config.columns.length)
	{
		table += '<td>' + config.columns[counter].title + '</td>';
		dataTable[config.parent + '.nameProperties' + counter] = config.columns[counter].value;
		dataTable[config.parent + '.type' + counter] = (config.columns[counter].type == 'number') ? 1 : 0;
		counter++;
	}
	dataTable[config.parent + '.size'] = counter;
	table += '</tr></thead>';
	return table;
}
function DataBody(data, id)
{
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