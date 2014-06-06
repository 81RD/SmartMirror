function smartMirrorWeather(updateTimeNewsFeedData,updateTimeNewsFeed){
	//this.feed 			= newsFeed;
	this.updateTimeData	= updateTimeNewsFeedData;
	this.updateTime		= updateTimeNewsFeed;
	//this.eventList 		= new Array();
	this.pushItems = new Array();
	//this.newshead 		= new Array();
	//this.news 	 		= new Array();
	this.fname 			= "weather";

	this.updateData = function()
{
var tmp_this = this;
	$.ajax({
    	url: "http://api.openweathermap.org/data/2.5/forecast",
    	async: false,
    	dataType: 'json',
		data:weatherParams,
		success: function(json, textStatus) {
			var tmp_Items = new Array();
			var forecastData = {};
			for (var i in json.list) {
				var forecast = json.list[i];
				var dateKey  = forecast.dt_txt.substring(0, 10);

				if (forecastData[dateKey] == undefined) {
					forecastData[dateKey] = {
						'timestamp':forecast.dt * 1000,
						'temp_min':forecast.main.temp,
						'temp_max':forecast.main.temp
					};
				} else {
					forecastData[dateKey]['temp_min'] = (forecast.main.temp < forecastData[dateKey]['temp_min']) ? forecast.main.temp : forecastData[dateKey]['temp_min'];
					forecastData[dateKey]['temp_max'] = (forecast.main.temp > forecastData[dateKey]['temp_max']) ? forecast.main.temp : forecastData[dateKey]['temp_max']; 
				}

			}


			var forecastTable = $('<table />').addClass('forecast-table');
			var opacity = 1;
			var rowhead = $('<tr />').css('opacity', opacity);
			
			rowhead.append($('<td/>').addClass('day').html(s_date));
			rowhead.append($('<td/>').addClass('temp-min').html(s_min));
			rowhead.append($('<td/>').addClass('temp-max').html(s_max));
			forecastTable.append(rowhead);
			for (var i in forecastData) {
				var forecast = forecastData[i];
				var dt = new Date(forecast.timestamp);
				var row = $('<tr />').css('opacity', opacity);

				row.append($('<td/>').addClass('day').html(dayAbbr[dt.getDay()]));
				row.append($('<td/>').addClass('temp-min').html(roundVal(forecast.temp_min)));
				row.append($('<td/>').addClass('temp-max').html(roundVal(forecast.temp_max)));

				forecastTable.append(row);
				opacity -= 0.155;
			}
		
		
		//$('.windsun').updateWithText(windString+' '+sunString, 1000);
		tmp_this.pushItems = ["weather",forecastTable];
		//console.log(pushItems);
		//return tmp_this.pushItems
	}});
		tmp_this = this;

		//console.log(tmp_this.updateTimeData);
		setTimeout(function() {
			//console.log("MMMMMMMMMM");
        	tmp_this.updateData();
        }, tmp_this.updateTimeData);
};

this.getContent = function()
{
		var tmp_this = this;
		//console.log(tmp_this.pushItems);

		return tmp_this.pushItems;
};
}