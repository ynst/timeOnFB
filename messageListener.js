chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action == 'load') {
			sendResponse({
				seconds: parseInt(localStorage['seconds']), 
				date: localStorage['date'],
				yesterdayTotalSeconds: localStorage['yesterdayTotalSeconds']
			});
		}
		if( request.action == 'save') {
			localStorage['seconds'] = request.seconds;
			localStorage['yesterdayTotalSeconds'] = request.yesterdayTotalSeconds;
			localStorage['date'] = request.date;
			localStorage['userName'] = request.userName;
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
