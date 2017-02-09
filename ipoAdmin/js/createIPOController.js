angular.module('ipoAdminApp.createIPOController', [])

.controller('createIPOCtrl', [ '$scope', '$rootScope', '$sce', '$http', '$interval', '$translate','$location', 'sharedProperties', 'redirectService', 'applicationStatusService', 'timelineService', function($scope, $rootScope, $sce, $http, $interval, $translate,$location, sharedProperties, redirectService, applicationStatusService, timelineService) {

	$scope.getCurrentDate = function(value){
		return getCurrentDate().substring(0, 4) +"/"+ getCurrentDate().substring(4, 6) +"/"+ getCurrentDate().substring(6);
	}

	$scope.getCurrentDateTime = function(value){
		return getCurrentDateTime(value).substring(8,10) +":"+ getCurrentDateTime().substring(10,12);
	}	

	//$scope.theTime = new Date().toLocaleTimeString();

	$interval(function () {
		//$scope.theTime = new Date().toLocaleTimeString();
    $scope.theTime = $scope.getCurrentDateTime();
	}, 1000);    

	/*datepicker start*/
	$("#OnlineIPOStartDate").daterangepicker({    	
		"singleDatePicker": true,
		"locale": {
			"format": "YYYY/MM/DD",
			"applyLabel": "Apply",
			"cancelLabel": "Cancel"       
		},
		"autoUpdateInput": true,
		"autoApply": true    


	});

	$("#OnlineIPOStartTime").daterangepicker({
		"singleDatePicker": true,
		"timePicker": true,
		"timePicker24Hour": true,
		"locale": {
			"format": "HH:mm"	        
		}      
	});

	$("#OnlineIPOEndDate").daterangepicker({    	
		"singleDatePicker": true,
		"locale": {
			"format": "YYYY/MM/DD"        
		}
	});

	$("#OnlineIPOEndTime").daterangepicker({
		"singleDatePicker": true,
		"timePicker": true,
		"timePicker24Hour": true,
		"locale": {
			"format": "HH:mm"	        
		}      
	});

	$("#IPOClosingDate").daterangepicker({    	
		"singleDatePicker": true,
		"locale": {
			"format": "YYYY/MM/DD"        
		}
	});

	$("#IPOClosingTime").daterangepicker({
		"singleDatePicker": true,
		"timePicker": true,
		"timePicker24Hour": true,
		"locale": {
			"format": "HH:mm"	        
		}      
	});

	$("#PriceFixingDate").daterangepicker({    	
		"singleDatePicker": true,
		"locale": {
			"format": "YYYY/MM/DD"        
		}
	});

	$("#ResultAnnouncementDate").daterangepicker({    	
		"singleDatePicker": true,
		"locale": {
			"format": "YYYY/MM/DD"        
		}
	});

	$("#DispatchofSharesandRefundDate").daterangepicker({    	
		"singleDatePicker": true,
		"locale": {
			"format": "YYYY/MM/DD"        
		}
	});

	$("#ListingDate").daterangepicker({    	
		"singleDatePicker": true,
		"locale": {
			"format": "YYYY/MM/DD"        
		}
	});

	$("#FinancingStartDate").daterangepicker({    	
		"singleDatePicker": true,
		"locale": {
			"format": "YYYY/MM/DD"        
		}
	});

	$("#FinancingStartTime").daterangepicker({
		"singleDatePicker": true,
		"timePicker": true,
		"timePicker24Hour": true,
		"locale": {
			"format": "HH:mm"	        
		}      
	});

	$("#FinancingEndDate").daterangepicker({    	
		"singleDatePicker": true,
		"locale": {
			"format": "YYYY/MM/DD"        
		}
	});

	$("#FinancingEndTime").daterangepicker({
		"singleDatePicker": true,
		"timePicker": true,
		"timePicker24Hour": true,
		"locale": {
			"format": "HH:mm"	        
		}      
	});

  $("#ApplicationPeriodStartDate").daterangepicker({      
    "singleDatePicker": true,
    "locale": {
      "format": "YYYY/MM/DD"        
    }
  });

  $("#ApplicationPeriodEndDate").daterangepicker({      
    "singleDatePicker": true,
    "locale": {
      "format": "YYYY/MM/DD"        
    }
  });
	/*datepicker end*/

	/*Access Control*/    
    $scope.machker = false;//maker:false     checker:true

    $scope.vemode = false;// view:false     edit:true

   $scope.showbelow = true;//Check box Checked if IPO financing is allowed;Unchecked if IPO financing is not allowed.
  
  $scope.createIPOgetSysSetting = function(){      
      $http({
        method: 'POST',
        url:'/i/getSysSetting',
        //url:sharedProperties.getBaseURL() + '/i/getSysSetting',        
      }).then(function successCallback(response) {
          console.log(response);
          if (response['data']['returnCode'] == SUCCESS) {
          //data.currencyMaster
          $scope.convertToCreateIPOList(response['data']);                   
          }
          else {          
          }
      }, function errorCallback(response) {
        //$scope.displayDefaultError();
        console.log('Error -->' + response);
      });
    }

    $scope.StockCurrency="";
    $scope.CurrencyofHandingFee=""
    $scope.StockCurrency = {model: "", getStockCurrency:[]};
    $scope.CurrencyofHandingFee ={model: "", getCurrencyofHandingFee:[]};
    $scope.convertToCreateIPOList = function(sysSetting){
      var tempData = sysSetting['currencyMaster'];
      console.log(tempData);
      $scope.IPOCode ='IPO20160513000000001';//SS      
      angular.forEach(tempData, function(item) {
        $scope.StockCurrency.getStockCurrency.push(item.currency);
        $scope.CurrencyofHandingFee.getCurrencyofHandingFee.push(item.currency);
      })      
      $scope.EnglishStockName ='GetServer';//SS.data.systemParameter
      var tempDataY = sysSetting['systemParameter'];
      $scope.requireHoldFundCash=tempDataY[4]['value'];
      $scope.requireHoldFundMargin=tempDataY[5]['value'];
      $scope.allowCancelCash=tempDataY[6]['value'];
      $scope.allowCancelMargin=tempDataY[7]['value'];
    }

    

    $scope.createIPOtest = function(){      
      $http({
        method: 'GET',
        url:'adminIPOBook.json',
        //sharedProperties.getBaseURL() + '/i/createIPO',        
      }).then(function successCallback(response) {
          console.log(response);
      }, function errorCallback(response) {
        //$scope.displayDefaultError();
        console.log('Error -->' + response);
      });
      
      $http({
        method: 'GET',
        url:'sysSetting.json',
        //sharedProperties.getBaseURL() + '/i/createIPO',        
      }).then(function successCallback(response) {
          console.log(response);
          if (response['data']['returnCode'] == SUCCESS) {
          $scope.convertToCreateIPOList(response['data']);
            //test                   
          }
          else {          
          }
      }, function errorCallback(response) {
        //$scope.displayDefaultError();
        console.log('Error -->' + response);
      });
    }

  /*Accept*/
  $scope.createIPOaccept = function(){     
     $http({
        method: 'POST',
        url:'/i/xxxxxx',
        //sharedProperties.getBaseURL() + '/i/createIPO',
        data:"test"        
      }).then(function successCallback(response) {
        console.log('success -->' +response);
          alert("success");
      }, function errorCallback(response) {
        //$scope.displayDefaultError();
        console.log('Error -->' + response);
      });   
  }
  /*Reject*/
  $scope.createIPOreject = function(){     
     $http({
        method: 'POST',
        url:'/i/rejectIPOReq',
        //sharedProperties.getBaseURL() + '/i/createIPO',
        data:"test"        
      }).then(function successCallback(response) {
        console.log('success -->' +response);
          alert("success");
      }, function errorCallback(response) {
        //$scope.displayDefaultError();
        console.log('Error -->' + response);
      });   
  }
  /*Edit*/
  $scope.createIPOedit = function(){     
    $scope.machker = false;
    $scope.vemode = true;    
  }
  
  /*Back*/
  $scope.createIPOback = function(){     
    $location.path('/maintenance');    
  }

  /*Delete*/
  $scope.createIPOdelete = function(){     
     $http({
        method: 'POST',
        url:'/i/deleteIPO',
        //sharedProperties.getBaseURL() + '/i/createIPO',
        data:"test"        
      }).then(function successCallback(response) {
        console.log('success -->' +response);
          alert("success");
      }, function errorCallback(response) {
        //$scope.displayDefaultError();
        console.log('Error -->' + response);
      });   
  }

  /*Postpone*/
  $scope.createIPOpostpone = function(){     
     $http({
        method: 'POST',
        url:'/i/xxxxxx',
        //sharedProperties.getBaseURL() + '/i/createIPO',
        data:"test"        
      }).then(function successCallback(response) {
        console.log('success -->' +response);
          alert("success");
      }, function errorCallback(response) {
        //$scope.displayDefaultError();
        console.log('Error -->' + response);
      });   
  }

   /*Remuse*/
  $scope.createIPOresume = function(){     
     $http({
        method: 'POST',
        url:'/i/xxxxxx',
        //sharedProperties.getBaseURL() + '/i/createIPO',
        data:"test"        
      }).then(function successCallback(response) {
        console.log('success -->' +response);
          alert("success");
      }, function errorCallback(response) {
        //$scope.displayDefaultError();
        console.log('Error -->' + response);
      });   
  }

   
   /*Permissions*/
   $scope.showAccRej = function(value,val){
   	return showAccRej(value,val);
   }  

   $scope.showBack = function(value,val){
   	return showBack(value,val);
   }  

   $scope.showEdit = function(value,val){
   	return showEdit(value,val);
   }

   $scope.showSSDPR = function(value,val){
   	return showSSDPR(value,val);
   }  

   $scope.disableFields = function(value,val){
   	return disableFields(value,val);
   }  



   /*Field verification*/ 	
   $scope.stockCodeFormat = function(value) {
   	$scope.StockCode = stockCodeFormat(value);		 
   	return stockCodeFormat(value);
   }

   /*$scope.IPOCode = "IPO20160513000000001";*/

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

   //$scope.zero =/^![0]{1,3}$/;



   /*Quantity Amount Table  Start*/
   function quantityAmountTableAdd(){	
   	var methods=$scope.CalculationMethod;
   	var _temp = $scope.tempObj, _tempArr, _row,_commissionRate, _levyRate, _tradingFeeRate,_icLevyRate, _price,
   	_commissionRate =$scope.CommissionRate,
   	_levyRate = $scope.LevyRate,
   	_tradingFeeRate = $scope.TradingFeeRate ,
   	_icLevyRate =$scope.InvestorCompensationLevyRate ,
   	_price = $scope.OfferPriceRangeEnd;		
   	if(methods == "RLSUA" ){		
   		for(var _range in _temp){
   			_tempArr = _temp[_range];
   			for(var _recored in _tempArr){
   				_row = _tempArr[_recored];		        
   				_row.amt = ((_price * _row.qty)*(1 + _commissionRate/100 + _levyRate/100 + _icLevyRate/100 + _tradingFeeRate/100)).toFixed(2);        
   			}
   		}
   		return;			
   	}else if(methods == ("RBIC" )){		
   		for(var _range in _temp){
   			_tempArr = _temp[_range];
   			for(var _recored in _tempArr){
   				_row = _tempArr[_recored];		        
   				_row.amt = (parseFloat((_price * _row.qty).toFixed(2))
   					+ parseFloat(((_price * _row.qty)*_commissionRate/100).toFixed(2))
   					+ parseFloat(((_price * _row.qty)*_levyRate/100).toFixed(2))
   					+ parseFloat(((_price * _row.qty)*_icLevyRate/100).toFixed(2))
   					+ parseFloat(((_price * _row.qty)*_tradingFeeRate/100).toFixed(2))).toFixed(2);       
   			}
   		}
   		return ;
   	}
   	else if(methods == ("BOUCARLSUA" )){		
   		for(var _range in _temp){
   			_tempArr = _temp[_range];
   			for(var _recored in _tempArr){
   				_row = _tempArr[_recored];		        
   				_row.amt = (_row.qty/1000 * ((_price *1000)*(1 + _commissionRate/100 + _levyRate/100 + _icLevyRate/100 + _tradingFeeRate/100)).toFixed(2)).toFixed(2);         
   			}
   		}
   		return;
   	}
   	else if(methods == ("BOUCARBIC" )){		
   		for(var _range in _temp){
   			_tempArr = _temp[_range];
   			for(var _recored in _tempArr){
   				_row = _tempArr[_recored];		        
   				_row.amt = (_row.qty/1000 * (parseFloat((_price * 1000).toFixed(2))
   					+ parseFloat(((_price * 1000)*_commissionRate/100).toFixed(2))
   					+ parseFloat(((_price * 1000)*_levyRate/100).toFixed(2))
   					+ parseFloat(((_price * 1000)*_icLevyRate/100).toFixed(2))
   					+ parseFloat(((_price * 1000)*_tradingFeeRate/100).toFixed(2))).toFixed(2)).toFixed(2);
   			}
   		}
   		return ;
   	}
   }

   $scope.quantityAmountTable = [];
   $scope.tempObj = {};		
   $scope.quantityAmountTableAdd = function() {  
   	quantityAmountTableAdd();    	
   }

   /*add Range*/
   $scope.addQuantityAmountTableRange =function(){
   	var newTable = addQuantityAmountTableRange();
   	var _key = newTable[0].key;    	
   	$scope.tempObj[_key] = newTable;    	
    	//merge
    	var totalData = [];
    	for(var _key in $scope.tempObj){
    		var temp = $scope.tempObj[_key];
    		temp.forEach(function(entry){
    			totalData[totalData.length] = entry;
	    		//totalData.push(entry);
	    	}
	    	);    
    	}
    	$scope.quantityAmountTable = totalData;
      quantityAmountTableAdd();
    }

    $scope.removeqatableAll = function(value) {    	
    	$scope.quantityAmountTable = [];
    }
    $scope.delsingelqat = function(qat) {
      if(showSSDPR(machker,vemode)){  
      	delete $scope.tempObj[qat.key]
      	//merge
      	var totalData = [];
      	for(var _key in $scope.tempObj){
      		var temp = $scope.tempObj[_key];
      		temp.forEach(function(entry){
      			totalData[totalData.length] = entry;
      		}
      		);    
      	}
      	$scope.quantityAmountTable = totalData;
      }
    }/*Quantity Amount Table  End*/

    /*Special Interest Rate Table*/
    /*table two*/	
    function sirTableAdd(){		
    	var laabove = $scope.LoadAmountAbove ;
    	var sirate = $scope.SpecicalInterestRate ; 
    	if(laabove==null||laabove==""||sirate==null||sirate==""){
    		return;
    	}   	
    	var item = {};
    	var obj =[];
    	item.key = laabove+'-'+sirate ;
    	item.laabove ='> ' +laabove ;
    	item.sirate = sirate; 
    	obj[obj.length] = item;			 
    	return obj;
    }	


    $scope.sirTableLoad = function(){
		//...Load...
	}

	$scope.sirTableSave = function(){
		var savebtn=$scope.savebtn;
		var BasicInterestRate =$scope.BasicInterestRate;
		var tt = $scope.FinancingStartDate;
		var dd = $scope.MustUseMaxLoan;
		var yesno =$scope.MustUseMaxLoan;
		//var no =$scope.MustUseMaxLoanNo;
		alert(yesno+'HHHHHHHHHHH');//...Save...
	}

	$scope.specialInterestRateTable = [];
	$scope.tabletempObj = {};
	$scope.sirTableAdd = function(){		
		var newTable = sirTableAdd();    	 
		var _key = newTable[0].key;    	
		$scope.tabletempObj[_key] = newTable;    	
    	//merge
    	var totalData = [];
    	for(var _key in $scope.tabletempObj){
    		var temp = $scope.tabletempObj[_key];
    		temp.forEach(function(entry){
    			totalData[totalData.length] = entry;
    		}
    		);    
    	}
    	$scope.specialInterestRateTable = totalData;    	   	
    }

    $scope.sirTableRemove = function(){
    	$scope.specialInterestRateTable = [];
    }

    $scope.sirTableDelsingel = function(sirt){      
      if(showSSDPR(machker,vemode)){
      	delete $scope.tabletempObj[sirt.key]
      	//merge
      	var totalData = [];
      	for(var _key in $scope.tabletempObj){
      		var temp = $scope.tabletempObj[_key];
      		temp.forEach(function(entry){
      			totalData[totalData.length] = entry;
      		}
      		);
      	}
      	$scope.specialInterestRateTable = totalData;
      }else{}
    }/*Special Interest Rate Table End*/

    /*progress*/	
    function basicPro(){		
    	var basicfillField = 0;
    	if(angular.isDefined($scope.StockCode) && ( $scope.StockCode!=null && $scope.StockCode!='' )) {
    		basicfillField++;			
    	}
    	if(angular.isDefined($scope.IPOCode) && ($scope.IPOCode!=null && $scope.IPOCode!='')){
    		basicfillField++;
    	}
    	if(angular.isDefined($scope.EnglishStockName)&&($scope.EnglishStockName!=null && $scope.EnglishStockName!='')){
    		basicfillField++;
    	}
    	if(angular.isDefined($scope.TranditionalChineseName) && ($scope.TranditionalChineseName!=null && $scope.TranditionalChineseName!='')){
    		basicfillField++;
    	}
    	if(angular.isDefined($scope.SimplifiedChineseName) &&($scope.SimplifiedChineseName!=null && $scope.SimplifiedChineseName!='')){
    		basicfillField++;
    	}
    	if($scope.StockCurrency.model &&($scope.StockCurrency.model!=null && $scope.StockCurrency.model!='')){
    		basicfillField++;
    	}
    	if(angular.isDefined($scope.OfferPriceRangeStart) && ( $scope.OfferPriceRangeStart!=null && $scope.OfferPriceRangeStart!='' )) {
    		basicfillField++;			
    	}
    	if(angular.isDefined($scope.OfferPriceRangeEnd) && ( $scope.OfferPriceRangeEnd!=null && $scope.OfferPriceRangeEnd!='' )) {
    		basicfillField++;			
    	}
    	if(angular.isDefined($scope.BroadLot) && ( $scope.BroadLot!=null && $scope.BroadLot!=='' )) {
    		basicfillField++;			
    	}
    	if($scope.StockCurrency.model && ( $scope.StockCurrency.model!=null && $scope.StockCurrency.model!='' )) {
    		basicfillField++;			
    	}
    	if(angular.isDefined($scope.OnlineIPOStartDate) && ( $scope.OnlineIPOStartDate!=null && $scope.OnlineIPOStartDate!='' )) {
    		basicfillField++;			
    	}
    	if(angular.isDefined($scope.OnlineIPOStartTime) && ( $scope.OnlineIPOStartTime!=null && $scope.OnlineIPOStartTime!='' )) {
    		basicfillField++;			
    	}
    	if(angular.isDefined($scope.OnlineIPOEndDate)&& ( $scope.OnlineIPOEndDate!=null && $scope.OnlineIPOEndDate!='' )) {
    		basicfillField++;			
    	}
    	if(angular.isDefined($scope.OnlineIPOEndTime) && ( $scope.OnlineIPOEndTime!=null && $scope.OnlineIPOEndTime!='' )) {
    		basicfillField++;			
    	}
    	if(angular.isDefined($scope.IPOClosingDate) && ( $scope.IPOClosingDate!=null && $scope.IPOClosingDate!='' )) {
    		basicfillField++;			
    	}
    	if(angular.isDefined($scope.IPOClosingTime) && ( $scope.IPOClosingTime!=null && $scope.IPOClosingTime!='' )) {
    		basicfillField++;			
    	}
      if(angular.isDefined($scope.ApplicationPeriodStartDate) && ( $scope.ApplicationPeriodStartDate!=null && $scope.ApplicationPeriodStartDate!='' )) {
        basicfillField++;     
      }
      if(angular.isDefined($scope.ApplicationPeriodEndDate) && ( $scope.ApplicationPeriodEndDate!=null && $scope.ApplicationPeriodEndDate!='' )) {
        basicfillField++;     
      }
    	if(angular.isDefined($scope.ListingDate) && ( $scope.ListingDate!=null && $scope.ListingDate!='' )) {
    		basicfillField++;			
    	}
    	if($scope.AcceptSubscription && ( $scope.AcceptSubscription!=null && $scope.AcceptSubscription!=='' )) {
    		basicfillField++;			
    	}    	
    	return basicfillField;
    }


    function feePro(){
    	var feefillField = 0;
    	if(angular.isDefined($scope.CommissionRate) && ( $scope.CommissionRate!=null && $scope.CommissionRate!='' )) {
    		feefillField++;			
    	}
    	if(angular.isDefined($scope.LevyRate) && ( $scope.LevyRate!=null && $scope.LevyRate!='' )) {
    		feefillField++;			
    	}
    	if(angular.isDefined($scope.TradingFeeRate) && ( $scope.TradingFeeRate!=null && $scope.TradingFeeRate!='' )) {
    		feefillField++;			
    	}
    	if(angular.isDefined($scope.InvestorCompensationLevyRate) && ( $scope.InvestorCompensationLevyRate!=null && $scope.InvestorCompensationLevyRate!='' )) {
    		feefillField++;			
    	}
    	if($scope.CurrencyofHandingFee.model && ( $scope.CurrencyofHandingFee.model!=null && $scope.CurrencyofHandingFee.model!='' )) {
    		feefillField++;			
    	}
    	if(angular.isDefined($scope.HandingFee) && ( $scope.HandingFee!=null && $scope.HandingFee!='' )) {
    		feefillField++;			
    	}
    	if(angular.isDefined($scope.FinancingHandingFee) && ( $scope.FinancingHandingFee!=null && $scope.FinancingHandingFee!='' )) {
    		feefillField++;			
    	}

    	return feefillField;
    } 


    function quantityPro(){
    	var quantityfillField = 0;
    	if(angular.isDefined($scope.QuantityFrom) && ( $scope.QuantityFrom !=null && $scope.QuantityFrom !=='')) {
    		quantityfillField++;			
    	}
    	if(angular.isDefined($scope.QuantityTo) && ( $scope.QuantityTo!=null && $scope.QuantityTo!='' )) {
    		quantityfillField++;			
    	}
    	if(angular.isDefined($scope.Interval) && ( $scope.Interval!=null && $scope.Interval!='' )) {
    		quantityfillField++;			
    	}
    	if(angular.isDefined($scope.CalculationMethod) && ( $scope.CalculationMethod!=null && $scope.CalculationMethod!='' )) {
    		quantityfillField++;			
    	}
    	if(angular.isDefined($scope.quantityAmountTable) && ( $scope.quantityAmountTable!=null && $scope.quantityAmountTable.length!=0 )) {
    		quantityfillField++;			
    	}

    	return quantityfillField;
    } 


    function financingPro(){
    	var financingfillField = 0;
    	if($scope.showbelow && ( $scope.showbelow !=null && $scope.showbelow !=='')) {
    		financingfillField++;			
    	}		
    	if(angular.isDefined($scope.FinancingStartDate) && ( $scope.FinancingStartDate!=null && $scope.FinancingStartDate!='' )) {
    		financingfillField++;			
    	}
    	if(angular.isDefined($scope.FinancingStartTime) && ( $scope.FinancingStartTime!=null && $scope.FinancingStartTime!='' )) {
    		financingfillField++;			
    	}
    	if(angular.isDefined($scope.FinancingEndDate) && ( $scope.FinancingEndDate!=null && $scope.FinancingEndDate!='' )) {
    		financingfillField++;			
    	}
    	if(angular.isDefined($scope.FinancingEndTime) && ( $scope.FinancingEndTime!=null && $scope.FinancingEndTime!='' )) {
    		financingfillField++;			
    	}
    	if(angular.isDefined($scope.InterestDay) && ( $scope.InterestDay!=null && $scope.InterestDay!=='')) {
    		financingfillField++;			
    	}
    	if(angular.isDefined($scope.MaxLoanRatio) && ( $scope.MaxLoanRatio!=null && $scope.MaxLoanRatio!=='' )) {
    		financingfillField++;			
    	}
    	if(angular.isDefined($scope.MustUseMaxLoan) && ( $scope.MustUseMaxLoan!=null && $scope.MustUseMaxLoan!='')) {
    		financingfillField++;			
    	}
    	if(angular.isDefined($scope.AllowedLoanRatioSelectedby) && ( $scope.AllowedLoanRatioSelectedby!=null && $scope.AllowedLoanRatioSelectedby!=='' )) {
    		financingfillField++;			
    	}
    	if(angular.isDefined($scope.BasicInterestRate) && ( $scope.BasicInterestRate!=null && $scope.BasicInterestRate!=='' )) {
    		financingfillField++;			
    	}
    	if(angular.isDefined($scope.specialInterestRateTable) && ( $scope.specialInterestRateTable!=null && $scope.specialInterestRateTable.length!=0 )) {
    		financingfillField++;			
    	}

    	return financingfillField;
    } 

    $scope.basictotal = 20;
    $scope.feetotal = 7;
    $scope.quantitytotal = 5;
    $scope.financingtotal = 11;
    $scope.totalMandatorField = 43;

    function totalFieldPro(){
    	var fp= $scope.financingProgress;
    	var qp= $scope.quantityProgress;
    	var fep= $scope.feeProgress;
    	var bp= $scope.basicProgress;
    	var totalp =fp +qp +fep +bp;
    	return totalp;
    }

    $interval(function () {
    	$scope.basicProgress = basicPro();
    	$scope.feeProgress = feePro();
    	$scope.quantityProgress = quantityPro();
    	$scope.financingProgress = financingPro();
    	$scope.filledFields =totalFieldPro();
    	var tof =$scope.filledFields;
    	$scope.totalFieldProgress =Math.floor((tof/43)*100) ;
    }, 500);


    $('#scrollbody').scrollspy({ target: '#navbar-example' })


    /*submit data*/ 
    function getCreateIpoData(){ 
    $scope.createIpoData ={};
    $scope.createIpoData.secId =$scope.StockCode||"";
    $scope.createIpoData.ccy=$scope.StockCurrency.model||"";    
    //exRate
    $scope.createIpoData.exRate="1";
    //requireHoldFundCash
    $scope.createIpoData.requireHoldFundCash=$scope.requireHoldFundCash;
    //requireHoldFundMargin
    $scope.createIpoData.requireHoldFundMargin=$scope.requireHoldFundMargin;
    //allowCancelCash
    $scope.createIpoData.allowCancelCash=$scope.allowCancelCash;
    //allowCancelMargin
    $scope.createIpoData.allowCancelMargin=$scope.allowCancelMargin;


    //subStatus
    if($scope.AcceptSubscription==true){
      $scope.createIpoData.subStatus='Y';
    }
    if($scope.AcceptSubscription==false){
      $scope.createIpoData.subStatus='N';
    }
    
    //subStartTime >online IPO start
    if($scope.OnlineIPOStartDate&&$scope.OnlineIPOStartTime){
      var tempdata = $scope.OnlineIPOStartDate;
      var temptime = $scope.OnlineIPOStartTime;
      $scope.createIpoData.subStartTime= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8)+temptime.substring(0,2)+temptime.substring(3);
    }

    //subCloseTime    
    if($scope.IPOClosingDate&&$scope.IPOClosingTime){
      var tempdata = $scope.IPOClosingDate;
      var temptime = $scope.IPOClosingTime;
      $scope.createIpoData.subCloseTime= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8)+temptime.substring(0,2)+temptime.substring(3);
    }       
    
    $scope.createIpoData.name=$scope.EnglishStockName||"";
    $scope.createIpoData.tcName=$scope.TranditionalChineseName||"";
    $scope.createIpoData.scName=$scope.SimplifiedChineseName||"";
    $scope.createIpoData.totalShare=$scope.NumberofOfferSharesUnitunderGlobalOffering||"";
    $scope.createIpoData.publicShare=$scope.NumberofPublicOfferSharesUnit||"";
    $scope.createIpoData.nominalCcy=$scope.StockCurrency.model||"";
    $scope.createIpoData.nominalValue=$scope.NominalValue||"";    
    $scope.createIpoData.offerPriceFrom=$scope.OfferPriceRangeStart||"";
    $scope.createIpoData.offerPriceTo=$scope.OfferPriceRangeEnd||"";
    
    //offerStartTime    
    if($scope.ApplicationPeriodStartDate){
      var tempdata = $scope.ApplicationPeriodStartDate;      
      $scope.createIpoData.offerStartTime= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8)+"0800";
    }

    //offerCloseTime    
    if($scope.ApplicationPeriodEndDate){
      var tempdata = $scope.ApplicationPeriodEndDate;      
      $scope.createIpoData.offerCloseTime= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8)+"0800";
    }

    //lotSize
    $scope.createIpoData.lotSize=$scope.BroadLot||"";
    
    //priceFixDate
    if($scope.PriceFixingDate){
      var tempdata = $scope.PriceFixingDate;      
      $scope.createIpoData.priceFixDate= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8)+'0800';
    }else{
      $scope.createIpoData.priceFixDate='';
    }

    //announceDate
    if($scope.ResultAnnouncementDate){
      var tempdata = $scope.ResultAnnouncementDate;      
      $scope.createIpoData.announceDate= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8)+'0800';
    }else{
      $scope.createIpoData.announceDate='';
    }

    //estRefundDate
    if($scope.DispatchofSharesandRefundDate){
      var tempdata = $scope.DispatchofSharesandRefundDate;      
      $scope.createIpoData.estRefundDate= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8)+'0800';
    }else{
      $scope.createIpoData.estRefundDate='';
    }

    //listingDate
    if($scope.ListingDate){
      var tempdata = $scope.ListingDate;      
      $scope.createIpoData.listingDate= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8)+'0800';
    }

    //marginStatus
    if($scope.showbelow==true){
      $scope.createIpoData.marginStatus='Y';
    }
    if($scope.showbelow==false){
      $scope.createIpoData.marginStatus='N';
    }    

    //marginStartTime    
    if($scope.FinancingStartDate&&$scope.FinancingStartTime){
      var tempdata = $scope.FinancingStartDate;
      var temptime = $scope.FinancingStartTime;
      $scope.createIpoData.marginStartTime= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8)+temptime.substring(0,2)+temptime.substring(3);
    }

    //marginCloseTime    
    if($scope.FinancingEndDate&&$scope.FinancingEndTime){
      var tempdata = $scope.FinancingEndDate;
      var temptime = $scope.FinancingEndTime;
      $scope.createIpoData.marginCloseTime= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8)+temptime.substring(0,2)+temptime.substring(3);
    }

    //maxMarginRate
    $scope.createIpoData.maxMarginRate=($scope.MaxLoanRatio/100).toFixed(4);
    //marginRateFilter
    $scope.createIpoData.marginRateFilter=$scope.AllowedLoanRatioSelectedby||"";
    //useMaxMargin
    
    if($scope.MustUseMaxLoan=="yes"){
      $scope.createIpoData.useMaxMargin='Y';
    }
    if($scope.MustUseMaxLoan=="no"){
      $scope.createIpoData.useMaxMargin='N';
    } 

    //api Uncharted---    
    $scope.createIpoData.OnlineIPOEndDate=$scope.OnlineIPOEndDate;
    $scope.createIpoData.OnlineIPOEndTime=$scope.OnlineIPOEndTime;
    $scope.createIpoData.IPOCode=$scope.IPOCode||"";    
    $scope.createIpoData.MaxLoanAmountperApplication=$scope.MaxLoanAmountperApplication||"";
    $scope.createIpoData.MinLoanAmountperApplication=$scope.MinLoanAmountperApplication||"";
    $scope.createIpoData.MinnoofsharespapliedforIPOLoan=$scope.MinnoofsharespapliedforIPOLoan||"";
    $scope.createIpoData.Loadfromtemplates=$scope.Loadfromtemplates||"";
    $scope.createIpoData.Saveastemplatewithname=$scope.Saveastemplatewithname||"";
    $scope.createIpoData.FinalOfferPrice=$scope.FinalOfferPrice||"";
    //----
    $scope.createIpoData.commRate=($scope.CommissionRate/100).toFixed(6);
    $scope.createIpoData.levyRate=($scope.LevyRate/100).toFixed(6);
    $scope.createIpoData.tradeFeeRate=($scope.TradingFeeRate/100).toFixed(6);
    $scope.createIpoData.icLevyRate=($scope.InvestorCompensationLevyRate/100).toFixed(6);    
    $scope.createIpoData.propspectusURL=$scope.ProspectusesEnglishURL||"";
    $scope.createIpoData.tcPropspectusURL=$scope.ProspectusesSimplifiedChineseURL||"";
    $scope.createIpoData.scPropspectusURL=$scope.ProspectusesTranditionalChineseURL||"";
    $scope.createIpoData.externalRemark=$scope.RemarkforExternal||"";
    $scope.createIpoData.internalRemark=$scope.RemarkforInternal||"";    
    $scope.createIpoData.clientIntDay=$scope.InterestDay||"";    
    
    if(angular.isDefined($scope.ClientRebateRate) && $scope.ClientRebateRate!=null && $scope.ClientRebateRate!=''){
      $scope.createIpoData.clientRebateRate=($scope.ClientRebateRate/100).toFixed(6);
    }else{
      $scope.createIpoData.clientRebateRate="";
    } 
    $scope.createIpoData.handlingFeeCcy=$scope.CurrencyofHandingFee.model||"";
    $scope.createIpoData.handingFee=$scope.HandingFee||"";
    $scope.createIpoData.finHandingFee=$scope.FinancingHandingFee||"";

    var appQtyAmtRangeArr = [], rangeIdCursor = 1, tArray = [];    
    angular.forEach($scope.quantityAmountTable, function(item) {      
      var appQtyAmtRange = {}, keycurr=item.key ,itemKeyArr = item.key.split('-');
      if(tArray.indexOf(keycurr)== -1){
        appQtyAmtRange.rangeId = rangeIdCursor++;
        appQtyAmtRange.appQtyFrom = itemKeyArr[0];
        appQtyAmtRange.appQtyTo = itemKeyArr[1];      
        appQtyAmtRangeArr.push(appQtyAmtRange);
        tArray.push(keycurr);
      }      
    });    
    $scope.createIpoData.appQtyAmtRange=appQtyAmtRangeArr;

    var appQtyAmtArr = [],tempArry = [],rangeIdCursorR = 0;
    angular.forEach($scope.quantityAmountTable, function(item) {
      var appQtyAmt = {},keycur=item.key;
      if(tempArry.indexOf(keycur)== -1){
        appQtyAmt.rangeId = ++rangeIdCursorR;      
        tempArry.push(keycur);
      }else{
        appQtyAmt.rangeId = rangeIdCursorR;  
     }
      appQtyAmt.appQty = item.qty;
      appQtyAmt.appAmt = item.amt;
      appQtyAmtArr.push(appQtyAmt);
      
    });
    $scope.createIpoData.appQtyAmt=appQtyAmtArr;    

    var amtIntRateArr = [];
    angular.forEach($scope.specialInterestRateTable, function(item) {
      var amtIntRate = {};      
      amtIntRate.loanAmt = item.laabove.substring(2,item.laabove.length);
      amtIntRate.intRate = item.sirate;
      amtIntRateArr.push(amtIntRate);
    });
    $scope.createIpoData.amtIntRate=amtIntRateArr;
             
    if($scope.CalculationMethod=="RLSUA"){
      $scope.createIpoData.calcMethod='1';
    }
    if($scope.CalculationMethod=="RBIC"){
      $scope.createIpoData.calcMethod='2';
    }
    if($scope.CalculationMethod=="BOUCARLSUA"){
      $scope.createIpoData.calcMethod='3';
    }
    if($scope.CalculationMethod=="BOUCARBIC"){
      $scope.createIpoData.calcMethod='4';
    }    
    $scope.createIpoData.basicIntRate=($scope.BasicInterestRate/100).toFixed(6);
    $scope.createIpoData.submitType="Submit";
    $scope.createIpoData.submit="Submit";
    console.log($scope.createIpoData);
    return $scope.createIpoData;
    }

    /*Submit*/
    $scope.createIPOsubmit = function(){
    	$http({
    		method: 'POST',
    		url:'/i/createIPO',
    		//url:sharedProperties.getBaseURL() + '/i/createIPO',
    		data: getCreateIpoData() 
    		//{clientId createipo?data}
    	}).then(function successCallback(response) {
          console.log(response);
    		 if (response['data']['returnCode'] == SUCCESS) {          
                $scope.machker = false;
                $scope.vemode = false;               
          }
          else {          
          }      	 	
    	}, function errorCallback(response) {
    		//$scope.displayDefaultError();
    		console.log('Error -->' + response);
    	});
    }

    /*SavaDraft*/
    $scope.createIPOsavaDraft = function(){     
       $http({
          method: 'POST',
          url:'/i/createIPO',
          //sharedProperties.getBaseURL() + '/i/createIPO',
          data:"test"        
        }).then(function successCallback(response) {
          console.log('success -->' +response);
            alert("success");
        }, function errorCallback(response) {
          //$scope.displayDefaultError();
          console.log('Error -->' + response);
        });   
    }


























	//....test value..
  $scope.StockCode=00008;
  $scope.TranditionalChineseName="TEST-TC";
  $scope.SimplifiedChineseName="TEST-SC";
  $scope.NumberofOfferSharesUnitunderGlobalOffering=150000;
  $scope.NumberofPublicOfferSharesUnit=140000;
  $scope.BroadLot=1000;
  $scope.NominalValue=0.1;
  $scope.ProspectusesEnglishURL="http://www.xxx.com";
  $scope.ProspectusesSimplifiedChineseURL="http://www.xxx.com";
  $scope.ProspectusesTranditionalChineseURL="http://www.xxx.com";
  $scope.RemarkforInternal="no";
  $scope.RemarkforExternal="no";
  $scope.HandingFee=2;
  $scope.FinancingHandingFee=2;
  $scope.InterestDay=100;
  $scope.MaxLoanRatio=0.9;
  $scope.AllowedLoanRatioSelectedby="0.9,0.2,0.1";
  $scope.BasicInterestRate=0.01;
  $scope.LoadAmountAbove=12;
  $scope.SpecicalInterestRate=0.3;
  $scope.ClientRebateRate=0.01;
	$scope.OfferPriceRangeStart= 1.0;
	$scope.OfferPriceRangeEnd = 1.7;
	$scope.CommissionRate = 1;
	$scope.LevyRate = 0.005;
	$scope.TradingFeeRate = 0.002;
	$scope.InvestorCompensationLevyRate = 0.005;
	$scope.QuantityFrom = 0;
	$scope.QuantityTo = 1000;
	$scope.Interval = 1000;

  $scope.OnlineIPOStartDate='2016/12/20';
  $scope.ApplicationPeriodStartDate='2016/12/20';
  $scope.ListingDate='2017/12/25';
  $scope.FinancingStartDate='2016/12/20';
  $scope.OnlineIPOStartTime='08:00';
  //2017/12/20
  

  

	

	
	/* guide */
	$('ul li a').hover(function(){
		var $t = $(this).parent();//.toggleClass('active');
		if($t.hasClass('active2')){
			$t.data('hoverAdd',false);
		}else{
			$t.toggleClass('active2');
			$t.data('hoverAdd',true);
		}
	},function(){
		var $t = $(this).parent();//.toggleClass('active');
		if($t.data('hoverAdd')){
			$t.removeClass('active2');
		}
	});

  //init
  $scope.init = function() {    
    //$scope.createIPOtest();
    $scope.createIPOgetSysSetting();
       
      
  }   
  $scope.init();

	
}]);
