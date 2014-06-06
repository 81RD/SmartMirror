function smartMirrorCalendar(calendarFeed,updateTimeCalendarData,updateTimeCalendar,calendarMaxDisplayedDates,calendarMaxDisplayedDays,calendarContentPosition){
	this.feed = calendarFeed;
	this.updateTimeData	= updateTimeCalendarData;
	this.updateTime		= updateTimeCalendar;
	this.maxDates		= calendarMaxDisplayedDates;
	this.maxDays		= calendarMaxDisplayedDays;
	this.pos 			= calendarContentPosition;
	this.eventList 		= new Array();
	this.fname 			= "dates";





this.getItems = function(start)
	{
		table = $('<table/>').addClass('xsmall').addClass('calendar-table');
		opacity = 1;
		var i = 0;
		//var tmp_th = this;
		//console.log(this.eventList.length);
		while(start < this.eventList.length && i < 5) {
			var e = this.eventList[start];
			var days = e.days;
			
			var daysString = (days == 1) ? tomorrow :  days + ' ' + in_days;
			if(days <= this.maxDays){
				if (days == 0) {
					daysString = today;
				}
				//console.log(daysString);
				var row = $('<tr/>').css('opacity',opacity);
				row.append($('<td/>').html(e.description).addClass('description'));
				row.append($('<td/>').html(daysString).addClass('days dimmed'));
				table.append(row);

				opacity -= 1 / this.eventList.length;
			}
			
			start++;
			i++;
		}
		//var pushItem = ["dates",table];
		if(this.eventList.length != 0){
			return table;
		}else{
			return "noData";
		}
		
	};
	 


this.updateData = function()
	{
		var addr = encodeURI(this.feed);
		this.eventList  = new Array();
		var tmp_this = this;
		//console.log(this.eventList);
		var events;
		new ical_parser("calendar.php?url="+addr, function(cal){
        	events = cal.getEvents();
        	

        	for (var i in events) {
				
        		var e = events[i];
        		for (var key in e) {

        			var value = e[key];
					var seperator = key.search(';');
					//console.log(value);
					if (seperator >= 0) {
						var mainKey = key.substring(0,seperator);
						var subKey = key.substring(seperator+1);

						var dt;
						if (subKey == 'VALUE=DATE') {
							//date
							dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8));
						} else {
							//time
							dt = new Date(value.substring(0,4), value.substring(4,6) - 1, value.substring(6,8), value.substring(9,11), value.substring(11,13), value.substring(13,15));
						}

						if (mainKey == 'DTSTART') e.startDate = dt; 
						if (mainKey == 'DTEND') e.endDate = dt; 
					}else{
						if(key.search('DTSTART') == 0){
							
							e.startDate = new Date(value);
						}
						if(key.search('DTEND') == 0){
							//console.log(value);
							e.endDate = new Date(value);
						}
						
					
				
					}
        		}


        		var now = new Date();
        		var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        		var days = moment(e.startDate).diff(moment(today), 'days');

        		//only add future events
        		if (days >= 0) {
	        		tmp_this.eventList.push({'description':e.SUMMARY,'days':days});
					//console.log(tmp_this.eventList);
        		}
				
        	};
        	//tmp_this.eventList.sort(function(a,b){return b.days-a.days});
			tmp_this.eventList.sort(function(a,b){return a.days-b.days});
			//console.log(tmp_this.eventList);
    	});
		tmp_this = this;
		
		setTimeout(function() {
			//console.log("MMMMMMMMMM");
        	tmp_this.updateData();
        }, tmp_this.updateTimeData);

	};
	
	this.getContent = function()
{
	var pos = 0;
	var items = new Array();
	items.push("dates");
	while(pos < this.maxDates){
		//console.log(pos);
		var ite = this.getItems(pos)
		if(ite != "noData"){
			if(ite[0].innerHTML != ""){
				items.push(ite);
			}
			
		}
		pos = pos+5;
	}
	if(items.length > 1){
		console.log(items);
		return items;
	}else{
		console.log(items);
		return [];
	}
	
};
	
	}