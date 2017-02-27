var app = angular.module('ipoAdminApp.service', ['pascalprecht.translate'])

app.service('sharedProperties', ['$rootScope', function ($rootScope) {
	return {
		getIPOMakerCheckerRole: function(){
			return getSessionStorage().getItem('ipoMakerCheckerRole');
		},
		getBaseURL: function() {
			if ($rootScope.baseURL == undefined) {
				return "";
			}
			return $rootScope.baseURL;
		},
		setBaseURL: function(value) {
			$rootScope.baseURL = value;
		},
		getDeviceType: function() {
			if (getSessionStorage().getItem('deviceType') == null) {
				getSessionStorage().setItem('deviceType', DEVICE_ITRADE);
			}
			return getSessionStorage().getItem('deviceType');
		},
		setDeviceType: function(value) {
			getSessionStorage().setItem('deviceType', value);
		},
		isCheckerRole: function() {
			if (getSessionStorage().getItem('roleType') == null) {
				getSessionStorage().setItem('roleType', ROLE_MAKER);
			}
			return getSessionStorage().getItem('roleType') == ROLE_CHECKER;
		},		
		setCheckerRole: function(value) {
			if (value) {
				getSessionStorage().setItem('roleType', ROLE_CHECKER);
			}
			else {
				getSessionStorage().setItem('roleType', ROLE_MAKER);
			}
		},
		isCreateIPO: function() {
			if (getSessionStorage().getItem('createIPO') == null) {
				getSessionStorage().setItem('createIPO', false);
			}
			return getSessionStorage().getItem('createIPO') == 'true';
		},
		setCreateIPO: function(value) {
			getSessionStorage().setItem('createIPO', value);
		},
		isEditMode: function() {
			if (getSessionStorage().getItem('editMode') == null) {
				getSessionStorage().setItem('editMode', false);
			}
			return getSessionStorage().getItem('editMode') == 'true';
		},
		setEditMode: function(value) {
			getSessionStorage().setItem('editMode', value);
		},
		getCurrentIPOId: function() {
			return getSessionStorage().getItem('currentIPOId');
		},
		setCurrentIPOId: function(value) {
			getSessionStorage().setItem('currentIPOId', value);
		},
		getCurrentIPOIds : function(value) {
			var currentIPOIds = getSessionStorage().getItem('currentIPOIds');
			var currentIPOIdsArray = currentIPOIds.split(",");
			return currentIPOIdsArray;
		},
		setCurrentIPOIds : function(value) {
			getSessionStorage().setItem('currentIPOIds', value);
		},
		getCurrentIPOCount: function() {
			return this.getCurrentIPOIds().length;
		},
		getFutureIPOId: function() {
			return getSessionStorage().getItem('futureIPOId');
		},
		setFutureIPOId: function(value) {
			getSessionStorage().setItem('futureIPOId', value);
		},
		getPastIPODayFrom: function() {
			return getSessionStorage().getItem('pastIPODayFrom');
		},
		setPastIPODayFrom: function(value) {
			getSessionStorage().setItem('pastIPODayFrom', value);
		},
		getClientId: function() {
			return getSessionStorage().getItem('clientId');
		},
		getClientIds: function() {
			var clientIds = getSessionStorage().getItem('clientIds');
			if (clientIds != null) {
				return clientIds.split(",");
			} else {
				return null;
			}
		},
		setClientids: function(value) {
			getSessionStorage().setItem('clientIds', value);
		},
		getClientId: function() {
			return getSessionStorage().getItem('clientId');
		},
		setClientId: function(value) {
			getSessionStorage().setItem('clientId', value);
		},
		getCurrentIPOReqType: function() {
			return getSessionStorage().getItem('currentIPOReqType');
		},
		setCurrentIPOReqType: function(value) {
			getSessionStorage().setItem('currentIPOReqType', value);
		},
		removeCurrentIPOReqType: function() {
			getSessionStorage().removeItem('currentIPOReqType');
		},
		getCurrentIPOTerms: function() {
			return getSessionStorage().getItem('currentIPOTerms');
		},
		setCurrentIPOTerms: function(value) {
			getSessionStorage().setItem('currentIPOTerms', value);
		},
		removeCurrentIPOTerms: function() {
			getSessionStorage().removeItem('currentIPOTerms');
		},
		
		getCurrentIPONoOfShares: function() {
			return getSessionStorage().getItem('currentIPONoOfShares');
		},
		setCurrentIPONoOfShares: function(value) {
			getSessionStorage().setItem('currentIPONoOfShares', value);
		},
		removeCurrentIPONoOfShares: function() {
			getSessionStorage().removeItem('currentIPONoOfShares');
		},
		getCurrentIPOFinancingRatio: function() {
			return getSessionStorage().getItem('currentIPOFinancingRatio');
		},
		setCurrentIPOFinancingRatio: function(value) {
			getSessionStorage().setItem('currentIPOFinancingRatio', value);
		},
		removeCurrentIPOFinancingRatio: function() {
			getSessionStorage().removeItem('currentIPOFinancingRatio');
		},	
		getCurrentIPOReqId: function() {
			return getSessionStorage().getItem('currentIPOReqId');
		},
		setCurrentIPOReqId: function(value) {
			getSessionStorage().setItem('currentIPOReqId', value);
		},
		removeCurrentIPOReqId: function() {
			getSessionStorage().removeItem('currentIPOReqId');
		},
		getLanguage: function() {
			return getSessionStorage().getItem('language');
		},
		setLanguage: function(value) {
			getSessionStorage().setItem('language', value);
		},			
		removeCurrentIPOData: function() {
			this.removeCurrentIPOReqType();
			this.removeCurrentIPOTerms();
			this.removeCurrentIPONoOfShares();
			this.removeCurrentIPOFinancingRatio();
			this.removeCurrentIPOReqId();
		},
		setBypassLoginData: function(data) {
			var obj = JSON.parse(data);
			getSessionStorage().setItem('deviceType', DEVICE_CLIENT);
			getSessionStorage().setItem('agreed', AGREED);
			angular.forEach(obj, function(value, key) {
				if (key == 'baseURL') {
					$rootScope.baseURL = value;
				}
				else {
					getSessionStorage().setItem(key, value);
				}
			})
		}
	}
}]);

