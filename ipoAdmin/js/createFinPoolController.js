angular.module('ipoAdminApp.createFinPoolController', [])

.controller('createFinPoolCtrl', [ '$scope', '$rootScope', '$window', '$sce', '$http', '$translate', '$location', 'sharedProperties', 'redirectService', 'applicationStatusService', function($scope, $rootScope, $window, $sce, $http, $translate, $location, sharedProperties, redirectService, applicationStatusService) {
	
	console.log(sharedProperties.isCheckerRole());	
	//	$scope.machker = sharedProperties.isCheckerRole();//maker:false     checker:true			
	console.log(sharedProperties.isEditMode());	
	//	$scope.vemode = sharedProperties.isEditMode();// view:false     edit:true
	
	$scope.showbelow = false;//Check box Checked if IPO financing is allowed;Unchecked if IPO financing is not allowed.
	   
	$scope.newmodpool = false;//false:new pool true:mod pool
     
	/*datepicker start*/
	$("#startDate").daterangepicker({    	
		"singleDatePicker": true,
		"locale": {
			"format": "YYYY/MM/DD"			 
		},		
	});
	
	/*datepicker start*/
	$("#endDate").daterangepicker({    	
		"singleDatePicker": true,
		"locale": {
			"format": "YYYY/MM/DD"			   
		},		
	});
   
   /*Permissions*/
   $scope.showAccRej = function(){
   	return (sharedProperties.isCheckerRole() & sharedProperties.isEditMode());	
   } 
   
   $scope.showNewEdit = function(){
   	return (!sharedProperties.isCheckerRole()) & (!sharedProperties.isEditMode());
   } 
    
   $scope.showSSDPR = function() {
   	return (sharedProperties.isCheckerRole() ^ sharedProperties.isEditMode())&sharedProperties.isEditMode();
   }  //white space for input

   $scope.disableFields = function(){
   	return !((sharedProperties.isCheckerRole() ^ sharedProperties.isEditMode())&sharedProperties.isEditMode());
   }  

   /*Field verification*/ 	
   $scope.stockCodeFormat = function(value) {
   	$scope.StockCode = stockCodeFormat(value);		 
   	return stockCodeFormat(value);
   }
 
   $scope.onlyNumber = function(value,sName,event){
   	return onlyNumber(value,sName,event);
   }

   $scope.numberofchar = function(value,sName,event){
   	return numberofchar(value,sName,event);
   }

   $scope.digitsofchar = function(value,sName){
   	return digitsofchar(value,sName);
   }

   $scope.digitsofnum = function(value,sName){
   	return digitsofnum(value,sName);
   }

   $scope.digitlimt = function(sName){
   	return digitlimt(sName);
   }

   $scope.decimallimit = function(inte,deci,sName,id,event){
   	return decimallimit(inte,deci,sName,id,event);
   }

   $scope.zero =/^![0]{1,3}$/;
   
   /////////
   /*Pool Status*/
   $scope.poolStatus = false;
   $scope.onclickPoolStatus = function() {
   console.log($scope.poolStatus);
		$scope.poolStatus = !$scope.poolStatus; 
   }
   /*newPool*/
   $scope.showNewPool = function(){		
		//$scope.vemode = true;
		sharedProperties.setEditMode(true);
		
		$scope.showbelow = true;
		$scope.newmodpool = false;
		$scope.poolStatus= true; 
		$scope.idSelectedPool = "";
		$scope.init();
		//var poolDetail = [];		
		//$scope.loadFinPoolDetailData(poolDetail);	
		$scope.clearFinPoolDetailData();	
   }
   
   /*Edit*/
   $scope.editPool = function(){
		//$scope.vemode = true;		
		sharedProperties.setEditMode(true);
		$scope.init();
		$scope.showbelow = true;
		$scope.newmodpool = true;
		
   }
   
	$scope.loadFinPoolDetailData = function(poolDetail){		
			$scope.poolDetail = poolDetail;
			$scope.poolId = poolDetail.poolId;	
			$scope.poolName = poolDetail.poolName;	
			$scope.ccy = poolDetail.ccy;
			if (poolDetail.poolStatus == 'Y'){
				$scope.poolStatus = true;
			  }
			if (poolDetail.poolStatus == 'N'){
				$scope.poolStatus = false;
			  }    	
			$scope.startDate = poolDetail.startDate.substring(0,4)+'/'+poolDetail.startDate.substring(4,6)+'/'+poolDetail.startDate.substring(6,8);		
			$scope.endDate = poolDetail.endDate.substring(0,4)+'/'+poolDetail.endDate.substring(4,6)+'/'+poolDetail.endDate.substring(6,8);			
			$scope.totalAmount = poolDetail.totalValue;
			$scope.bankCode = poolDetail.bankRef;
			$scope.priority = poolDetail.priority;
			$scope.alertThreshold = poolDetail.alertThreshold;
			$scope.remarkforInternal = poolDetail.internalRemark;	
	}
	$scope.clearFinPoolDetailData = function(){		
			$scope.poolId = "";
			$scope.poolName = "";
			$scope.ccy = $scope.ccy;			
		    $scope.poolStatus = true;			
			$scope.startDate = "";	
			$scope.endDate = "";	
			$scope.totalAmount = "";
			$scope.bankCode = "";
			$scope.priority = "";
			$scope.alertThreshold = "";
			$scope.remarkforInternal = "";
	}
	
   
	/*back*/
	$scope.createFinPoolback = function(){     
		$location.path('/createIPO');    
	  } 

	/*Select Pool to view*/
	$scope.idSelectedPool = "";
    $scope.setSelected = function (idSelectedPool, status) {		
		if (status == 'Pending' && sharedProperties.isCheckerRole() == true) {
			//$scope.vemode = true;
			sharedProperties.setEditMode(true);			
		}
		else {
			//$scope.vemode = false;
			sharedProperties.setEditMode(false);			
		}
		$scope.showbelow = true;		
		$scope.newmodpool = true;	
		$scope.idSelectedPool = idSelectedPool;
		console.log($scope.idSelectedPool);
		//$scope.getAdminFinPoolDetail();	
		$scope.init();
  };
  
	/*Accept && Reject*/
      $scope.finPoolAccRej = function(action){	
	  console.log($scope.idSelectedPool);		  
			$http({
			  method: 'POST',			
			url:sharedProperties.getBaseURL() + '/i/finPoolApproval',
			data: {poolId : $scope.idSelectedPool,     
				   version : $scope.version,
				   approvalStatus: action}	
		  }).then(function successCallback(response) {
			console.log(response);
			if (response['data']['returnCode'] == SUCCESS) { 
			  //$scope.vemode = false;
				sharedProperties.setEditMode(false);
				//$scope.getAdminFinPoolDetail();		
			  $scope.init();						        
			}
			else {          
			}         
		  }, function errorCallback(response) {
			//$scope.displayDefaultError();
			console.log(response);
			console.log('Error -->' + response);
		  });
    }
  
	/*Submit, Save for CreateFinPool/ModFinPool*/
	$scope.createFinPoolsubmit = function(action){
		var strURL='';
		if ($scope.newmodpool == true) {
			strURL='/i/modifyFinPool';
		}
		else {
			strURL='/i/createFinPool';
		}	  						
		$http({
			method: 'POST',			
			url:sharedProperties.getBaseURL() + strURL,
			data: getCreateFinPoolData(action) 			
		}).then(function successCallback(response) {
			console.log(response);
			if (response['data']['returnCode'] == SUCCESS) {    
											
				//$scope.vemode = false;
				sharedProperties.setEditMode(false);				
				$scope.idSelectedPool = response['data']['finPoolId'];
				$scope.init();
				//$scope.getAdminFinPoolDetail();		
		}
		else {          
		}         
		}, function errorCallback(response) {
		//$scope.displayDefaultError();
			console.log(response);
			console.log('Error -->' + response);
		});
	}
	
	$scope.totalAmount = '';
	function getCreateFinPoolData(submitType) { 
		$scope.createIpoData ={};
		$scope.createIpoData.ipoId = $scope.ipoId||"";
		$scope.createIpoData.poolId = $scope.idSelectedPool||"";
		$scope.createIpoData.poolName = $scope.poolName||"";
		$scope.createIpoData.ccy = $scope.ccy||"";		
		if($scope.poolStatus==true){
			$scope.createIpoData.poolStatus = 'Y';
		}
		if($scope.poolStatus==false){
			$scope.createIpoData.poolStatus = 'N';
		}    		
		$scope.createIpoData.startDate = $scope.startDate.substring(0,4)+$scope.startDate.substring(5,7)+$scope.startDate.substring(8)||"";
		$scope.createIpoData.endDate = $scope.endDate.substring(0,4)+$scope.endDate.substring(5,7)+$scope.endDate.substring(8)||"";				
		$scope.createIpoData.version = $scope.version||"";
		$scope.createIpoData.totalValue = $scope.totalAmount||"";
		$scope.createIpoData.bankRef = $scope.bankCode||"";
		$scope.createIpoData.priority = $scope.priority||"";
		$scope.createIpoData.alertThreshold = $scope.alertThreshold||"";
		$scope.createIpoData.internalRemark = $scope.remarkforInternal||"";				  		  
		$scope.createIpoData.submitType=submitType;
		$scope.createIpoData.submit="Submit";		  
		console.log($scope.createIpoData);
		return $scope.createIpoData;
	}	 
	
	/*Delete*/
	$scope.deleteFinPool = function(){			  						
		$http({
			method: 'POST',			
			url:sharedProperties.getBaseURL() + '/i/deleteFinPool',
			data: {poolId : $scope.idSelectedPool,     
				   version : $scope.version} 			
		}).then(function successCallback(response) {
			console.log(response);
			if (response['data']['returnCode'] == SUCCESS) {   										
				//$scope.vemode = false;
				sharedProperties.setEditMode(false);
				$scope.idSelectedPool = response['data']['finPoolId'];
				//$scope.getAdminFinPoolDetail();	
				$scope.init();	
		}
		else {          
		}         
		}, function errorCallback(response) {
		//$scope.displayDefaultError();
			console.log(response);
			console.log('Error -->' + response);
		});
	}  
	
	/*new/mod fin pool header*/
	$scope.modHeader = function() {
		return $scope.newmodpool & sharedProperties.isEditMode();	
	}
   /////////
  
	// Pie Chart Properties:	
	$scope.getDonutChart = function() {		
		var BORDERWIDTH_CHART_1 = 0;
		var BORDER_COLOR = '#FFFFFF';
		var OFFSET_ANGLE_CHART_2 = BORDERWIDTH_CHART_1/4;

		// Code starts here:
		var options = {
				chart: {
					renderTo: 'donutChart',           
				},
				credits: {
						 enabled: false
			   },      
				title: {
					text: '<span style="font-size:35px;">'+ $scope.overallTotalUsage + '</span><br><span>&nbsp;&nbsp;used<span>',
					style: {"color": "#A9A9A9", "fontFamily":"Consolas", "font-size":"15px"},
					verticalAlign: 'middle',
					y: -20,
					useHTML: true,
				},
				subtitle: {
							text: '<span style="text-align:center">&nbsp;Total</span><br>HKD ' + $scope.formatedOverallTotalInChart ,
					style: {"color": "#49A0D3", "fontFamily":"Consolas", "font-size":"15px"},
					verticalAlign: 'middle',
					y: 45,   
					useHTML: true,
							},
				tooltip: {
					formatter: function() {
						var s;
						if (this.point.name == 'Slice') { // the pie chart
							return false;
						} else {
							s = ''+
								this.point.name;
						}
						return s;
					}
				},
				plotOptions: {
					series: {
						cursor: 'pointer',
						animation: {
							duration: 0
						},
						point: {
								events: {
									click: function () { 									
									$scope.setSelected(this.x, this.z);
									}
								}
							}
						}
				},
				series: [{
					type: 'pie',
					name: 'background',
					data: $scope.outerRing,
					enableMouseTracking: false,
					borderColor: BORDER_COLOR,
					borderWidth: BORDERWIDTH_CHART_1,
					innerSize: '70%',
					size: '100%',
					colors: $scope.bgColors,
					dataLabels: false,
					center: [125, 125],
				}]
		};
				var begin = 0;
				var end   = 0;
				var totalLength = 0;
				var arrayLength = $scope.innerRing.length;

		for (var i = 0; i < arrayLength; i++) {
			var perc  = $scope.innerRing[i];	   
			var color = [$scope.colors[i]];
			var label = $scope.categories[i];
			var poolId = $scope.poolId[i];
			var status = $scope.status[i];
			var value = perc*100;
			if (i == 0){
			begin = 0;
			end = ($scope.outerRing[i]/100)*360*($scope.innerRing[i]);
			totalLength = totalLength + ($scope.outerRing[i]/100)*360;
			}
			else {
			begin = totalLength;
			end   = totalLength + ($scope.outerRing[i]/100)*360*($scope.innerRing[i]);
			totalLength = totalLength + ($scope.outerRing[i]/100)*360;
			}
				
			options.series.push({
					type: 'pie',
					name: 'foreground',
					cumulative: 1, 
					data: [{
						name: label,
						y: value,
						x: poolId,
						z: status}],
					borderColor: 'white',
					borderWidth: 0,
					innerSize: '87%',
					size: '80%',
					colors: color,
					dataLabels: false,
					center: [125, 125],
					startAngle: begin,
					endAngle: end,}
			);
		}

	// and create the chart
	$(document).ready(function() {
		var chart = new Highcharts.Chart(options);
	});
}	
	//get finPoolBook
	$scope.getAdminFinPoolBook = function() {	
		console.log(sharedProperties.getCurrentIPOId());		
			$http({
				//method: 'GET',
				//url: 'adminFinPoolBook2.json'			
				method: 'POST',
				url: sharedProperties.getBaseURL() + '/i/adminFinPoolBook',			
				data: {ipoId : sharedProperties.getCurrentIPOId()}				  
			}).then(function successCallback(response) {
				if (response['data']['returnCode'] == SUCCESS) {
					$scope.convertToAdminFinPoolList(response['data']['currentFinPools']);
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
		
		$scope.convertToAdminFinPoolList = function(adminFinPoolBook) {	
			$scope.adminFinPools = [];
			$scope.overallTotal = 0;	
			$scope.overallTotalUsedValue = 0;
			$scope.formatedOverallTotalInChart = '';
			$scope.formatedOverallTotalInTable = '';	
			//for pie chart
			$scope.outerRing = [];
			$scope.innerRing = [];
			$scope.categories = [];
			$scope.bgColors = ['#FAAAAA', '#FADB6B', '#ACD491', '#A4C2E6', '#f9b8f9', '#FF8C00',  '#c5fd9b', '#9370DB', '#ccfffc', '#CD853F'];
			$scope.colors = ['#F34448', '#E87C3B', '#598439', '#4371B4', '#EB13EB', '#FF6347', '#68EB05', '#6A5ACD',  '#1FFFF0' , '#8B4513'];
			$scope.poolId = [];
			$scope.status = [];
			$scope.overallTotalUsage = '';
			
			var poolIds = [];
			//show when empty finPool
			if (adminFinPoolBook.length == 0) {
				$scope.outerRing.push(100);	
				$scope.innerRing.push(0);
				$scope.bgColors = ['#DCDCDC'];	
				$scope.colors = ['#DCDCDC'];
				$scope.overallTotalUsage = '---%';
				$scope.formatedOverallTotalInChart = '---';
				$scope.formatedOverallTotalInTable = '0';
				
				var finPool = {};
				finPool['poolName'] = '---';
				finPool['ccy'] = '---';
				finPool['totalValue'] = '---';
				finPool['overallPercentage'] = '---';
				finPool['showUsage'] = '---';	
				$scope.adminFinPools.push(finPool);
				}
				// show when have record
				else {		
						angular.forEach(adminFinPoolBook, function(item) {
						$scope.overallTotal	= $scope.overallTotal + item['totalValue'];	
						$scope.overallTotalUsedValue = $scope.overallTotalUsedValue + item['usedValue'];			
						})
						$scope.formatedOverallTotalInChart = formatAmount($scope.overallTotal);
						$scope.formatedOverallTotalInTable = formatAmount($scope.overallTotal);
						$scope.overallTotalUsage = formatNumber("" + ($scope.overallTotalUsedValue/$scope.overallTotal*100), 0) + "%";		
						angular.forEach(adminFinPoolBook, function(item) {
							var finPool = {};							
							finPool['poolId'] = item['poolId'];
							finPool['poolName'] = item['poolName'];
							finPool['ipoId'] = item['ipoId'];
							finPool['ccy'] = item['ccy'];
							finPool['status'] = item['status'];														
							finPool['poolStatus'] = item['poolStatus'];
							finPool['version'] = item['version'];						
							finPool['totalValue'] = formatAmount(item['totalValue']);
							finPool['usedValue'] = item['usedValue'];														
							finPool['alertThreshold'] = item['alertThreshold'];
														
							//status
							//if (item['status'] == 'A' || item['status'] == 'M') {
								if (item['approveStatus'] == 'W') {
									finPool['showStatus'] = 'Draft';
								}
								if (item['approveStatus'] == 'A') {
									finPool['showStatus'] = 'Approved'
								}
								if (item['approveStatus'] == 'P') {
									finPool['showStatus'] = 'Pending';
								}
								if (item['approveStatus'] == 'R') {
									finPool['showStatus'] = 'Rejected';
								}
							
							//}
													
							finPool['showAlertThreshold'] = item['alertThreshold'] *100;				
							finPool['overallPercentage'] = formatNumber("" + (item['totalValue']/$scope.overallTotal*100), 1 ) + "%";	
							finPool['showUsage'] = formatNumber("" + (item['usedValue']/item['totalValue']*100), 1) + "%";	
							finPool['usage'] = item['usedValue']/item['totalValue'];
							//highChart value			
							$scope.outerRing.push(item['totalValue']/$scope.overallTotal*100);	
							$scope.innerRing.push(item['usedValue']/item['totalValue']);
							$scope.categories.push(item['poolName']);
							$scope.poolId.push(finPool['poolId']);
							$scope.status.push(finPool['showStatus']);
																			
							$scope.adminFinPools.push(finPool);
							poolIds.push(item['poolId']);
						})	
					}		
			$scope.adminFinPoolCount = $scope.adminFinPools.length;		
			$scope.getDonutChart();
		}
	
	$scope.isAlert = function(usage, alert) {			
		return usage > alert;				
	}
/*	$scope.isApproved = function(status) {			
		return status = "";				
	}
	$scope.isPending = function(status) {			
		return status = "";				
	}
	$scope.isDisable = function(status) {			
		return status = "";				
	}
	$scope.isDeleted = function(status) {			
		return status = "";				
	}
	$scope.isRejected = function(status) {			
		return status = "";				
	}*/

	
//get finPool Detail
	$scope.getAdminFinPoolDetail = function() {
		console.log($scope.idSelectedPool);			
		$http({
			//method: 'GET',
			//url: 'adminIPODetail.json'			
			method: 'POST',
			url: sharedProperties.getBaseURL() + '/i/adminFinPoolDetail',			
			data: {finPoolId : $scope.idSelectedPool}				  
		}).then(function successCallback(response) {
			if (response['data']['returnCode'] == SUCCESS) {
			    $scope.loadFinPoolDetailData(response['data']['currentFinPools'][0]);
				//$scope.convertToAdminIPODetail(response['data']['IPOs']);
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
	
	//get IPO Detail
	$scope.getAdminIPODetail = function() {
		console.log(sharedProperties.getCurrentIPOId());			
		$http({
			//method: 'GET',
			//url: 'adminIPODetail.json'			
			method: 'POST',
			url: sharedProperties.getBaseURL() + '/i/adminIPODetail',			
			data: {ipoIds : sharedProperties.getCurrentIPOId()}				  
		}).then(function successCallback(response) {
			if (response['data']['returnCode'] == SUCCESS) {
				$scope.convertToAdminIPODetail(response['data']['IPOs']);
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
		
	$scope.convertToAdminIPODetail = function(adminIPODetail) {	
		$scope.adminIPODetail= {};	
		$scope.ipoId = "";
		$scope.ccy = "";
		$scope.version = "";		
		angular.forEach(adminIPODetail, function(item) {
			var ipo = {};			
			ipo['ipoId'] = item['ipoId'];	
			$scope.ipoId = item['ipoId'];			
			ipo['secId'] = item['secId'];
			ipo['ccy'] = item['ccy'];
			$scope.ccy = item['ccy'];
			ipo['version'] = item['version'];
			$scope.version = item['version'];			
			ipo['scName'] = item['scName'];
			ipo['tcName'] = item['tcName'];
			ipo['enName'] = item['name'];
			ipo['modifyUserId'] = item['modifyUserId'];
			ipo['modifyTime'] = item['modifyTime'];
			ipo['fmtLastModDate'] = $scope.formattingDate(item['modifyTime']);
			ipo['fmtLastModTime'] = $scope.formattingDateTime(item['modifyTime']);
			//ipo['approveUserId'] = item['approveUserId'];
			//ipo['approveTime'] = item['approveTime'];
			//status
			ipo['approveStatus'] = item['approveStatus'];	
			
			if(item['approveStatus'] == 'A'){			
				if (item['status'] == 'D') {
					ipo['status'] = Deleted;
                    ipo['theme'] = Red;						
				}
				else if (item['status'] == 'P'){
					ipo['status'] = Postponed;
					ipo['theme'] = Grey;								
				}
				else if ($scope.isIPOClosed(item['subCloseTime'],item['offerCloseTime'],item['approveStatus'])){
					ipo['status'] = Closed;
					ipo['theme'] = Purple;								
				}
				else if ($scope.isIPOComing(item['subStartTime'],item['approveStatus'])) {					
					ipo['status'] = Coming;
                    ipo['theme'] = Green;								
				}
				else if ($scope.isIPOSubEndIn(item['subStartTime'],item['subCloseTime'],item['approveStatus'])) {					
					ipo['status'] = Opening;
					ipo['theme'] = Yellow;					
				}
				else if ($scope.isIPOSubEnd(item['subStartTime'],item['subCloseTime'],item['offerCloseTime'],item['approveStatus'])) {						
					ipo['status'] = Ended;
					ipo['theme'] = Orange;									
				}			
			}
			else if (item['approveStatus'] == 'P'){
				ipo['status'] = Pending;
				ipo['theme'] = Blue;								
			}
			else if (item['approveStatus'] == 'W'){
				ipo['status'] = Waiting;
				ipo['theme'] = Blue;	
			}	
			else if (item['approveStatus'] == 'R'){				
				ipo['status'] = Rejected;
				ipo['theme'] = Red;					
			}						
			$scope.adminIPODetail = ipo;			
		})		
	}
	
	showSSDPR = function() {
		
	}
	
	//IPO Status
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
	
			
	$scope.init = function() {
		$scope.sharedProperties = sharedProperties;
		$scope.applicationStatusService = applicationStatusService;		
		
		//if (getSessionStorage().getItem('agreed') != AGREED) {
		//	return redirectService.toDisclaimer();	    		
		$scope.getAdminFinPoolBook();	
		$scope.getAdminIPODetail();	
		$scope.getAdminFinPoolDetail();	
		$scope.onclickPoolStatus();			
	}		
	$scope.init();
}]);

