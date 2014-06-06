<html>
<head>
	<title>Smart Mirror</title>
	<style type="text/css">
		<?php include('css/main.css') ?>
		<?php include('css/loading.css') ?>
	</style>
	<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,300' rel='stylesheet' type='text/css'>
	<meta name="google" value="notranslate" />
</head>
<body>

	<section class="content">
	<div class="top left">
		<div class="date small dimmed"></div>
		<div class="time"></div>
		<div class="topleftblock xxsmall"></div>
	</div>
	<div class="top right">
		<div class="windsun small dimmed"></div>
		<div class="temp"></div>
		<div class="toprightblock small dimmed"></div>
	</div>
	<div class="center-ver center-hor">
		<div class="openhab light" ></div>	
    </div>
	<div class="lower-third center-hor">
		<div class="center-block light"id="mycompl"></div>
	</div>
	<div class="bottom center-hor">
		<div class="newshead newsh medium"></div>
		<div class="news medium newsd"></div>
	</div>
</section>

<script src="js/jquery.js"></script>
<script src="js/tools/jquery.feedToJSONAjaxStyle.js"></script>
<script src="js/tools/ical_parser.js"></script>
<script src="js/tools/const.js"></script>
<script src="js/module/calendar.js"></script>
<script src="js/module/currentweather.js"></script>
<script src="js/module/weather.js"></script>
<script src="js/module/news.js"></script>
<script src="js/module/openhab.js"></script>
<script src="js/module/compliment.js"></script>
<script src="js/config.js"></script>
<script src="js/tools/moment-with-langs.min.js"></script>
<script src="js/main.js?nocache=<?php echo md5(microtime()) ?>"></script>


</body>
</html>