app.config(['$translateProvider', function ($translateProvider) {
	var language = 'en';
	if (getSessionStorage().getItem('language') != null) {
		language = getSessionStorage().getItem('language');
		if (language == 'zh_TW') {
			language = 'zh-TW';
		} else if (language == 'zh_CN') {
			language = 'zh-CN';
		}
		if (language != 'zh-TW' && language != 'zh-CN') {
			language = 'en';
		}		
		console.log("language got from SessionStorage [" + language + "]");
	} 

	// configures staticFilesLoader
	$translateProvider.useStaticFilesLoader({
		files: [{
			prefix: 'locales/',
			suffix: '/ns.common.json'
		}, {
			prefix: 'locales/',
			suffix: '/ns.returncode.json'
		}]
	});
	$translateProvider.preferredLanguage(language);
}]);

app.service('redirectService', ['$state', function ($state) {
	return {
		toAccountService: function () {
			return $(location).attr('href', '/i/accountservice/index.html');
		},

		toCorporateAction: function() {
			return $(location).attr('href', '/i/corpaction/index.html');
		},

		toDisclaimer: function () {
			return $(location).attr('href', '/i/declaration');
		},

		toIndex: function () {
			// local test
			//return $(location).attr('href', '/index.html');
			return $(location).attr('href', '/i/signin');
		},

		toSignOff: function() {
			return $(location).attr('href', '/i/signoff');
		},

		toTrade: function() {
			return $(location).attr('href', '/i/trade');
		},

		toOverview: function () {
			return $state.go('nav.overview');
		},

		toApplyDetails: function() {
			return $state.go('nav.applydetails');
		},

		toApplyAck: function() {
			return $state.go('nav.applyack');
		},		
		
		toCancelAck: function() {
			return $state.go('nav.cancelack');
		},
		
		toSubRecord: function() {
			return $state.go('nav.subrecord');
		}			
	};
}]);

