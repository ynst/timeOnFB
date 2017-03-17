var FbExtension = {
	totalSecounds: 0,
	lastTimestamp: 0,
	list: null,
	link: null,
	userName: null,
	initiate: function() {
		// this.list = document.createElement('li');
		// this.list.className = "_2s25";
		this.link = document.createElement('a');
		this.link.className = "_2s25";

		this.link.href = "#";
		this.link.innerHTML = 'wait..';
		// this.list.appendChild(this.link);

		// var fbList;
		// var tinyman;

		// parse username from HTML
		if ( (nameTag = document.getElementsByClassName('_2s25')[0])){
			this.userName = nameTag.getElementsByTagName("span")[0].innerHTML;
		}

		// inserts the time
		if( (fbList = document.getElementsByClassName('_1k67 _4q39')[0]) ){
			fbList.insertBefore(this.link, fbList.firstChild);
		}

		// console.log(fbList);
                        // fbList.insertBefore(this.list, tinyman);

		chrome.extension.sendMessage({action: 'load'}, this.loaded.bind(this));
	},
	loaded: function(data) {
		console.log('data recieved');
		console.log(data);

		this.totalSecounds = data.secounds || 0;
		this.lastTimestamp = data.date || this.getTimestamp();

		setInterval(this.trackTime.bind(this), 1000);
		// window.addEventListener('unload', FbExtension.onWindowClose.bind(FbExtension), false);
	},
	trackTime: function() {
		var currentTimestamp;

		if( (currentTimestamp = this.getTimestamp()) != this.lastTimestamp ) {
			this.totalSecounds = 0;
		}

		this.totalSecounds++;
		this.lastTimestamp = currentTimestamp;

		chrome.extension.sendMessage({
			action: 'save', 
			secounds: this.totalSecounds, 
			date: this.lastTimestamp, 
			userName: this.userName
		});

		this.updateClock();
	},
	updateClock: function() {
		var hours,minutes,secounds;

		hours = Math.floor(this.totalSecounds / 3600);
		minutes = Math.floor( (this.totalSecounds - hours*3600) / 60 );
		secounds = this.totalSecounds - minutes*60 - hours*3600;

		if( hours < 10 ) hours = "0"+hours;
		if( minutes < 10 ) minutes = "0"+minutes;
		if( secounds < 10 ) secounds = "0"+secounds;

		this.link.innerHTML = hours+":"+minutes+":"+secounds;
	},
	getTimestamp: function() {
		var d = new Date();
		return [
			d.getFullYear(),
			(d.getMonth() + 1 < 10 ? "0" + (d.getMonth()+1) : (d.getMonth()+1)),
			(d.getDate() < 10 ? "0"+d.getDate() : d.getDate())
		].join('');
	}
};
FbExtension.initiate();
