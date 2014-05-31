jQuery.fn.updateWithText = function(text, speed)
{
	var dummy = $('<div/>').html(text);

	if ($(this).html() != dummy.html())
	{
		$(this).fadeOut(speed/2, function() {
			$(this).html(text);
			$(this).fadeIn(speed/2, function() {
				//done
			});		
		});
	}
} 

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function roundVal(temp)
{
	return Math.round(temp * 10) / 10;
}

/*
function cleanOpenHabItemList(itemList)
{	
	var newItemList = [];
	for(var i in itemList){
		if(itemList[i][0]!="openHab"){
			newItemList.push(itemList[i]);
		}
	}
	return newItemList;
}

function cleanWeatherItemList(itemList)
{	
	var newItemList = [];
	for(var i in itemList){
		if(itemList[i][0]!="weather"){
			newItemList.push(itemList[i]);
		}
	}
	return newItemList;
}
*/

function cleanItemList(itemList,content)
{	
	var addItems = content.getContent();
	var newItems = new Array();
	var oldItems = itemList;
	//var aktDate = new Date();

	if(itemList.length == 0){
		return addItems;
	}
	if(addItems.length > 0){

	for(var i in oldItems){
		console.log(oldItems);
		console.log(addItems);
		if(oldItems[i][0]==(addItems.length?addItems[0][0]:0)){
			newItems.push(addItems[0]);
			addItems.shift();
		}else{
			newItems.push(oldItems[i])
		}
	}
	if(addItems.length > 0){
		newItems=newItems.concat(addItems);
		
	}
	console.log(newItems);
	return newItems;
	}else{
		return oldItems;
	}
}



