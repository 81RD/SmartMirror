SmartMirror
===========

This project is based on MagicMirror (https://github.com/MichMich/MagicMirror) and has been redesigned with special regards to modularisation and flexibility. 
All modules are initialised through the config.js file and have to contain the following values and methods:

```javascript
function moduleName(){
	this.fname 			= "moduleName";

	this.updateData = function(){
	
	};
	
	this.getContent = function(){

	};
	
}
```

Schedule:
--------------------------
Version 1 (in progress):
- Modularisation
- Calendar
- Weather
- News
- Compliments
- OpenHAB status view

Version 2:
- Further modularization
- User profiles 
- OpenHAB notification
- Mail notification
- Video player
- YouTube player
- Now Playing (via OpenHAB)

Version 3:
- Twitter wall
- Facebook notification
- Health overview 
- Todo list (Remember The Milk)
- Zitate.de as an alternative for compliments

Wishlist:
- Hue status
