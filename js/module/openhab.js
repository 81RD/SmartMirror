function smartMirrorOpenHabStatus(openhabIP){
	this.ip 			= openhabIP;
	var updateTimeStatus	= 5000;
	var updateTimeSitemap	= 5000;
	this.fname 			= "openHab";
	var sitemap = "test";
	this.itemlist = [];
	this.list = [];
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

	this.addItemToSection = function(item)
	{
		//console.log(this.list);
		//console.log(item);
		for(var i in this.list[item.key][2]){
			if(this.list[item.key][2][i].widgetId == item.widgetId){
				return;
			}
		}
		
		this.list[item.key][2].push(item);
		//console.log(this.list);
	}					
					
					
	this.addSection = function(item)
	{
		var contains = false;
		for(var i in this.list){
			if(this.list[i][0] == item.label){
				contains = true;
				return i;
			}
		}
		if(contains == false){
			this.list.push([item.label,item.widgetId,[]]);
		}
		//console.log(this.list);
		return this.list.length-1;
	}	
					
	this.parseItem = function(item)
	{
		//console.log(item);
		var type = item.type;
		var inputPos;
		
		if(typeof type == "undefined"){
			return;
		}
		switch(type){
			case "Switch": 	//console.log("Switch");
							//console.log(item);
							this.addItemToSection(item);
							break;
			case "Text": 	//console.log("Text");
							this.addItemToSection(item);
							
							break;
			case "Group": 	//console.log("Group");
							//inputPos = this.addSection(item);
							//console.log(item);
							break;
		}		
		//console.log(this.list);
	}
	
	
	this.parseWidget = function(widget)
	{
		//console.log("----------------------------");
		
		
		
		for(var i in widget){
			
			if(typeof widget[i] == "object"){
				
				//console.log(widget);
				//console.log(typeof widget[i].widget);
				if(typeof widget.widget != "undefined" ){
					//console.log("contain widget");
					if(typeof widget.key != "undefined" ){
						widget.widget.key = widget.key;
					}
					this.parseWidget(widget.widget);
				}else if(typeof widget.linkedPage != "undefined"){
					//console.log("contain linkedPage");
					//console.log(widget[i].linkedPage);
					if(typeof widget.key != "undefined" ){
						widget.linkedPage.key = widget.key;
					}
					this.parseWidget(widget.linkedPage);
				
				}else{
					//console.log("i am undefined");
					//console.log(widget);
					if(widget instanceof Array){
						//console.log("i am Array");
						for(var x in widget){
							if(typeof widget[x].linkedPage != "undefined"){
								var pos = this.addSection(widget[x]);
								widget[x].linkedPage.key = pos;
								//console.log("My Position is: "+pos);
								this.parseWidget(widget[x].linkedPage);
							}else{
								//console.log("i am Array but no linkedPage");
								//console.log(widget);
							
								widget[x].key = widget.key;
								this.parseItem(widget[x]);
							}
							
							//this.parseItem(widget[i][x]);
							
						}
					}else{
						//console.log(widget);
						widget[i].key = widget.key;
						this.parseItem(widget[i]);
					}
					
				}
			}
			
		}
		//console.log("Finish! out");
		//this.updateItemList();
	}
	
	
	this.parseItemsFromSitemap = function()
	{
		//console.log("GIB MIR DATEN!");
		//http://192.168.2.190:8080/rest/sitemaps/mirror	
		var tmp_thi = this;
		tmp_thi.list = new Array();
		$.ajax({
					url: 'http://'+openhabIP+':8080/rest/sitemaps/'+sitemap,
					async: false,
					dataType: 'json',
					success: function(json, textStatus) {
						
						//console.log(json);
						var sections_raw = json.homepage.widget;
						//console.log(sections_raw);
						tmp_thi.parseWidget(sections_raw);
						
						/*
						for(var d in sections_raw){
						
							var rooms_raw = sections_raw[d].widget;
							console.log(rooms_raw);
							for(var i in rooms_raw){
							
								if(rooms_raw[i].linkedPage){
									tmp_thi.itemlist.push(new Array(rooms_raw[i].label,new Array()));
									var room_items = rooms_raw[i].linkedPage.widget;
									console.log(room_items.type);
									console.log(room_items);
									switch(room_items.type){
										case "Switch":
									}
								
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
						}
						//console.log("Komplette Liste:");
						//console.log(tmp_thi.itemlist);
						//console.log(tmp_thi.items);
					//tmp_thi.items = tmp_thi.itemlist;
					//console.log(tmp_thi.items);
						*/
						
						
						
						
						
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
	this.itemlist = this.list;
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
		
		
		for(var x in tmp_thi.itemlist[i][2]){
			var item = tmp_thi.itemlist[i][2][x];
			if(item.item.state != "Uninitialized"){
				var rowopenhab = $('<tr />').css('opacity', opacityopenhab);
				
				//console.log(i+" "+x);
				//console.log("Item: "+item);
				rowopenhab.append($('<td/>').addClass('openhab-itemname').html(item.label));
				rowopenhab.append($('<td/>').addClass('openhab-itemstatus').html(item.item.state));
				
				openhabTable.append(rowopenhab);
				opacityopenhab -= 0.155;
			}
		}
		tables.push(openhabTable);			
			
	}
	//console.log(tables);
	
	
	
	
	
	
	
	return tables;

	};


	this.updateItemList = function(){
		/*
		for(var i in this.list){
			for(var x in this.list[i][2]){
				console.log(this.list[i][2][x].item.link);
				$.ajax({
					url: this.list[i][2][x].item.link,
					async: false,
					dataType: 'json',
					success: function(json, textStatus) {
						
						console.log(json);
						
					}
				});	
			}
		}
		*/
	}
	
}

