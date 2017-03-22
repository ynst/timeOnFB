var FbExtension = {
	totalSeconds: 0,
	yesterdayTotalSeconds: 0,
	lastTimestamp: 0,
	list: null,
	link: null,
	userName: null,
	initiate: function() {
		this.link = document.createElement('a');
		this.link.className = "_2s25";
		
		this.link.href = "#";
		this.link.innerHTML = 'wait..';
		
		if ( (nameTag = document.getElementsByClassName('_2s25')[0])){
			this.userName = nameTag.getElementsByTagName("span")[0].innerHTML;
		}

		// inserts the time before fbList (profile picture)
		if( (fbList = document.getElementsByClassName('_1k67 _4q39')[0]) ){
			fbList.insertBefore(this.link, fbList.firstChild);
		}

		// console.log(fbList);
                        // fbList.insertBefore(this.list, tinyman);


        this.yesterdayTimeDisplay = document.createElement('a');
		this.yesterdayTimeDisplay.className = "_2s25";
		this.yesterdayTimeDisplay.innerHTML = this.htmlTime(this.yesterdayTotalSeconds);

		// inserts the time before fbList (profile picture and name)
		if( (fbList = document.getElementsByClassName('_1k67 _4q39')[0]) ){
			fbList.insertBefore(this.yesterdayTimeDisplay, fbList.firstChild);
		}

		chrome.extension.sendMessage({action: 'load'}, this.loaded.bind(this));
	},
	loaded: function(data) {
		console.log('data received');
		console.log(data);

		this.totalSeconds = data.seconds || 0;
		this.lastTimestamp = data.date || this.getTimestamp();
		this.yesterdayTotalSeconds = data.yesterdayTotalSeconds || 0;
		// window.addEventListener('unload', FbExtension.onWindowClose.bind(FbExtension), false);

		var trackId = window.setInterval(this.trackTime.bind(this), 1000);

		// blur: when tab stops being open, halts tracking time
		window.addEventListener('blur', function () {window.clearInterval(trackId)});

		// start tracking time again when tab is opened again
		window.addEventListener('focus', function () {trackId = window.setInterval(FbExtension.trackTime.bind(FbExtension), 1000)});
	},
	trackTime: function() {
		console.log("#################");
		// num of posts
		console.log(($("html").html().match(/UFILikeLink/g)  || []).length); 

		// num of liked posts
		console.log(($("html").html().match(/UFILinkBright/g)  || []).length); 
		console.log("#################");

		var currentTimestamp;

		// day turn
		if( (currentTimestamp = this.getTimestamp()) != this.lastTimestamp ) {
			this.yesterdayTotalSeconds = this.totalSeconds;
			this.totalSeconds = 0;
		}

		this.totalSeconds++;
		this.lastTimestamp = currentTimestamp;

		chrome.extension.sendMessage({
			action: 'save', 
			seconds: this.totalSeconds, 
			yesterdayTotalSeconds: this.yesterdayTotalSeconds,
			date: this.lastTimestamp, 
			userName: this.userName
		});

		this.updateClock.bind(this)();
	},
	updateClock: function() {
		this.link.innerHTML = this.htmlTime(this.totalSeconds);
		this.yesterdayTimeDisplay.innerHTML = this.htmlTime(this.yesterdayTotalSeconds);
	},
	getTimestamp: function() {
		var d = new Date();
		return [
			d.getFullYear(),
			(d.getMonth() + 1 < 10 ? "0" + (d.getMonth()+1) : (d.getMonth()+1)),
			(d.getDate() < 10 ? "0"+d.getDate() : d.getDate())
		].join('');
	},
	htmlTime: function(seconds){
		var hours,minutes,seconds;

		hours = Math.floor(seconds / 3600);
		minutes = Math.floor( (seconds - hours*3600) / 60 );
		seconds = seconds - minutes*60 - hours*3600;

		if( hours < 10 ) hours = "0"+hours;
		if( minutes < 10 ) minutes = "0"+minutes;
		if( seconds < 10 ) seconds = "0"+seconds;

		return hours+":"+minutes+":"+seconds;
	}
};
FbExtension.initiate()