app.service('applicationStatusService', function() {
	return {
		getApplicationStatus: function(ipo) {
			if (ipo == undefined) {
				return IPO_NOT_ALLOWED;
			}
			else {
				switch (ipo['clientSubStatus']) {
					case IPO_PROCESSING:
					case IPO_ALLOTTED:
					case IPO_ACCEPTED:
						return ipo['clientSubStatus'];
					case IPO_NOT_APPLIED:
					case IPO_CANCELLED:
					case IPO_REJECTED:
						if (ipo['offerCutoff'] == 'N') {
							if (ipo['subStatus'] == 'Y') {
								if (ipo['subCutoff'] == 'N') {
									return IPO_AVAILABLE;
								}
								else {
									return IPO_CUTOFF;
								}
							}
							else {
								return IPO_NOT_ALLOWED;	
							}
						} else {
							return IPO_CUTOFF;
						}
					default:
						return IPO_NOT_ALLOWED;
				}
			}
		},
		isIPOAvailable: function(status) {
			return status == IPO_AVAILABLE;
		},		
		isIPOCutoff: function(status) {
			return status == IPO_CUTOFF;
		},
		isIPOProcessing: function(status) {
			return status == IPO_PROCESSING;
		},		
		isIPOAccepted: function(status) {
			return status == IPO_ACCEPTED;
		},
		isIPOAllotted: function(status) {
			return status == IPO_ALLOTTED;
		},
		isIPOCancelled: function(status) {
			return status == IPO_CANCELLED;
		},		
		isIPORejected: function(status) {
			return status == IPO_REJECTED;
		},		
		isIPONotAllowed: function(status) {
			return status == IPO_NOT_ALLOWED;
		},
		isIPONotApplied: function(status){
			return status == IPO_NOT_APPLIED;
        }			
	}
});

