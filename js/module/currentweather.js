function smartMirrorCurrentWeather(updateTimeCurrentWeatherData){
	//this.feed 			= newsFeed;
	this.updateTimeData	= updateTimeCurrentWeatherData;
	//this.updateTime		= updateTimeNewsFeed;
	//this.eventList 		= new Array();
	//this.newshead 		= new Array();
	//this.news 	 		= new Array();
	this.pushItems = new Array();
	
	
	 
	
	


this.kmh2beaufort = function(kmh)
{
	var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
	for (var beaufort in speeds) {
		var speed = speeds[beaufort];
		if (speed > kmh) {
			return beaufort;
		}
	}
	return 12;
};

this.updateData = function ()
{
	var tmp_this = this;
	$.ajax({
    	url: "http://api.openweathermap.org/data/2.5/weather",
    	async: false,
    	dataType: 'json',
		data:weatherParams,
		success: function(json, textStatus) {

		var tmp_Items = new Array();
		var temp = roundVal(json.main.temp);
		var temp_min = roundVal(json.main.temp_min);
		var temp_max = roundVal(json.main.temp_max);

		var wind = roundVal(json.wind.speed);

		var iconClass = iconTable[json.weather[0].icon];
		var icon = $('<span/>').addClass('icon').addClass('dimmed').addClass('wi').addClass(iconClass);
		
		tmp_Items.push(new Array("currentweather_icon",icon.outerHTML()+temp+'&deg;'));	
		//$('.temp').updateWithText(icon.outerHTML()+temp+'&deg;', 1000);


		var now = new Date();
		var sunrise = new Date(json.sys.sunrise*1000).toTimeString().substring(0,5);
		var sunset = new Date(json.sys.sunset*1000).toTimeString().substring(0,5);

		var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + tmp_this.kmh2beaufort(wind) ;
		var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + sunrise;
		if (json.sys.sunrise*1000 < now && json.sys.sunset*1000 > now) {
			sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset;
		}
		
		tmp_Items.push(new Array("currentweather_windsun",windString+' '+sunString));	
		//$('.windsun').updateWithText(windString+' '+sunString, 1000);
		tmp_this.pushItems = tmp_Items;
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

this.getContent =function()
{
	var tmp_this = this;
	//console.log(pushItems);
	return tmp_this.pushItems;
};

}