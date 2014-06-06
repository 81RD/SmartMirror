function smartMirrorOpenHabStatus(openhabIP){
	this.ip 			= openhabIP;
	var updateTimeStatus	= 1000;
	var updateTimeSitemap	= 60000;
	this.fname 			= "openHab";
	var sitemap = "mirror";
	this.itemlist = [];
	
	this.items = [
						[ // Room
							['towerStatus','Tower PC',''],	// Item
							['schreibtischlampeBueroA','Schreibtischlampe',''] // OpenHAB ItemID, Name
						],
						[
							['nachttischlampeSchlafzimmerRechts','Nachtlampe rot',''],
							['nachttischlampeSchlafzimmerLinks','Nachtlampe blau',''],
							['deckenlampeSchlafzimmer','Deckenlampe',''],
							['weckerStatus','Wecker','']
						],
						[
							['deckenlampeStube','Deckenlampe',''],
							['stehlampeWohnzimmerA','Stehlampe',''],
							['lgTvWohnzimmerStatus','TV',''],
							['openelecStubeStatus','OpenELEC','']
						]
					];

	
	this.parseItemsFromSitemap = function()
	{
		//http://192.168.2.190:8080/rest/sitemaps/mirror	
		var tmp_thi = this;
		tmp_thi.itemlist = new Array();
		$.ajax({
					url: 'http://'+openhabIP+':8080/rest/sitemaps/'+sitemap,
					async: false,
					dataType: 'json',
					success: function(json, textStatus) {
						
						//console.log(json);
						var rooms_raw = json.homepage.widget.widget;
		
						for(var i in rooms_raw){
						
							if(rooms_raw[i].linkedPage){
								tmp_thi.itemlist.push(new Array(rooms_raw[i].label,new Array()));
								var room_items = rooms_raw[i].linkedPage.widget;
							
								if(room_items instanceof Array){
									//room_items = room_items;
									for(var x in room_items){
										var ite = room_items[x];
										//console.log(x);
										tmp_thi.itemlist[tmp_thi.itemlist.length-1][1].push([ite.item.name,ite.label,ite.item.state]);
									
									}
								}else{
									//console.log("else: ");
									//console.log(room_items);
									
									tmp_thi.itemlist[tmp_thi.itemlist.length-1][1].push([room_items.item.name,room_items.label,room_items.item.state]);
									//console.log("Komplette Liste:");
									//console.log(tmp_thi.itemlist);
								}
							}
							
						}
						//console.log("Komplette Liste:");
						//console.log(tmp_thi.itemlist);
						//console.log(tmp_thi.items);
					//tmp_thi.items = tmp_thi.itemlist;
					//console.log(tmp_thi.items);
						
						
						
						
						
						
					}
				});	
		items = tmp_thi.itemlist;
		
		setTimeout(function() {
				tmp_thi.parseItemsFromSitemap();
		}, updateTimeSitemap);		
		
	};

	this.updateData = function()
	{
		//this.parseItemsStatus();
		this.parseItemsFromSitemap();
	};

	this.getContent = function ()
	{
	var tmp_thi = this;
	var tables = new Array();
	tables.push("openHab");
	//console.log(tmp_thi.itemlist);
	
	for(var i in tmp_thi.itemlist){
		var openhabTable = $('<table />').addClass('openhab-table');
		var opacityopenhab = 1;
		var rowheadopenhab = $('<tr />').css('opacity', opacityopenhab);
	
		rowheadopenhab.append($('<td/>').addClass('openhab-itemname').html( tmp_thi.itemlist[i][0]));
		rowheadopenhab.append($('<td/>').addClass('openhab-itemstatus').html('Status'));
		openhabTable.append(rowheadopenhab);
		
		
		for(var x in tmp_thi.itemlist[i][1]){
			var rowopenhab = $('<tr />').css('opacity', opacityopenhab);
			var item = tmp_thi.itemlist[i][1][x];
			//console.log(i+" "+x);
			//console.log("Item: "+item);
			rowopenhab.append($('<td/>').addClass('openhab-itemname').html(item[1]));
			rowopenhab.append($('<td/>').addClass('openhab-itemstatus').html(item[2]));
			
			openhabTable.append(rowopenhab);
			opacityopenhab -= 0.155;
		}
		tables.push(openhabTable);			
			
	}
	//console.log(tables);
	
	
	
	
	
	
	
	return tables;

	};

}

