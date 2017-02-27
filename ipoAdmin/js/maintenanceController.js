angular.module('ipoAdminApp.maintenanceController', [])

.controller('maintenanceCtrl', [ '$scope', '$rootScope', '$window', '$sce', '$http', '$translate', 'sharedProperties', 'redirectService', 'applicationStatusService', function($scope, $rootScope, $window, $sce, $http, $translate, sharedProperties, redirectService, applicationStatusService) {
	
		$scope.getAdminIPO = function() {
		$http({
			//method: 'GET',
			//url: 'adminIPOBook.json'			
			method: 'POST',
			url: sharedProperties.getBaseURL() + '/i/adminIPOBook',			
			data: {dateType : $scope.option,     
				   dayRange : $scope.day,
				   dateFrom : $scope.dateFrom,
				   dateTo : $scope.dateTo,
				   selfModify: $scope.myselfCheckbox}				  
		}).then(function successCallback(response) {
			if (response['data']['returnCode'] == SUCCESS) {
				$scope.convertToAdminIPOsList(response['data']['IPOs']);
				//get client data
				//if (sharedProperties.getClientId() != null) {
				//	$scope.getCurrentIPOClientData();
				//} 
			}
			else {
				$scope.displayError(response['data']['returnCode']);
			}
		}, function errorCallback(response) {
			$scope.displayDefaultError();
		});
	}
	
		$scope.convertToAdminIPOsList = function(adminIPOBook) {
		$scope.adminIPOs = [];		
		$scope.pendingCount = 0;
		$scope.rejectCount = 0;
		$scope.comingCount = 0;
		$scope.openingCount = 0;
		$scope.endedCount = 0;
		$scope.closedCount = 0;
		var index = 0;
		var ipoIds = [];
		angular.forEach(adminIPOBook, function(item) {
			var ipo = {};
			ipo['index'] = index++;
			ipo['ipoId'] = item['ipoId'];
			ipo['secId'] = item['secId'];
			ipo['scName'] = item['scName'];
			ipo['tcName'] = item['tcName'];
			ipo['enName'] = item['name'];
			ipo['offerPrice'] = item['ccy'] + " " + moneyFormatter(item['offerPriceFrom']) + " - " + moneyFormatter(item['offerPriceTo']);
			
			if(item['finalOfferPrice'] != null && item['finalOfferPrice'] != undefined && item['finalOfferPrice'] != "" ) {
				ipo['finalOfferPrice'] = item['ccy'] + " " + moneyFormatter(item['finalOfferPrice']);
			}
			
			ipo['marginStatus'] = item['marginStatus'];
								
			ipo['marginCutoff'] = item['marginCutoff'];					
			ipo['subStatus'] = item['subStatus'];
			ipo['subCutoff'] = item['subCutoff'];
			ipo['offerCutoff'] = item['offerCutoff'];
			
			//Time Formatting
			
			ipo['subStartTime'] = item['subStartTime'];
			ipo['subCloseTime'] = item['subCloseTime'];
			ipo['offerCloseTime'] = item['offerCloseTime'];				
			ipo['fmtSubCloseTime'] = $scope.formattingDate(item['subCloseTime']);
			ipo['fmtOfferCloseTime'] = $scope.formattingDate(item['offerCloseTime']);
			
			ipo['subSubPeriod'] = $scope.formattingDate(item['subStartTime']) + " - " +$scope.formattingDate(item['subCloseTime']);
			ipo['subSubPeriodEndTime'] = $scope.formattingDateTime(item['subCloseTime']);
			
			if (ipo['marginStatus'] == 'Y') {
				ipo['marginCloseTime'] = item['marginCloseTime'];
				ipo['finPeriod'] = $scope.formattingDate(item['marginStartTime']) + " - " +$scope.formattingDate(item['marginCloseTime']);
				ipo['finPeriodEndTime'] = $scope.formattingDateTime(item['marginCloseTime']);
			}
			
			ipo['offerCloseTimeInHour'] = $scope.formattingDateTime(item['offerCloseTime']);
										
			//Day Count			
																
			//last modify			
			ipo['lastModUserId'] = item['modifyUserId'];
			ipo['lastModTime'] = item['modifyTime'];
			ipo['fmtLastModDate'] = $scope.formattingDate(item['modifyTime']);
			ipo['fmtLastModTime'] = $scope.formattingDateTime(item['modifyTime']);
							
			//Status
			ipo['approveStatus'] = item['approveStatus'];
								
			if(ipo['approveStatus'] == 'A'){			
				if (item['status'] == 'D') {
					ipo['status'] = Deleted;
                    ipo['theme'] = Red;						
				}
				else if (item['status'] == 'P'){
					ipo['status'] = Postponed;
					ipo['theme'] = Grey;								
				}
				else if ($scope.isIPOClosed(ipo['subCloseTime'],ipo['offerCloseTime'],ipo['approveStatus'])){
					ipo['status'] = Closed;
					ipo['theme'] = Purple;
					ipo['IPOClosedDay'] = $scope.formatDayDifference($scope.dayDifference(getCurrentDateTime(),item['subCloseTime']));			
					ipo['dayUnit'] = ipo['IPOClosedDay'][1];
					ipo['IPOClosedDay'] = ipo['IPOClosedDay'][0];	
					$scope.closedCount ++;				
				}
				else if ($scope.isIPOComing(ipo['subStartTime'],ipo['approveStatus'])) {
					ipo['IPOComingDay'] = $scope.formatDayDifference($scope.dayDifference(item['subStartTime'], getCurrentDateTime()))							
					ipo['dayUnit'] = ipo['IPOComingDay'][1];
					ipo['IPOComingDay'] = ipo['IPOComingDay'][0];	
					ipo['status'] = Coming;
                    ipo['theme'] = Green;
					$scope.comingCount ++;					
				}
				else if ($scope.isIPOSubEndIn(ipo['subStartTime'],item['subCloseTime'],ipo['approveStatus'])) {
					ipo['IPORemainDay'] = $scope.formatDayDifference($scope.dayDifference(item['subCloseTime'],getCurrentDateTime()));		
					ipo['dayUnit'] = ipo['IPORemainDay'][1];
					ipo['IPORemainDay'] = ipo['IPORemainDay'][0];
					ipo['status'] = Opening;
					ipo['theme'] = Yellow;
					$scope.openingCount ++;
				}
				else if ($scope.isIPOSubEnd(ipo['subStartTime'],item['subCloseTime'],ipo['offerCloseTime'],ipo['approveStatus'])) {
					ipo['IPOEndedDay'] =  $scope.formatDayDifference($scope.dayDifference(getCurrentDateTime(),item['subCloseTime']));		
					ipo['dayUnit'] = ipo['IPOEndedDay'][1];
					ipo['IPOEndedDay'] = ipo['IPOEndedDay'][0];		
					ipo['status'] = Ended;
					ipo['theme'] = Orange;	
					$scope.endedCount ++;					
				}			
			}
			else if (ipo['approveStatus'] == 'P'){
				ipo['status'] = Pending;
				ipo['theme'] = Blue;
				$scope.pendingCount ++;				
			}
			else if (ipo['approveStatus'] == 'W'){
				ipo['status'] = Waiting;
				ipo['theme'] = Blue;	
			}	
			else if (ipo['approveStatus'] == 'R'){				
				ipo['status'] = Rejected;
				ipo['theme'] = Red;	
				$scope.rejectCount++;
			}		
			$scope.adminIPOs.push(ipo);
			ipoIds.push(item['ipoId']);
		})
		//sharedProperties.setCurrentIPOIds(ipoIds);
		$scope.adminIPOCount = $scope.adminIPOs.length;
	}
	
	$scope.displayError = function(errorCode) {
		if (errorCode) {
			alert($translate.instant('code.' + errorCode));
		}
		else {
			$scope.displayDefaultError();
		}		
	}
	
	$scope.displayDefaultError = function() {
		alert($translate.instant('code.-1'));
	}	
	//financing mode
	$scope.isFinancing= function(value) {
		//return value == MARGIN_ALLOWED;
		return value == "Y";
	}
	
	//ipo status
	$scope.ipoDescTheme = '';
	$scope.isIPOComing= function(start,approvalStatus) {	
		if (start > getCurrentDateTime() && approvalStatus == 'A'){
		$scope.ipoDescTheme = Green;
		return true;
		}
		else {
		return false;
		}
	}
	
	$scope.isIPOSubEndIn= function(start, end, approvalStatus) {
		if (start < getCurrentDateTime() && end > getCurrentDateTime() && approvalStatus == 'A'){
		$scope.ipoDescTheme = Yellow;
		return true;
		}
		else {
		return false;
		}
	}
	
	$scope.isIPOSubEnd = function(start, end ,offerEnd ,approvalStatus) {
		if (start < getCurrentDateTime() && end < getCurrentDateTime() && offerEnd > getCurrentDateTime() && approvalStatus == 'A'){
		$scope.ipoDescTheme = Orange;
		return true;
		}
		else {
		return false;
		}
	}
	
	$scope.isIPOClosed = function(subEnd, offerEnd ,approvalStatus) {
		if (offerEnd < getCurrentDateTime() && subEnd < getCurrentDateTime() && approvalStatus == 'A'){
		$scope.ipoDescTheme = Purple;
		return true;
		}
		else {
		return false;
		}
	}
	
	$scope.isNotDeletedOrClosed = function(status) {
		return status != Deleted && status != Postponed;
	}
	
	$scope.isApprovel = function(approvalStatus) {
		return approvalStatus == 'A';
	}
	
	//Status for filtering	
	$scope.isStatusWaiting= function(value) {
		return value == Waiting;
	}
	$scope.isStatusPending= function(value) {
		return value == Pending;
	}
	$scope.isStatusRejected= function(value) {
		return value == Rejected;
	}
	$scope.isStatusComing= function(value) {
		return value == Coming;
	}
	$scope.isStatusOpening= function(value) {
		return value == Opening;
	}
	$scope.isStatusEnded= function(value) {
		return value == Ended;
	}
	$scope.isStatusClosed= function(value) {
		return value == Closed;
	}
	
	$scope.isStatusDeleted= function(value) {
		return value == Deleted;
	}
	
	$scope.isStatusPostponed= function(value) {
		return value == Postponed;
	}
	
	//Date formatting
	
	$scope.formattingDate= function(value) {	
	  var yyyy = value.substring(0,4);
      var mm = value.substring(4,6);
      var dd = value.substring(6,8);
      return yyyy + "/" + mm + "/" + dd ; 
	}
	
	$scope.formattingDateTime= function(value) {
	  var hh = value.substring(8,10);
	  var mi = value.substring(10,12);
      return hh + ":" + mi; 
	}
	
	$scope.dayDifference = function(time1, time2) {
	  var yyyy1 = time1.substring(0,4);
      var mm1 = time1.substring(4,6);
      var dd1 = time1.substring(6,8);
	  
	  var yyyy2 = time2.substring(0,4);
      var mm2 = time2.substring(4,6);
      var dd2 = time2.substring(6,8);
	  
	  var date1 = new Date(mm1 + "/" + dd1 + "/" + yyyy1);
	  var date2 = new Date(mm2 + "/" + dd2 + "/" + yyyy2);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	  
      return diffDays; 
	}
	
	$scope.formatDayDifference = function(diffDays) {
		var result = [];
		if (diffDays <= 1) {		
		result.push(diffDays);
		result.push('day');
		}
		else if (diffDays > 1 && diffDays < 30) {
		result.push(diffDays);
		result.push('days');
		}
		else if (diffDays >= 30 && diffDays < 365 && Math.floor(diffDays/30) <= 1) {		
		result.push(Math.floor(diffDays/30));
		result.push('month');
		}
		else if (diffDays >= 30 && diffDays < 365 && Math.floor(diffDays/30) > 1) {
		result.push(Math.floor(diffDays/30));
		result.push('months');
		}
		else if (diffDays >= 365 && Math.floor(diffDays/365) <= 1) {
		result.push(Math.floor(diffDays/365));
		result.push('year');
		}
		else if (diffDays >= 365 &&  Math.floor(diffDays/365) > 1) {
		result.push(Math.floor(diffDays/365));
		result.push('years');
		}
		return result;
	}
	
	//offer price
	$scope.checkNull = function(value) {
	return (value != null && value != undefined && value != "");
	}
	
	$scope.usePrice = function(finalOfferPrice) {
		if($scope.checkNull(finalOfferPrice))
		return true;
		else {
		return false;
		}
	}
	
	//sort button
	$scope.sortType     = "lastModTime"; 
	$scope.sortReverse  = false; 
	
    $scope.sortBtnActive = function(value) {
		$scope.lastModTimeBtn = White;
		$scope.lastModByBtn = White;
		$scope.IPONameBtn = White;
		$scope.subStartBtn = White;
		$scope.subEndBtn = White;
		$scope.subCloseBtn = White;
		if (value == "lastModTimeBtn"){	
			$scope.lastModTimeBtn = solidBlue;
			$scope.sortType = 'lastModTime'; 
			$scope.sortReverse = !$scope.sortReverse;
		}
		else if (value == "lastModByBtn"){	
			$scope.lastModByBtn = solidBlue;
			$scope.sortType = 'lastModUserId'; 
			$scope.sortReverse = !$scope.sortReverse;
		}
		else if (value == "IPONameBtn"){	
			$scope.IPONameBtn = solidBlue;
			$scope.sortType = 'enName'; 
			$scope.sortReverse = !$scope.sortReverse;
		}
		else if (value == "subStartBtn"){	
			$scope.subStartBtn = solidBlue;
			$scope.sortType = 'subStartTime'; 
			$scope.sortReverse = !$scope.sortReverse;
		}
		else if (value == "subEndBtn"){	
			$scope.subEndBtn = solidBlue;
			$scope.sortType = 'subCloseTime'; 
			$scope.sortReverse = !$scope.sortReverse;
		}
		else if (value == "subCloseBtn"){	
			$scope.subCloseBtn = solidBlue;
			$scope.sortType = 'offerCloseTime'; 
			$scope.sortReverse = !$scope.sortReverse;
		}		
    };
		
		$scope.uncheckbox = function(){
		$("input:checkbox").attr('checked', false);
	};
		
	//status select button
	$scope.statusBtnActive = function(value) {
		$scope.greyBtn = "";
		$scope.blueBtn = "";
		$scope.redBtn = "";
		$scope.greenBtn = "";
		$scope.yellowBtn = "";
		$scope.orangeBtn = "";
		$scope.purpleBtn = "";
		$scope.uncheckbox();
		$scope.filterStatus = [];
		$scope.filterUserId = [];
		$scope.filterFinancingMode = '';
		$scope.filterNonFinMode = '';
		
		if (value == "greyBtn"){	
			$scope.greyBtn = "active";
			$scope.searchStatus = '';
		}
		else if (value == "blueBtn"){	
			$scope.blueBtn = "active";
			$scope.searchStatus = Pending;
		}
		else if (value == "redBtn"){	
			$scope.redBtn = "active";
			$scope.searchStatus = Rejected;
		}
		else if (value == "greenBtn"){	
			$scope.greenBtn = "active";
			$scope.searchStatus = Coming;
		}
		else if (value == "yellowBtn"){	
			$scope.yellowBtn = "active";
			$scope.searchStatus= Opening;
		}
		else if (value == "orangeBtn"){	
			$scope.orangeBtn = "active";
			$scope.searchStatus= Ended;
		}	
		else if (value == "purpleBtn"){	
			$scope.purpleBtn = "active";
			$scope.searchStatus= Closed;
		}		
    };
	
	
	//filter button
	$scope.filterFinancingMode = '';
	$scope.filterNonFinMode = '';
	
	$scope.showFinMode = function(adminIPO){		
		if ($scope.filterFinancingMode == "" && $scope.filterNonFinMode == "") {
			return true;
		}
		else {
		   return adminIPO.marginStatus === $scope.filterFinancingMode || 
				  adminIPO.marginStatus === $scope.filterNonFinMode;
			 }
    };	
	
	$scope.onClickFilterFinMode = function(marginStatus) {	
		if ($scope.filterFinancingMode == '' && marginStatus == 'Y') {
			$scope.filterFinancingMode = marginStatus;
		}
		else if ($scope.filterFinancingMode == 'Y' && marginStatus == 'Y') {
			$scope.filterFinancingMode = '';
		}
		else if ($scope.filterNonFinMode == '' && marginStatus == 'N') {
			$scope.filterNonFinMode = marginStatus;
		}
		else if ($scope.filterNonFinMode == 'N' && marginStatus == 'N') {
			$scope.filterNonFinMode = '';
		}
	}
	
	$scope.filterUserId = [];
	
	$scope.showUser = function(adminIPO){
		if ( $scope.filterUserId.length < 1 ) {
		return true;
		}
		else {
		
		var filter = false;
		for (var user in $scope.filterUserId) {	
				if(adminIPO.lastModUserId === $scope.filterUserId[user] ) {
				filter = true;
				}		   
		   }			   
		return filter;
		}
    };
		
	$scope.onClickFilterUser = function(userId) {	
        var existCheck = false;
		var newList = [];
	for (var user in $scope.filterUserId) {		
	
		
		if ($scope.filterUserId[user] == userId){	
		existCheck = true;
		}
		else{
		newList.push($scope.filterUserId[user]); 
		}
      }
		 if (existCheck == false) {	
			newList.push(userId); 
		 }
		 $scope.filterUserId = newList;		 
	}
	
	$scope.filterStatus = [];
	
	$scope.showStatus = function(adminIPO){
		if ( $scope.filterStatus.length < 1 ) {
		return true;
		}
		else {
		
		var filter = false;
		for (var state in $scope.filterStatus) {	
				if(adminIPO.status === $scope.filterStatus[state] ) {
				filter = true;
				}		   
		   }			   
		return filter;
		}
    };
		
	$scope.onClickFilterStatus = function(status) {	
        var existCheck = false;
		var newList = [];
	for (var state in $scope.filterStatus) {		
	
		
		if ($scope.filterStatus[state] == status){	
		existCheck = true;
		}
		else{
		newList.push($scope.filterStatus[state]); 
		}
      }
		 if (existCheck == false) {	
			newList.push(status); 
		 }
		 $scope.filterStatus = newList;		 
	}
	
	//date picker
	$scope.startDate = $scope.formattingDate(getCurrentDateTime());
	$scope.endDate =  moment().add(1, 'week'); 
		
	$scope.calendar = function() {
		$('input[name="dateRange"]').daterangepicker(
			{
				locale: {
				  format: 'YYYY/MM/DD'
				},	
				startDate: $scope.startDate,
				endDate: $scope.endDate
			},
		
		function(start, end, label) {  
			$scope.startDate = start.format('YYYY/MM/DD') 
			$scope.endDate = end.format('YYYY/MM/DD');					
});
			return true;
	}
	
	//option filter		
	$scope.showOptions = 'N';
	$scope.optionStyle = 'border-bottom: solid #E0E0E0;';
	
	$scope.onClickShowOptions = function() {
		if ($scope.showOptions == 'N') {
			$scope.showOptions = 'Y';
			$scope.optionStyle = 'border-bottom: solid white;';
		}
		else {
		$scope.showOptions = 'N';
		$scope.optionStyle = 'border-bottom: solid #E0E0E0;';
		}
	}
	
	
	$scope.numberOfDay = [];
	$scope.genNumberOfDay = function() {
		var i = 5 ;
		for (i; i <= 90; i = i +5) { 
			$scope.numberOfDay.push(i);
		}
	}
	
	$scope.option = 'Mod';
	$scope.day = '30';	
	$scope.dateFrom = '20170101';
	$scope.dateTo = '20170102';
	$scope.myselfCheckbox = 'N';
	
					
	$scope.descOption= 'Mod';
	$scope.descDay = 30;
	$scope.descDayFrom = '';
	$scope.descDayTo = '';
	$scope.descMyself = 'N';
	
	
	$scope.onclickOptionFilter = function(option,day) {			
		$scope.descOption= option;
		$scope.descDay = day;
		if ($scope.myselfCheckbox == 'Y') {
			$scope.descMyself = 'Y';
		}
		else {
			$scope.descMyself = 'N';
		}
		$scope.getAdminIPO();
	}
		
	$scope.onclickOptionRangeFilter = function(dayRange,options) {				
		var days = dayRange.split(' - ');						
		$scope.dateFrom = days[0].split('/');
		$scope.dateFrom = String($scope.dateFrom[0]) +	String($scope.dateFrom[1]) + String($scope.dateFrom[2]);
		$scope.dateTo = days[1].split('/');
		$scope.dateTo = String($scope.dateTo[0]) +	String($scope.dateTo[1]) + String($scope.dateTo[2]);
								
		$scope.descOption= options;
		$scope.descDayFrom = days[0];
		$scope.descDayTo = days[1];
		
		if ($scope.myselfCheckbox == 'Y') {
			$scope.descMyself = 'Y';
		}
		else {
			$scope.descMyself = 'N';
		}				
		$scope.getAdminIPO();
	}
			
	$scope.onclickMyselfBox = function() {
		if ($scope.myselfCheckbox == 'N') {
			$scope.myselfCheckbox = 'Y';
		}
		else {	
			$scope.myselfCheckbox = 'N';
		}
	}
	
	//top of the page
	$scope.topOfPage = function() {
        $('body').animate({
        scrollTop: "=0px"
		}, 0); 
      };
	  
	  //color
	   $scope.recordTheme = function(myTheme) {	  	
		var theme = {
				"width" : "100%",				
				"border-left" : " solid " + myTheme
			}
			return theme;		  
  }
  
  $scope.statusTheme = function(myTheme) {	  	
		var theme = {
				"width" : "33%",				
				"color" : myTheme
			}
			return theme;		  
  }
  
  $scope.getStatusTheme = function() {	  	
		var theme = {
				"background-color" : $scope.ipoDescTheme								
			}
			return theme;		  
  }
  
  $scope.windowSize = $(window).width();
  
  $scope.resizeWindow = function(size){
	if (size > 745) {
	$("#floatingFilter").css('display','inline');
	$("#floatingFilter").css('visibility','visible');		
		$("#floatingFilter").affix({
			offset: { 
				top: 195 
			}		
		});
	}
	if (size < 745) {
		$("#floatingFilter").css('display','none');
		$("#floatingFilter").css('visibility','hidden');
	}
    };
	
	 $scope.getResizeWindow = function(){
			$( window ).resize(function() {			
			$scope.windowSize = $(window).width();
			$scope.resizeWindow($scope.windowSize);		
		})
		
		}
		
	$scope.onClickNewIPO = function() {
		sharedProperties.setEditMode(true);
		sharedProperties.setCreateIPO(true);
	}
		
	$scope.onClickModifyIPO = function(ipoId) {
		//sharedProperties.setCheckerRole(true);
		if (sharedProperties.isCheckerRole()) {
			sharedProperties.setEditMode(true);
		}
		else {
			sharedProperties.setEditMode(false);
		}
		sharedProperties.setCurrentIPOId(ipoId);
		sharedProperties.setCreateIPO(false);
	}
	  	  
	$scope.isCheckerRole = function() {
		return sharedProperties.isCheckerRole();
	}
		  
	//init
	$scope.init = function() {
		$scope.sharedProperties = sharedProperties;
		$scope.applicationStatusService = applicationStatusService;		
		$scope.sharedProperties.removeCurrentIPOData();
		//if (getSessionStorage().getItem('agreed') != AGREED) {
		//	return redirectService.toDisclaimer();
		//}
		if (typeof(jsonFromClient) != "undefined") {
			sharedProperties.setBypassLoginData(jsonFromClient); 		
		}
		// TEMP ALTER MARKER / CHECKER HERE FOR TESTING
		$scope.sharedProperties.setCheckerRole(false);
		$scope.sortBtnActive('lastModTimeBtn');
		$scope.statusBtnActive('greyBtn');
		$scope.getAdminIPO();
		$scope.genNumberOfDay();	        
		$scope.getResizeWindow();
		$scope.resizeWindow($scope.windowSize);		
			
	}		
	$scope.init();
}])

.filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});

