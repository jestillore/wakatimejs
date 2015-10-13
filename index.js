
var request = require('request');
var btoa = require('btoa');

var URL = 'https://wakatime.com/api/v1';

function serialize (obj) {
	return '?' + Object.keys(obj).reduce(function (a, k) {
		a.push(k + '=' + encodeURIComponent(obj[k]));
		return a
	}, []).join('&');
}

Date.prototype.yyyymmdd = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd  = this.getDate().toString();
	return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0'+ dd[0]); // padding
};

function getDateString(date) {
	if (date instanceof Date) {
		return date.yyyymmdd();
	}
	return date;
}

function WakaInstance(apiKey) {
	if (!(this instanceof WakaInstance)) return new WakaInstance(apiKey);

	if (apiKey) {
		this._apiKey = apiKey;
	}

	this.getApiOptions = function (path, query) {
		var qs = query ? serialize(query) : '';
		return {
			url: URL + path + qs,
			headers: {
				'Authorization': 'Basic ' + btoa(this._apiKey)
			}
		};
	};
}

WakaInstance.prototype.setAPIKey = function(apiKey) {
	this._apiKey = apiKey;
};

WakaInstance.prototype.getAPIKey = function() {
	return this._apiKey;
};

WakaInstance.prototype.currentUser = function(callback) {
	request(this.getApiOptions('/users/current'), function (error, response, body) {
		callback(error, response, body);
	});
};

WakaInstance.prototype.stats = function(stat, callback) {
	switch (stat) {
		case 'last_7_days':
		case 'last_30_days':
		case 'last_6_months':
		case 'last_year':
		case 'all_time':
			request(this.getApiOptions('/users/current/stats/' + stat), function (error, response, body) {
				callback(error, response, body);
			});
			break;
		default:
			// not valid
	}
};

WakaInstance.prototype.summaries = function(object, callback) {
	var start = '', end = '';

	if (typeof object == 'object' && !(object instanceof Date)) {
		start = getDateString(object.start);
		end = getDateString(object.end);
	}
	else {
		start = getDateString(object);
		end = getDateString(object);
	}

	request(this.getApiOptions('/users/current/summaries', {
		start: start,
		end: end
	}), function (error, response, body) {
		callback(error, response, body);
	});
};

WakaInstance.prototype.durations = function(date, callback) {
	request(this.getApiOptions('/users/current/durations', {
		date: getDateString(date)
	}), function (error, response, body) {
		callback(error, response, body);
	});
};


// // get summaries
// wi.summaries({
// 	start: new Date(),
// 	end: new Date()
// }, function (error, response, body) {

// });

// wi.summaries({
// 	start: 'YYYY-MM-DD',
// 	end: 'YYYY-MM-DD'
// }, function (error, response, body) {

// });

// wi.summaries(new Date(), function (error, response, body) {

// });

// wi.summaries('YYYY-MM-DD', function (error, response, body) {

// });

// get logged time for the given days as asn array of duration blocks
// wi.durations(new Date(), function (error, response, body) {

// });

// wi.durations('YYYY-MM-DD', function (error, response, body) {

// });

module.exports = WakaInstance;