app.service('timelineService', ['$translate', function ($translate) {
	return {
		getTimelineHtml: function(ipo, requestTime) {
		//Create time line
			var language = getSessionStorage().getItem('language');	
			var year, month, day, weekDay, startDay, endDay, isToday, day1AfterAllot, dayBetweenAllotList, dayBeforeList;
			//get date need to display after allotment date
			startDay = Number(ipo['announceDate'].substring(0, 8));
			endDay = Number(ipo['listingDate'].substring(0, 8));
			day1AfterAllot = "";
			dayBetweenAllotList = "";
			dayBeforeList = "";
			for (var i = startDay + 1; i < endDay; i++) {
				year = i.toString().substring(0, 4);
				month = i.toString().substring(4, 6);
				day = i.toString().substring(6, 8);
				if (month > 12) {
					//invalid month, change to new year. e.g. 20161301
					i = Number(i.toString().substring(0, 6) + '00') + 10000;
					continue;
				}
				if (day > 31) {
					//invalid day, change to new month, e.g. 20160532
					i = Number(i.toString().substring(0, 6) + '00') + 100;
					continue;
				}
				if (day > new Date(year, month, 0).getDate()) {
					//invalid date e.g. 20160230
					continue;
				}

				isToday = (i == Number(requestTime.substring(0, 8)));
				weekDay = getWeekDay(i.toString());
				if (!isToday && (weekDay == 0 || weekDay == 6)) {
					//skip Sun and Sat node
					continue;
				}

				dayBeforeList = i.toString();
				if (day1AfterAllot == "") {
					day1AfterAllot = i.toString();
				} else if (dayBetweenAllotList == "") {
					dayBetweenAllotList = i.toString();
				}
			}

			if (dayBetweenAllotList != "") {
				if (dayBetweenAllotList == dayBeforeList) {
					dayBetweenAllotList = "";
				} else if (dayBetweenAllotList < requestTime.substring(0, 8) && requestTime.substring(0, 8) < dayBeforeList) {
					dayBetweenAllotList = requestTime.substring(0, 8);
				}
			}

			//add important date
			var totalHtml, dayHtml, daySpan, dateCss, dateContentCss, dateAllText, dateText, weekCss, weekLabel, isDisplay;
			totalHtml = "";
			//get time line month
			if (ipo['subStartTime'] != null) {
				ipo['month'] = getMonth(ipo['subStartTime'], language);
				month = Number(ipo['subStartTime'].substring(4, 6)) - 1;
				startDay = Number(ipo['subStartTime'].substring(0, 8));
			} else {
				ipo['month'] = getMonth(ipo['offerStartTime'], language);
				month = Number(ipo['offerStartTime'].substring(4, 6)) - 1;
				startDay = Number(ipo['offerStartTime'].substring(0, 8));
			}
			endDay = Number(ipo['listingDate'].substring(0, 8));
			for (var i = startDay; i <= endDay; i++) {
				year = i.toString().substring(0, 4);
				month = i.toString().substring(4, 6);
				day = i.toString().substring(6, 8);
				if (month > 12) {
					//invalid month, change to new year. e.g. 20161301
					i = Number(i.toString().substring(0, 6) + '00') + 10000;
					continue;
				}
				if (day > 31) {
					//invalid day, change to new month, e.g. 20160532
					i = Number(i.toString().substring(0, 6) + '00') + 100;
					continue;
				}
				if (day > new Date(year, month, 0).getDate()) {
					//invalid date e.g. 20160230
					continue;
				}

				isToday = (i == Number(requestTime.substring(0, 8)));
				if (isToday) {
					weekCss = "cd-label-today";
					weekLabel = $translate.instant("ipoTimeline.today");
				} else {
					weekCss = "cd-label-default";
					weekLabel = getWeek(i.toString(), language);
				}

				dateAllText = "";
				if (ipo['subStartTime'] != null) {
					if (i == Number(ipo['subStartTime'].substring(0, 8))) {
						dateText = $translate.instant("ipoTimeline.subStart") + " " + getFormattedTime(ipo['subStartTime']);
						dateCss = "cd-cutoff";
						dateContentCss = "cd-cutoff";
						dateAllText = dateText;
					}
				}

				if (ipo['marginStatus'] == 'Y') {
					if (i == Number(ipo['marginStartTime'].substring(0, 8))) {
						dateText = $translate.instant("ipoTimeline.financingStart") + " " + getFormattedTime(ipo['marginStartTime']);
						if (dateAllText == "") {
							dateCss = "cd-cutoff";
							dateContentCss = "cd-cutoff";
							dateAllText = dateText;
						} else {
							dateAllText += '<br />' + dateText;
						}
					}

					if (i == Number(ipo['marginCloseTime'].substring(0, 8))) {
						dateText = $translate.instant("ipoTimeline.financingCutOff") + " " + getFormattedTime(ipo['marginCloseTime']);
						if (dateAllText == "") {
							dateCss = "cd-cutoff";
							dateContentCss = "cd-cutoff";
							dateAllText = dateText;
						} else {
							dateAllText += '<br />' + dateText;
						}
					}
				}

				if (ipo['subCloseTime'] != null) {
					if (i == Number(ipo['subCloseTime'].substring(0, 8))) {
						dateText = $translate.instant("ipoTimeline.subCutOff") + " " + getFormattedTime(ipo['subCloseTime']);
						if (dateAllText == "") {
							dateCss = "cd-cutoff";
							dateContentCss = "cd-cutoff";
							dateAllText = dateText;
						} else {
							dateAllText += '<br />' + dateText;
						}
					}
				}
				if (i == Number(ipo['priceFixDate'].substring(0, 8))) {
					dateText = $translate.instant("ipoTimeline.priceFix");
					if (dateAllText == "") {
						dateCss = "cd-allot";
						dateContentCss = "cd-allot";
						dateAllText = dateText;
					} else {
						dateAllText += '<br /><span class="cd-allot" style="padding: 3px">' + dateText + '</span>';
					}
				}
				if (i == Number(ipo['announceDate'].substring(0, 8))) {
					dateText = $translate.instant("ipoTimeline.allotment");
					if (dateAllText == "") {
						dateCss = "cd-allot";
						dateContentCss = "cd-allot";
						dateAllText = dateText;
					} else {
						dateAllText += '<br /><span class="cd-allot" style="padding: 3px">' + dateText + '</span>';
					}
				}
				if (i == Number(ipo['listingDate'].substring(0, 8))) {
					dateText = $translate.instant("ipoTimeline.listing");
					if (dateAllText == "") {
						dateCss = "cd-list";
						dateContentCss = "cd-list";
						dateAllText = dateText;
					} else {
						dateAllText += '<br /><span class="cd-list" style="padding: 3px">' + dateText + '</span>';
					}
				}
				daySpan = '<span>' + day + '</span>';

				if (dateAllText == "") {
					dateCss = "cd-default";
					dateContentCss = "cd-default-content";
					dateAllText = "&nbsp;";
					weekDay = getWeekDay(i.toString());
					if (!isToday) {
						if (weekDay == 0 || weekDay == 6) {
							continue; //skip normal weekend node
						}
					}

					//include next date after allotment, and previous date before listing date, but skip other dates between allotment date and listing date
					if (i > Number(ipo['announceDate'].substring(0, 8)) && i < Number(ipo['listingDate'].substring(0, 8))) {
						isDisplay = false;
						if (day1AfterAllot != "" && i == Number(day1AfterAllot)) {
							isDisplay = true;
						}
						if (dayBetweenAllotList != "" && i == Number(dayBetweenAllotList)) {
							isDisplay = true;
							daySpan = '<span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span>';
							if (!isToday) {
								weekLabel = "";
							}
						}
						if (dayBeforeList != "" && i == Number(dayBeforeList)) {
							isDisplay = true;
						}
						if (!isDisplay) {
							continue;
						}
					}
				}

				dayHtml = '<div class="cd-timeline-block">' +
					' <div class="cd-timeline-img ' + dateCss + '">' + daySpan + '</div>' +
					' <div class="cd-timeline-content ' + dateContentCss + '">' +
					' <p>' + dateAllText + '</p>' +
					' <span class="cd-date"><span class="' + weekCss + '">' + weekLabel + '</span></span>' +
					' </div>' +
					'</div>';
				totalHtml += dayHtml;
			}
			return totalHtml;
		}
	};
}]);

