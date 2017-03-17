chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action == 'load') {
			var time = parseInt(localStorage['seconds']);
			var date = localStorage['date'];
			sendResponse({secounds: time, date: date});
		}
		if( request.action == 'save') {
			localStorage['seconds'] = request.secounds;
			localStorage['date'] = request.date;
			localStorage['userName'] = request.userName;
		}
		if ( request.action == 'trackTime?'){
			if (localStorage['tracking']){
				sendResponse(false);
			} else {
				localStorage['tracking'] = true;
				sendResponse(true);
			}
		}
	}
);

// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', 'UA-38323138-1']);
// _gaq.push(['_trackPageview']);

// (function() {
//   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//   ga.src = 'https://ssl.google-analytics.com/ga.js';
//   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
// })();
