/*--------------------------------------
			Introduction
----------------------------------------






Possible time constants:
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
//var calendarFeed = "http://www.ifeiertage.de/calendar.php?bl=nw&t=dnl";
var calendarFeed = "https://www.google.com/calendar/ical/h2pi9m6s214jk4dc914dr0kmq4%40group.calendar.google.com/private-14b669574c4341a93aca006bc838b4df/basic.ics";
var updateTimeCalendarData = 60000; //Milliseconds
var updateTimeCalendar = 30000; //Milliseconds
var calendarMaxDisplayedDates = 15;
var calendarMaxDisplayedDays = 31;
var calendarContentPosition = "L";

/*--------------------------------------
				News
--------------------------------------*/
var newsFeed = "http://www.faz.net/rss/aktuell/"; //Newsfeed
//var newsFeed = "http://www.spiegel.de/schlagzeilen/tops/index.rss"; //Newsfeed

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
var updateTimeTLBContent = 20000; //Milliseconds

/*--------------------------------------
			Content Center
--------------------------------------*/
var updateTimeContextCenter = 5000;
var fadeTimeContextCenter = 2500; //Milliseconds

/*--------------------------------------
				OpenHAB
--------------------------------------*/
var openhabIP = "192.168.2.190";
var openhabUpdateInterval = 5000;
var openhabAlertTime = 10000;

var openhabAlertItem = "MagicMirrorTXT";

var openhabItems = 	[
						[ // Room
							['towerStatus','Tower PC'],	// Item
							['schreibtischlampeBueroA','Schreibtischlampe'] // OpenHAB ItemID, Name
						],
						[
							['nachttischlampeSchlafzimmerRechts','Nachtlampe rot'],
							['nachttischlampeSchlafzimmerLinks','Nachtlampe blau'],
							['deckenlampeSchlafzimmer','Deckenlampe'],
							['weckerStatus','Wecker']
						],
						[
							['deckenlampeStube','Deckenlampe'],
							['stehlampeWohnzimmerA','Stehlampe'],
							['lgTvWohnzimmerStatus','TV'],
							['openelecStubeStatus','OpenELEC']
						]
					];


var contentBottom = [new smartMirrorNews(newsFeed,updateTimeNewsFeedData,updateTimeNewsFeed)];
var currentWeatherContent = new smartMirrorCurrentWeather(updateTimeCurrentWeatherData);	
//var contentRightBlock = [new smartMirrorWeather(5000,5000),smartMirrorOpenHabStatus(openhabIP,openhabUpdateInterval)];
var contentRightBlock = [new smartMirrorWeather(5000,5000),new smartMirrorCalendar(calendarFeed,updateTimeCalendarData,updateTimeCalendar,calendarMaxDisplayedDates,calendarMaxDisplayedDays,calendarContentPosition)];
var contentCenter = [new smartMirrorCompliments()];
var contentList = [new smartMirrorWeather(15000,15000),new smartMirrorCalendar(calendarFeed,updateTimeCalendarData,updateTimeCalendar,calendarMaxDisplayedDates,calendarMaxDisplayedDays,calendarContentPosition)];