app.directive("notifyBox", ['applicationStatusService', function (applicationStatusService) {
	return {
		scope: {
			ipo: '=',
			getdatetimedir: "&",
			getallottedsharedir: "&",
		},
		templateUrl: 'ipoNotifyBox.html',
		link: function($scope, element, attrs) {
            $scope.isIPOAvailable = function(value){
                return applicationStatusService.isIPOAvailable(value);
            },
			$scope.isIPOAccepted = function(value){
                return applicationStatusService.isIPOAccepted(value);
            },
            $scope.isIPOProcessing = function(value){
                return applicationStatusService.isIPOProcessing(value);
            },
			$scope.isIPOCancelled = function(value){
                return applicationStatusService.isIPOCancelled(value);
            },			
            $scope.isIPOCutoff = function(value){
                return applicationStatusService.isIPOCutoff(value);
            },
			$scope.isIPOAllotted = function(value){
				return applicationStatusService.isIPOAllotted(value);
            },
			$scope.isIPORejected = function(value){
                return applicationStatusService.isIPORejected(value);
            },
			$scope.isIPONotAllowed = function(value){
                return applicationStatusService.isIPONotAllowed(value);
            },
			$scope.isIPONotApplied = function(value){
                return applicationStatusService.isIPONotApplied(value);
            }					
        }		
	};
}]);