jQuery(document).ready(function($) {

	var eventListTRB = [];
	var eventListTLB = [];
	var eventListCenter = [];
	var eventListCenterAlert = [];
	var eventListBottom = new Array();
	
	setLanguageProperties(lang);

	(function switchContentTopLeft()
	{
		
		if(switchContentTLB == 1){
			if(eventListTLB.length > 0){

				$('.topleftblock').fadeOut(fadeTimeTLB, function() {
					$('.topleftblock').html(eventListTLB[0][1]);
					if(eventListTLB.length > 2){
						eventListTLB.push(eventListTLB[0]);
						eventListTLB.shift();
					}
					$('.topleftblock').fadeIn(fadeTimeTLB);
				});
			}		
		}else{
			if(eventListTLB.length > 0){
				
				if(startUpCounter[0]==false){
					startUpCounter[0] = true;
				}
				for(var i in eventListTLB){
					if(eventListTLB[i][0]=="dates"){
					$('.topleftblock').fadeOut(fadeTimeTLB, function() {
					
						$('.topleftblock').html(eventListTLB[i][1]);
						eventListTLB.shift();
						$('.topleftblock').fadeIn(fadeTimeTLB);
					});
					}
				}
			}
			
		}
		setTimeout(function() {
                        switchContentTopLeft();
                }, updateTimeTLB);
	
	})();
	
	
	(function switchContentTopRight()
	{
		
		if(switchContentTRB == 1){
			if(eventListTRB.length > 0){

				$('.toprightblock').fadeOut(fadeTimeTRB, function() {
					$('.toprightblock').html(eventListTRB[0][1]);
					if(eventListTRB.length > 2){
						eventListTRB.push(eventListTRB[0]);
						eventListTRB.shift();
						
					}
					$('.toprightblock').fadeIn(fadeTimeTRB);
				});

			}
		}else{
			if(eventListTRB.length > 0){
				for(var i in eventListTRB){
					if(eventListTRB[i][0] == "weather"){
						$('.toprightblock').html(eventListTRB[i][1]);
						$('.toprightblock').fadeIn(fadeTimeTRB);
					}
				}
			}
		}

		setTimeout(function() {
                        switchContentTopRight();
                }, updateTimeTRB);
	
	})();
	
	
	(function switchContentCenter()
	{
		if(eventListCenterAlert.length == 0){
			
			$('.center-block').fadeOut(fadeTimeContextCenter, function() {
					$('.center-block').html(eventListCenter[0][1]);
					eventListCenter.push(eventListCenter[0]);
					$('.center-block').fadeIn(fadeTimeContextCenter);
					eventListCenter.shift();
				});
		}else{
			$('.center-block').fadeOut(fadeTimeContextCenter, function() {
					$('.center-block').html(eventListCenterAlert[0][1]);
					$('.center-block').fadeIn(fadeTimeContextCenter);
					eventListCenterAlert.shift();
					
				});
		}
		var updateTContextCenter = updateTimeContextCenter;
		if(eventListCenterAlert.length != 0){
			updateTContextCenter = openhabAlertTime;
		}
		setTimeout(function() {
                   switchContentCenter();
                }, updateTContextCenter);
	
	})();
	
	(function switchContentBottom()
	{
	if(switchContentTRB == 1){
		
			if(eventListBottom.length > 0){

				$('.bottom').fadeOut(fadeTimeTLB, function() {
					$('.newshead').html(eventListBottom[0][1]);
					$('.news').html(eventListBottom[0][2]);
					if(eventListBottom.length > 1){
						eventListBottom.shift();
					}
					$('.bottom').fadeIn(fadeTimeTLB);
				});
			}		
		}else{
			if(eventListBottom.length > 0){
				
				if(startUpCounter[0]==false){
					startUpCounter[0] = true;
				}
				for(var i in eventListBottom){
					if(eventListBottom[i][0]=="news"){
					$('.bottom').fadeOut(fadeTimeTLB, function() {
						
						$('.newshead').html(eventListBottom[0][1]);
						$('.news').html(eventListBottom[0][2]);
						eventListBottom.shift();
						$('.bottom').fadeIn(fadeTimeTLB);
					});
					}
				}
			}
			
		}
		setTimeout(function() {
                        switchContentBottom();
                }, updateTimeTLB);
	
	})();
	
	(function updateTime()
	{
		var now = new Date();

		var day = now.getDay();
		var date = now.getDate();
		var month = now.getMonth();
		var year = now.getFullYear();

		var date = days[day] + ', ' + date+'. ' + months[month] + ' ' + year;
		//var date = days[day] + ', ' + date+' ' + months[month] + ' ' + year;


		$('.date').html(date);
		$('.time').html(now.toTimeString().substring(0,5) + '<span class="sec">'+now.toTimeString().substring(6,8)+'</span>');

		setTimeout(function() {
			updateTime();
		}, 1000);
	})();
	

	(function updateData()
	{
		for(var i in contentList){
			contentList[i].updateData();
		}
		for(var x in contentBottom){
			contentBottom[x].updateData();
		}
		for(var y in contentRightBlock){
			contentRightBlock[y].updateData();
		}
		for(var z in contentCenter){
			contentCenter[z].updateData();
		}
		currentWeatherContent.updateData();

	})();

	
	(function updateContent()
	{	
		for(var i in contentList){
			
			eventListTLB = cleanItemList(eventListTLB,contentList[i]);
		
		}
		for(var x in contentBottom){
			eventListBottom = eventListBottom.concat(contentBottom[x].getContent());
		}
		for(var y in contentRightBlock){
			eventListTRB = cleanItemList(eventListTRB,contentList[y]);
		
		}
		for(var z in contentCenter){
			eventListCenter = eventListCenter.concat(contentCenter[z].getContent());
		}
		
		var curweather = currentWeatherContent.getContent();
		if(curweather.length > 0){
			$('.temp').updateWithText(curweather[0][1], 1000);
			$('.windsun').updateWithText(curweather[1][1], 1000);
		}
		
		
		setTimeout(function() {
        	updateContent();
        }, updateTimeTLBContent);
	})();
});
