function getCurrentDate() {
	var currentDate = new Date();
	var year = padLeft(currentDate.getFullYear(), 4);
	var month = padLeft(currentDate.getMonth() + 1, 2);
	var day = padLeft(currentDate.getDate(), 2);
	return year + month + day;
}

function getCurrentDateTime() {
	var currentDate = new Date();
	var year = padLeft(currentDate.getFullYear(), 4); 
	var month = padLeft(currentDate.getMonth() + 1, 2);
	var day = padLeft(currentDate.getDate(), 2);
	var hour = padLeft(currentDate.getHours(), 2);
	var minute = padLeft(currentDate.getMinutes(), 2);
	var second = padLeft(currentDate.getSeconds(), 2);
	return String(year) + String(month) + String(day) + String(hour) + String(minute) + String(second);
}

function isDateTimePassed(currentDateYYYYMMDDHHMMSS, compareDateYYYYMMDDHHMMSS) {
	return isPassed(currentDateYYYYMMDDHHMMSS, compareDateYYYYMMDDHHMMSS);
}

function isDatePassed(currentDateYYYYMMDDHHMMSS, compareDateYYYYMMDDHHMMSS) {
	var currentDateYYYYMMDD = currentDateYYYYMMDDHHMMSS.substring(0, 8);
	var compareDateYYYYMMDD = compareDateYYYYMMDDHHMMSS.substring(0, 8);
	return isPassed(currentDateYYYYMMDD, compareDateYYYYMMDD);
}

function isPassed(currentValue, compareValue) {
	if (currentValue == "" || compareValue == "") {
		return false;
	}
	return currentValue >= compareValue;
}

function getDate(dateYYYYMMDDHHMMSS) {
	if (dateYYYYMMDDHHMMSS == "") {
		return "";
	}
	return dateYYYYMMDDHHMMSS.substring(0, 8);
}

function getTime(dateYYYYMMDDHHMMSS) {
	return dateYYYYMMDDHHMMSS.substring(8, 10) + ":" + dateYYYYMMDDHHMMSS.substring(10, 12);
}

function getHour(dateYYYYMMDDHHMMSS) {
	return dateYYYYMMDDHHMMSS.substring(8, 10);
}

function getMinute(dateYYYYMMDDHHMMSS) {
	return dateYYYYMMDDHHMMSS.substring(10, 12);
}

function getFormattedDate(dateYYYYMMDDHHMMSS, language) {
	if (dateYYYYMMDDHHMMSS == "") {
		return "";
	}

	var monentLang ;
	if (language == 'zh_CN' || language == 'zh-CN') {
		monentLang = 'zh-cn';
	} else if (language == 'zh_TW' || language == 'zh-TW') {
		monentLang = 'zh-tw';
	} else {
		monentLang = 'en';
	}
	moment.locale(monentLang);
	return moment(dateYYYYMMDDHHMMSS, "YYYYMMDDhhmmss").format('ll');
}

function getFormattedDateTime(dateYYYYMMDDHHMMSS, language) {
	if (dateYYYYMMDDHHMMSS == "") {
		return "";
	}

	var monentLang ;
	if (language == 'zh_CN' || language == 'zh-CN') {
		monentLang = 'zh-cn';
	} else if (language == 'zh_TW' || language == 'zh-TW') {
		monentLang = 'zh-tw';
	} else {
		monentLang = 'en';
	}
	moment.locale(monentLang);
	return moment(dateYYYYMMDDHHMMSS, "YYYYMMDDhhmmss").format('ll') + " " + getFormattedTime(dateYYYYMMDDHHMMSS);
}

function getFormattedTime(dateYYYYMMDDHHMMSS) {
	if (dateYYYYMMDDHHMMSS == "") {
		return "";
	}
	var hour = dateYYYYMMDDHHMMSS.substring(8, 10);
	var minute = dateYYYYMMDDHHMMSS.substring(10, 12);
	return hour + ":" + minute;
}

function getMonth(dateYYYYMMDDHHMMSS, language) {
	if (dateYYYYMMDDHHMMSS == "") {
		return "";
	}

	var monentLang ;
	if (language == 'zh_CN' || language == 'zh-CN') {
		monentLang = 'zh-cn';
	} else if (language == 'zh_TW' || language == 'zh-TW') {
		monentLang = 'zh-tw';
	} else {
		monentLang = 'en';
	}
	moment.locale(monentLang);
	return moment(dateYYYYMMDDHHMMSS, "YYYYMMDDhhmmss").format('MMM');
}

function getWeek(dateYYYYMMDD, language) {
	if (dateYYYYMMDD == "") {
		return "";
	}

	if (language == 'zh_CN' || language == 'zh-CN') {
		moment.locale('zh-cn');
		return moment(dateYYYYMMDD, "YYYYMMDD").format('dd');
	} else if (language == 'zh_TW' || language == 'zh-TW') {
		moment.locale('zh-tw');
		return moment(dateYYYYMMDD, "YYYYMMDD").format('dd');
	} else {
		moment.locale('en');
		return moment(dateYYYYMMDD, "YYYYMMDD").format('ddd').substr(0, 1);
	}
}

function getWeekDay(dateYYYYMMDD) {
	if (dateYYYYMMDD == "") {
		return "";
	}
	var year = dateYYYYMMDD.substring(0, 4);
	var month = new Number(dateYYYYMMDD.substring(4, 6)) - 1;
	var day = dateYYYYMMDD.substring(6, 8);
	var date = new Date(year, month, day);

	return date.getDay();
}
