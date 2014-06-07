	var iconTable = {
			'01d':'wi-day-sunny',
			'02d':'wi-day-cloudy',
			'03d':'wi-cloudy',
			'04d':'wi-cloudy-windy',
			'09d':'wi-showers',
			'10d':'wi-rain',
			'11d':'wi-thunderstorm',
			'13d':'wi-snow',
			'50d':'wi-fog',
			'01n':'wi-night-clear',
			'02n':'wi-night-cloudy',
			'03n':'wi-night-cloudy',
			'04n':'wi-night-cloudy',
			'09n':'wi-night-showers',
			'10n':'wi-night-rain',
			'11n':'wi-night-thunderstorm',
			'13n':'wi-night-snow',
			'50n':'wi-night-alt-cloudy-windy'		
		};
		
var compliments = [
		'Du bist der Beste!',
		'Schau dich an... Hammer!',
		'Heute ist dein Tag!',
		'Spieglein, Spieglein an der Wand ...',
		'... wer ist die Schönste im ganzen Land?'
	];		
	
var everyDay = 86400000;	
var everyHour = 3600000;
var everyMinute = 60000;		

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var dayAbbr = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];
var today = 'Today';
var tomorrow = 'Tomorrow';
var in_days = 'days';
var s_date = 'Date';
var	s_min = 'Min.';
var	s_max = 'Max.';
		
		
function setLanguageProperties(lang){
	switch (lang)
    {
        case 'de':
            days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
            months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
            dayAbbr = ['So','Mo','Di','Mi','Do','Fr','Sa'];
            today = 'heute';
            tomorrow = 'morgen';
            in_days = 'Tage';
			s_date = 'Datum';
			s_min = 'Min.';
			s_max = 'Max.';
            break;
        case 'nl':
            days = ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'];
            months = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
            dayAbbr = ['zo','ma','di','wo','do','vr','za'];
            today = 'vandaag';
            tomorrow = 'morgen';
            in_days = 'dagen';
			s_date = 'Datum';
			s_min = 'Min.';
			s_max = 'Max.';
            break;
       case 'fr':
            days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
            months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
            dayAbbr = ['dim','lun','mar','mer','jeu','ven','sam'];
            today = 'aujourd\'hui';
            tomorrow = 'demain';
            in_days = 'jour(s)';
			s_date = 'Date';
			s_min = 'Min.';
			s_max = 'Max.';
            break;            
        default:
            days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            dayAbbr = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];
            today = 'Today';
            tomorrow = 'Tomorrow';
            in_days = 'days';
    }
}
		
		
