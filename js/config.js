/*--------------------------------------
			Introduction
----------------------------------------






Possible constants:
- everyDay 
- everyHour 
- everyMinute 

--------------------------------------*/


/*--------------------------------------
			Language
--------------------------------------*/
var lang = 'de';
				
/*--------------------------------------
			OpenWeather
--------------------------------------*/
	var updateTimeCurrentWeatherData = 60000; //Milliseconds
	var weatherParams = {
		'q':'Dortmund,Germany',
		'units':'metric',
		'lang':lang
	};

var newsVideoFeed = ""; //Nachrichten Video Feed

/*--------------------------------------
			Calendar
--------------------------------------*/
var calendarFeed = "http://www.feiertage-online.de/ical/downloads/feiertage-de-2014.ics";

var updateTimeCalendarData = 60000; //Milliseconds
var updateTimeCalendar = 5000; //Milliseconds
var calendarMaxDisplayedDates = 15;
var calendarMaxDisplayedDays = 31;
var calendarContentPosition = "L";

/*--------------------------------------
				News
--------------------------------------*/
var newsFeed = "http://www.faz.net/rss/aktuell/"; //Newsfeed

var updateTimeNewsFeedData = everyMinute; //Milliseconds
var updateTimeNewsFeed = 15000; //Milliseconds

/*--------------------------------------
			Top Right Block
--------------------------------------*/
var switchContentTRB = 1; //Switch through different contents (1 = Yes / 0 = Show only Weather)
var contentTRB = ["weather","openHab"]
var updateTimeTRB = 10000; //Milliseconds
var fadeTimeTRB = 2500; //Milliseconds

/*--------------------------------------
			Top Left Block
--------------------------------------*/
var switchContentTLB = 1; //Switch through different contents (1 = Yes / 0 = Show only Dates)
var contentTLB = ["dates"]
var updateTimeTLB = 10000; //Milliseconds
var fadeTimeTLB = 2500; //Milliseconds
var updateTimeTLBContent = 25000; //Milliseconds

/*--------------------------------------
			Content Center
--------------------------------------*/
var updateTimeContextCenter = 5000;
var fadeTimeContextCenter = 2500; //Milliseconds

/*--------------------------------------
				OpenHAB
--------------------------------------*/
var openhabIP = "192.168.2.190";
var openhabUpdateInterval = 600000;
var openhabAlertTime = 10000;

var openhabAlertItem = "MagicMirrorTXT";



var contentRightBlock = [new smartMirrorWeather(60000,60000), new smartMirrorOpenHabStatus(openhabIP)];
var contentLeftBlock = [new smartMirrorCalendar(calendarFeed,updateTimeCalendarData,updateTimeCalendar,calendarMaxDisplayedDates,calendarMaxDisplayedDays,calendarContentPosition)];
var contentBottom = [new smartMirrorNews(newsFeed,updateTimeNewsFeedData,updateTimeNewsFeed)];
var contentCenter = [new smartMirrorCompliments()];
var currentWeatherContent = new smartMirrorCurrentWeather(updateTimeCurrentWeatherData);						
