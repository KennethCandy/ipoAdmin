angular.module('ipoAdminApp.createIPOController', [])

.controller('createIPOCtrl', [ '$scope', '$rootScope', '$sce', '$http', '$interval', '$translate','$location', 'sharedProperties', 'redirectService', 'applicationStatusService', 'timelineService', function($scope, $rootScope, $sce, $http, $interval, $translate,$location, sharedProperties, redirectService, applicationStatusService, timelineService) {

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
		"timePicker": true,
    "timePicker24Hour": true,
    "applyLabel": "Apply",
    "cancelLabel": "Cancel",
    "fromLabel": "From",
    "toLabel": "To",
    "locale": {
        "format": "YYYY/MM/DD HH:mm"          
    }
	});

	$("#ResultAnnouncementDate").daterangepicker({    	
		"singleDatePicker": true,
    "timePicker": true,
    "timePicker24Hour": true,
    "applyLabel": "Apply",
    "cancelLabel": "Cancel",
    "fromLabel": "From",
    "toLabel": "To",
    "locale": {
        "format": "YYYY/MM/DD HH:mm"          
    }
	});

	$("#DispatchofSharesandRefundDate").daterangepicker({    	
		"singleDatePicker": true,
    "timePicker": true,
    "timePicker24Hour": true,
    "applyLabel": "Apply",
    "cancelLabel": "Cancel",
    "fromLabel": "From",
    "toLabel": "To",
    "locale": {
        "format": "YYYY/MM/DD HH:mm"          
    }
	});

	$("#ListingDate").daterangepicker({    	
		"singleDatePicker": true,
    "timePicker": true,
    "timePicker24Hour": true,
    "applyLabel": "Apply",
    "cancelLabel": "Cancel",
    "fromLabel": "From",
    "toLabel": "To",
    "locale": {
        "format": "YYYY/MM/DD HH:mm"          
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
    "timePicker": true,
    "timePicker24Hour": true,
    "applyLabel": "Apply",
    "cancelLabel": "Cancel",
    "fromLabel": "From",
    "toLabel": "To",
    "locale": {
        "format": "YYYY/MM/DD HH:mm"          
    }
  });

  $("#ApplicationPeriodEndDate").daterangepicker({      
    "singleDatePicker": true,
    "timePicker": true,
    "timePicker24Hour": true,
    "applyLabel": "Apply",
    "cancelLabel": "Cancel",
    "fromLabel": "From",
    "toLabel": "To",
    "locale": {
        "format": "YYYY/MM/DD HH:mm"          
    }
  });
  /*datepicker end*/

  /*Access Control*/    
  $scope.makerCheckerChange=function(){
    if(sharedProperties.isCheckerRole()){
      $scope.machker = true;
    }else{
      $scope.machker = false;//maker:false     checker:true
    }
  }
  $scope.viewEditChange=function(){
    if(sharedProperties.isEditMode()){
      $scope.vemode = true;
      sharedProperties.setEditMode(true);
    }else{
      $scope.vemode = false;//view:false     edit:true
      sharedProperties.setEditMode(false);
    }
  }
  $scope.showbelow = false;//Check box Checked if IPO financing is allowed;Unchecked if IPO financing is not allowed.

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
      $scope.tempObj = {};    
    }
    $scope.delsingelqat = function(qat) {
      if(($scope.machker ^ $scope.vemode)&$scope.vemode){  
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

    /*amtIntRateTemplateName*/
    $scope.Loadfromtemplates="";      
    $scope.Loadfromtemplates = {model: "", getLoadfromtemplates:[]};    
    $scope.sirTableLoadTemplateName = function(){
      $scope.Loadfromtemplates="";      
      $scope.Loadfromtemplates = {model: "", getLoadfromtemplates:[]};
  		$http({
  	        method: 'POST',	               
  	        url:sharedProperties.getBaseURL() + '/i/amtIntRateTemplateName',
  	        data: {submit:"Submit"}      
          }).then(function successCallback(response) {
            console.log(response);
            if (response['data']['returnCode'] == SUCCESS) {            
                var tempData = response['data']['templates'];
                angular.forEach(tempData, function(item) {
                    $scope.Loadfromtemplates.getLoadfromtemplates.push(item.template);                 
                })               
          }
          else {          
          } 
        }, function errorCallback(response) {          
            console.log(response);
            console.log('Error -->' + response);
          }); 
	}  
      

    $scope.sirTableLoad = function(){
		$http({
	        method: 'POST',	               
	        url:sharedProperties.getBaseURL() + '/i/loadAmtIntRate',
	        data: {template: $scope.Loadfromtemplates.model,	        
		           submit:"Submit"}      
        }).then(function successCallback(response) {
          console.log(response);
          if (response['data']['returnCode'] == SUCCESS) {        
            $scope.AssignmentsirTable(response['data']);
        }
        else {          
        } 
      }, function errorCallback(response) {          
          console.log(response);
          console.log('Error -->' + response);
        }); 
	}

  $scope.AssignmentsirTable=function(ipodata){
        $scope.specialInterestRateTable=[];
        $scope.tabletempObj = {};
          var amtIntRateArr = [];
          angular.forEach(ipodata.amtIntRate, function(item) {
            var amtIntRate = {},obj=[];      
            amtIntRate.laabove = '> '+item.loanAmt;
            obj.laabove = '> '+item.loanAmt;
            amtIntRate.sirate = item.intRate;
            obj.sirate = item.intRate;
            amtIntRate.key =item.loanAmt+'-'+item.intRate;
            obj.key = item.loanAmt+'-'+item.intRate;            
            var tempArr = $scope.tabletempObj[amtIntRate.key];
            if(!$scope.tabletempObj[amtIntRate.key]){
              tempArr=[];
              $scope.tabletempObj[amtIntRate.key] = tempArr;
            }
            tempArr.push(obj);
            amtIntRateArr.push(amtIntRate);            
          });
        $scope.specialInterestRateTable=amtIntRateArr;    
    }

	function getSaveTemplatewithname(){
		var amtIntRateArr = [];
	    angular.forEach($scope.specialInterestRateTable, function(item) {
	        var amtIntRate = {};      
	        amtIntRate.loanAmt = item.laabove.substring(2,item.laabove.length);
	        amtIntRate.intRate = item.sirate;
	        amtIntRateArr.push(amtIntRate);
	    });
	    return amtIntRateArr;
	}

	$scope.sirTableSave = function(){    
		$http({
        	method: 'POST',
          	url:sharedProperties.getBaseURL() + '/i/saveAmtIntRate',
          	data: {template: $scope.Saveastemplatewithname,     
		           amtIntRate: getSaveTemplatewithname(),         
		           submit:"Submit"}      
        }).then(function successCallback(response) {
          console.log(response);          
          if (response['data']['returnCode'] == SUCCESS) {         
            $scope.sirTableLoadTemplateName();
        }
        else {          
        } 
      }, function errorCallback(response) {         
          console.log(response);
          console.log('Error -->' + response);
        }); 
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
      $scope.tabletempObj = {};
    }

    $scope.sirTableDelsingel = function(sirt){      
      if(($scope.machker ^ $scope.vemode)&$scope.vemode){
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
    	if($scope.StockCurrency.model && ( $scope.StockCurrency.model!=null && $scope.StockCurrency.model!='' )) {
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
    	/*if(angular.isDefined($scope.QuantityFrom) && ( $scope.QuantityFrom !=null && $scope.QuantityFrom !=='')) {
    		quantityfillField++;			
    	}
    	if(angular.isDefined($scope.QuantityTo) && ( $scope.QuantityTo!=null && $scope.QuantityTo!='' )) {
    		quantityfillField++;			
    	}
    	if(angular.isDefined($scope.Interval) && ( $scope.Interval!=null && $scope.Interval!='' )) {
    		quantityfillField++;			
    	}*/
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

    function operationalPro(){
      var operationalfillField = 0;
      if(angular.isDefined($scope.requireHoldFundCash) && ( $scope.requireHoldFundCash!=null && $scope.requireHoldFundCash!='')) {
        operationalfillField++;     
      }   
      if(angular.isDefined($scope.allowCancelCash) && ( $scope.allowCancelCash!=null && $scope.allowCancelCash!='' )) {
        operationalfillField++;     
      }
      if(angular.isDefined($scope.requireHoldFundMargin) && ( $scope.requireHoldFundMargin!=null && $scope.requireHoldFundMargin!='' )) {
        operationalfillField++;     
      }
      if(angular.isDefined($scope.allowCancelMargin) && ( $scope.allowCancelMargin!=null && $scope.allowCancelMargin!='' )) {
        operationalfillField++;     
      }     

      return operationalfillField;
    } 

    $scope.basictotal = 17;
    $scope.feetotal = 7;
    $scope.quantitytotal = 2;    
    
    function totalFieldPro(){
    	var fp= $scope.financingProgress;
    	var qp= $scope.quantityProgress;
    	var fep=$scope.feeProgress;
    	var bp= $scope.basicProgress;
      var op= $scope.operationalProgress;
      var totalp =fp +qp +fep +bp+op;
      return totalp;
    }

    $interval(function () {      
      $scope.financingtotal =$scope.showbelow?11:1;
      $scope.operationaltotal = $scope.showbelow?4:2;
      $scope.totalMandatorField = $scope.showbelow?41:29;
    	$scope.basicProgress = basicPro();
    	$scope.feeProgress = feePro();
    	$scope.quantityProgress = quantityPro();
    	$scope.financingProgress = financingPro();
      $scope.operationalProgress = operationalPro();
      $scope.filledFields =totalFieldPro();
      var tof =$scope.filledFields;
      $scope.totalFieldProgress =Math.floor((tof/$scope.totalMandatorField)*100) ;
      $scope.widthGui = {'width': ($scope.totalFieldProgress>22 ? $scope.totalFieldProgress : 22) + '%'};
    }, 500);


    $('#scrollbody').scrollspy({ target: '#navbar-example' })


    /*submit data*/
    $scope.AcceptSubscription=false;
    $scope.MustUseMaxLoan=false;
    $scope.requireHoldFundCash=false;
    $scope.requireHoldFundMargin=false;
    $scope.allowCancelCash=false;
    $scope.allowCancelMargin=false;
    function getCreateIpoData(submitType){ 
      $scope.createIpoData ={};      
      $scope.createIpoData.ccy=$scope.StockCurrency.model||"";    
      //exRate
      $scope.createIpoData.exRate="1";
      
      if($scope.requireHoldFundCash==true){
        $scope.createIpoData.requireHoldFundCash='Y';
      }
      if($scope.requireHoldFundCash==false){
        $scope.createIpoData.requireHoldFundCash='N';
      }     
      
      if($scope.requireHoldFundMargin==true){
        $scope.createIpoData.requireHoldFundMargin='Y';
      }
      if($scope.requireHoldFundMargin==false){
        $scope.createIpoData.requireHoldFundMargin='N';
      }      
      
      if($scope.allowCancelCash==true){
        $scope.createIpoData.allowCancelCash='Y';
      }
      if($scope.allowCancelCash==false){
        $scope.createIpoData.allowCancelCash='N';
      }
      
      if($scope.allowCancelMargin==true){
        $scope.createIpoData.allowCancelMargin='Y';
      }
      if($scope.allowCancelMargin==false){
        $scope.createIpoData.allowCancelMargin='N';
      }

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
      if($scope.OnlineIPOEndDate&&$scope.OnlineIPOEndTime){
        var tempdata = $scope.OnlineIPOEndDate;
        var temptime = $scope.OnlineIPOEndTime;
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
        $scope.createIpoData.offerStartTime= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8,10)+tempdata.substring(11,13)+tempdata.substring(14);
      }

      //offerCloseTime    
      if($scope.ApplicationPeriodEndDate){
        var tempdata = $scope.ApplicationPeriodEndDate;      
        $scope.createIpoData.offerCloseTime= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8,10)+tempdata.substring(11,13)+tempdata.substring(14);
      }

      //lotSize
      $scope.createIpoData.lotSize=$scope.BroadLot||"";
      
      //priceFixDate
      if($scope.PriceFixingDate){
        var tempdata = $scope.PriceFixingDate;      
        $scope.createIpoData.priceFixDate= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8,10)+tempdata.substring(11,13)+tempdata.substring(14);
      }else{
        $scope.createIpoData.priceFixDate='';
      }

      //announceDate
      if($scope.ResultAnnouncementDate){
        var tempdata = $scope.ResultAnnouncementDate;      
        $scope.createIpoData.announceDate= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8,10)+tempdata.substring(11,13)+tempdata.substring(14);
      }else{
        $scope.createIpoData.announceDate='';
      }

      //estRefundDate
      if($scope.DispatchofSharesandRefundDate){
        var tempdata = $scope.DispatchofSharesandRefundDate;      
        $scope.createIpoData.estRefundDate= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8,10)+tempdata.substring(11,13)+tempdata.substring(14);
      }else{
        $scope.createIpoData.estRefundDate='';
      }

      //listingDate
      if($scope.ListingDate){
        var tempdata = $scope.ListingDate;      
        $scope.createIpoData.listingDate= tempdata.substring(0,4)+tempdata.substring(5,7)+tempdata.substring(8,10)+tempdata.substring(11,13)+tempdata.substring(14);
      }

      //marginStatus
      if($scope.showbelow==true){
        $scope.createIpoData.marginStatus='Y';
      }
      if($scope.showbelow==false){
        $scope.createIpoData.marginStatus='N';
      }

      if($scope.showbelow){
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
      $scope.createIpoData.clientIntDay=$scope.InterestDay||"";          
      $scope.createIpoData.MaxLoanAmountperApplication=$scope.MaxLoanAmountperApplication||"";
      $scope.createIpoData.MinLoanAmountperApplication=$scope.MinLoanAmountperApplication||"";
      $scope.createIpoData.MinnoofsharespapliedforIPOLoan=$scope.MinnoofsharespapliedforIPOLoan||"";
      $scope.createIpoData.Loadfromtemplates=$scope.Loadfromtemplates||"";
      $scope.createIpoData.Saveastemplatewithname=$scope.Saveastemplatewithname||"";
      //maxMarginRate
      $scope.createIpoData.maxMarginRate=($scope.MaxLoanRatio/100).toFixed(4);
      //marginRateFilter      
      if(angular.isDefined($scope.AllowedLoanRatioSelectedby) && ( $scope.AllowedLoanRatioSelectedby!=null && $scope.AllowedLoanRatioSelectedby!='' ))
      {
        var tempStr =$scope.AllowedLoanRatioSelectedby;
        var tempStrArr = tempStr.split(',').reverse();
        var reStr='';
        angular.forEach(tempStrArr, function(item) {
            reStr =reStr+(item/100).toFixed(3)+',';
        })
        $scope.createIpoData.marginRateFilter=reStr.substring(0,reStr.length-1);
      }

      //useMaxMargin      
      if($scope.MustUseMaxLoan==true){
        $scope.createIpoData.useMaxMargin='Y';
      }
      if($scope.MustUseMaxLoan==false){
        $scope.createIpoData.useMaxMargin='N';
      }
      $scope.createIpoData.basicIntRate=($scope.BasicInterestRate/100).toFixed(6);
      var amtIntRateArr = [];
      angular.forEach($scope.specialInterestRateTable, function(item) {
        var amtIntRate = {};      
        amtIntRate.loanAmt = item.laabove.substring(2,item.laabove.length);
        amtIntRate.intRate = item.sirate;
        amtIntRateArr.push(amtIntRate);
      });
    
    var amtIntRateJson = JSON.stringify(amtIntRateArr); 
      $scope.createIpoData.amtIntRate=amtIntRateJson;
    }

      //api Uncharted---    
      $scope.createIpoData.OnlineIPOEndDate=$scope.OnlineIPOEndDate;
      $scope.createIpoData.OnlineIPOEndTime=$scope.OnlineIPOEndTime;
      $scope.createIpoData.IPOCode=$scope.IPOCode||"";
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
      
      if(angular.isDefined($scope.ClientRebateRate) && $scope.ClientRebateRate!=null && $scope.ClientRebateRate!=''){
        $scope.createIpoData.clientRebateRate=($scope.ClientRebateRate/100).toFixed(6);
      }else{
        $scope.createIpoData.clientRebateRate="";
      } 
      $scope.createIpoData.handlingFeeCcy=$scope.StockCurrency.model||"";
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
	  	  
	  var appQtyAmtRangeJson = JSON.stringify(appQtyAmtRangeArr);	 
      $scope.createIpoData.appQtyAmtRange=appQtyAmtRangeJson;

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
	 
	  var appQtyAmtJson = JSON.stringify(appQtyAmtArr);	 
      $scope.createIpoData.appQtyAmt=appQtyAmtJson;      
      
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
      
      $scope.createIpoData.submitType=submitType;
      $scope.createIpoData.submit="Submit";
      
      if($scope.isModify){
        $scope.createIpoData.ipoId=$scope.ipoId;
        $scope.createIpoData.version=$scope.version;
      }else{
        $scope.createIpoData.secId =$scope.StockCode;
      }
      console.log($scope.createIpoData);
      return $scope.createIpoData;
    }   

    /*load data*/
    $scope.modifyDateTime = "";
    $scope.modifyDate = "";
    $scope.modifyTime = "";
    $scope.modifyUserId="";
    $scope.modify=false;

    $scope.loadIPODetailData = function(ipodata){
      $scope.modifyDateTime=ipodata.modifyTime;        
      $scope.modifyDate=$scope.modifyDateTime.substring(0,4)+'/'+$scope.modifyDateTime.substring(4,6)+'/'+$scope.modifyDateTime.substring(6,8);
      $scope.modifyTime=$scope.modifyDateTime.substring(8,10)+':'+$scope.modifyDateTime.substring(10,12);
      $scope.modifyUserId=ipodata.modifyUserId;
      $scope.modify=true;

      $scope.StockCode=ipodata.secId;
      $scope.IPOCode=ipodata.ipoId;
      $scope.EnglishStockName=ipodata.name;
      $scope.SimplifiedChineseName=ipodata.scName;
      $scope.TranditionalChineseName=ipodata.tcName;
      $scope.NumberofOfferSharesUnitunderGlobalOffering=ipodata.totalShare;
      $scope.NumberofPublicOfferSharesUnit=ipodata.publicShare;
      $scope.StockCurrency.model=ipodata.ccy;
      $scope.OfferPriceRangeStart=ipodata.offerPriceFrom;
      $scope.OfferPriceRangeEnd=ipodata.offerPriceTo;
      $scope.BroadLot=ipodata.lotSize;
      $scope.StockCurrency.model=ipodata.nominalCcy;
      $scope.NominalValue=ipodata.nominalValue;

      var subStartTime =ipodata.subStartTime;
      if(subStartTime!=null&&subStartTime!=''){
        $scope.OnlineIPOStartDate =subStartTime.substring(0,4)+'/'+subStartTime.substring(4,6)+'/'+subStartTime.substring(6,8);
        $scope.OnlineIPOStartTime =subStartTime.substring(8,10)+':'+subStartTime.substring(10,12);
      }     

      var subCloseTime =ipodata.subCloseTime;
      if(subCloseTime!=null&&subCloseTime!=''){
        $scope.OnlineIPOEndDate =subCloseTime.substring(0,4)+'/'+subCloseTime.substring(4,6)+'/'+subCloseTime.substring(6,8);
        $scope.OnlineIPOEndTime =subCloseTime.substring(8,10)+':'+subCloseTime.substring(10,12);
      }

      var priceFixDate =ipodata.priceFixDate;
      if(priceFixDate!=null&&priceFixDate!=''){
        $scope.PriceFixingDate =priceFixDate.substring(0,4)+'/'+priceFixDate.substring(4,6)+'/'+priceFixDate.substring(6,8)+' '+priceFixDate.substring(8,10)+':'+priceFixDate.substring(10,12);          
      }

      var offerStartTime =ipodata.offerStartTime;
      if(offerStartTime!=null&&offerStartTime!=''){
        $scope.ApplicationPeriodStartDate =offerStartTime.substring(0,4)+'/'+offerStartTime.substring(4,6)+'/'+offerStartTime.substring(6,8)+' '+offerStartTime.substring(8,10)+':'+offerStartTime.substring(10,12);          
      }
      
      var offerCloseTime =ipodata.offerCloseTime;
      if(offerCloseTime!=null&&offerCloseTime!=''){
        $scope.ApplicationPeriodEndDate =offerCloseTime.substring(0,4)+'/'+offerCloseTime.substring(4,6)+'/'+offerCloseTime.substring(6,8)+' '+offerCloseTime.substring(8,10)+':'+offerCloseTime.substring(10,12);          
      }
      
      var announceDate = ipodata.announceDate;
      if(announceDate!=null&&announceDate!=''){              
        $scope.ResultAnnouncementDate =announceDate.substring(0,4)+'/'+announceDate.substring(4,6)+'/'+announceDate.substring(6,8)+' '+announceDate.substring(8,10)+':'+announceDate.substring(10,12);
      }else{
        $scope.ResultAnnouncementDate='';
      }

      var estRefundDate = ipodata.estRefundDate;
      if(estRefundDate!=null&&estRefundDate!=''){              
        $scope.DispatchofSharesandRefundDate =estRefundDate.substring(0,4)+'/'+estRefundDate.substring(4,6)+'/'+estRefundDate.substring(6,8)+' '+estRefundDate.substring(8,10)+':'+estRefundDate.substring(10,12);
      }else{
        $scope.DispatchofSharesandRefundDate='';
      }

      var listingDate =ipodata.listingDate;
      if(listingDate!=null&&listingDate!=''){
        $scope.ListingDate =listingDate.substring(0,4)+'/'+listingDate.substring(4,6)+'/'+listingDate.substring(6,8)+' '+listingDate.substring(8,10)+':'+listingDate.substring(10,12);          
      }

      $scope.FinalOfferPrice='';
      $scope.ProspectusesEnglishURL=ipodata.propspectusURL;
      $scope.ProspectusesSimplifiedChineseURL=ipodata.tcPropspectusURL;
      $scope.ProspectusesTranditionalChineseURL=ipodata.scPropspectusURL;
      $scope.RemarkforExternal=ipodata.externalRemark;
      $scope.RemarkforInternal=ipodata.internalRemark;

      var subStatus =ipodata.subStatus;
      if(subStatus=='Y'){
        $scope.AcceptSubscription=true;
      }
      if(subStatus=='N'){
        $scope.AcceptSubscription=false;
      }         

      $scope.CommissionRate=(ipodata.commRate*100).toFixed(4);
      $scope.LevyRate=(ipodata.levyRate*100).toFixed(4);
      $scope.TradingFeeRate=(ipodata.tradeFeeRate*100).toFixed(4);
      $scope.InvestorCompensationLevyRate=(ipodata.icLevyRate*100).toFixed(4);
      
      if(ipodata.clientRebateRate!=null&&ipodata.clientRebateRate!=""){
        $scope.ClientRebateRate=(ipodata.clientRebateRate*100).toFixed(4);
      }else{
        $scope.ClientRebateRate='';
      }

      $scope.HandingFee=ipodata.handlingFee;
      $scope.FinancingHandingFee=ipodata.finHandlingFee;



      /*TABLE ONE*/
    //-------------------------------------------------------------------------
        //appQtyFrom:0
        //appQtyTo:1000
        //rangeId:"1"
        var appQtyAmtRangeArr = [],  tArray = [];    
        angular.forEach(ipodata.appQtyAmtRange, function(item) {      
          var appQtyAmtRange = {}, keycurr=item.rangeId ;
          if(tArray.indexOf(keycurr)== -1){
            appQtyAmtRange.key =item.appQtyFrom+'-'+item.appQtyTo;
            appQtyAmtRange.range =item.appQtyFrom+' < quantity <= '+item.appQtyTo;
            appQtyAmtRange.rangeId= item.rangeId;               
            appQtyAmtRangeArr.push(appQtyAmtRange);
            tArray.push(keycurr);
          }      
        });    
        
    //----------------------------------------------------------
        //appAmt:1717.2
        //appQty:1000
        //rangeId:"1"
        var appQtyAmtArr = [],tempArry = [];
        angular.forEach(ipodata.appQtyAmt, function(item) {
          var appQtyAmt = {},keycur=item.rangeId;
          if(tempArry.indexOf(keycur)== -1){
            appQtyAmt.del = true;      
            tempArry.push(keycur);
          }else{
            appQtyAmt.del = false;  
          }
          appQtyAmt.qty = item.appQty;
          appQtyAmt.amt = item.appAmt;
          appQtyAmt.rangeId = item.rangeId;
          appQtyAmtArr.push(appQtyAmt);          
        });
    //----------------------------------------------------------
    $scope.quantityAmountTable = [];
    angular.forEach(appQtyAmtArr, function(item) {
      var _rangeId =  item.rangeId;
      angular.forEach(appQtyAmtRangeArr, function(appbItem) {
        if(_rangeId === appbItem.rangeId){ 
          var o ={}  ,obj=[];             
          o.qty=item.qty;
          obj.qty=item.qty;
          o.amt=item.amt;
          obj.amt=item.amt;
          o.del=item.del;
          obj.del=item.del;
          o.key=appbItem.key;
          obj.key=appbItem.key;
          o.range=appbItem.range;
          obj.range=appbItem.range;
          var tempArr = $scope.tempObj[o.key];
          if(!$scope.tempObj[o.key]){
            tempArr=[];
            $scope.tempObj[o.key] = tempArr;
          }
          tempArr.push(obj);
          $scope.quantityAmountTable.push(o);
        }
      });
    });
        //-------------------------------------------------------------------      
        
        if(ipodata.calcMethod==1){
          $scope.CalculationMethod="RLSUA";
        }
        if(ipodata.calcMethod==2){
          $scope.CalculationMethod="RBIC";
        }
        if(ipodata.calcMethod==3){
          $scope.CalculationMethod="BOUCARLSUA";
        }
        if(ipodata.calcMethod==4){
          $scope.CalculationMethod="BOUCARBIC";
        }     
        
        if(ipodata.marginStatus=='Y'){
          $scope.showbelow=true;
        }
        if(ipodata.marginStatus=='N'){
          $scope.showbelow=false;
        }

        var marginStartTime =ipodata.marginStartTime;
        if(marginStartTime!=null&&marginStartTime!=''){
          $scope.FinancingStartDate =marginStartTime.substring(0,4)+'/'+marginStartTime.substring(4,6)+'/'+marginStartTime.substring(6,8);
          $scope.FinancingStartTime =marginStartTime.substring(8,10)+':'+marginStartTime.substring(10,12);
        }

        var marginCloseTime =ipodata.marginCloseTime;
        if(marginCloseTime!=null&&marginCloseTime!=''){
          $scope.FinancingEndDate =marginCloseTime.substring(0,4)+'/'+marginCloseTime.substring(4,6)+'/'+marginCloseTime.substring(6,8);
          $scope.FinancingEndTime =marginCloseTime.substring(8,10)+':'+marginCloseTime.substring(10,12);
        }

        $scope.InterestDay=ipodata.clientIntDay;
        $scope.MaxLoanAmountperApplication='';
        $scope.MinLoanAmountperApplication='';
        $scope.MinnoofsharespapliedforIPOLoan='';

        $scope.MaxLoanRatio=(ipodata.maxMarginRate*100).toFixed(2);       

        if(ipodata.useMaxMargin=='Y'){
          $scope.MustUseMaxLoan=true;
        }
        if(ipodata.useMaxMargin=='N'){
          $scope.MustUseMaxLoan=false;
        }

        if(ipodata.marginRateFilter!="")
        {
          var tempStr =ipodata.marginRateFilter;
          var tempStrArr = tempStr.split(',');
          var reStr='';
          angular.forEach(tempStrArr, function(item) {
              reStr =reStr+(item*100).toFixed(0)+',';
          })
          $scope.AllowedLoanRatioSelectedby=reStr.substring(0,reStr.length-1);
        }else{
            $scope.AllowedLoanRatioSelectedby=ipodata.marginRateFilter;
        }       
              
        $scope.BasicInterestRate=(ipodata.basicIntRate*100).toFixed(4);

        /*TABLE TWO*/
        $scope.specialInterestRateTable=[];
        var amtIntRateArr = [];
        angular.forEach(ipodata.amtIntRate, function(item) {
          var amtIntRate = {},obj=[];      
          amtIntRate.laabove = '> '+item.loanAmt;
          obj.laabove = '> '+item.loanAmt;
          amtIntRate.sirate = item.intRate;
          obj.sirate = item.intRate;
          amtIntRate.key =item.loanAmt+'-'+item.intRate;
          obj.key = item.loanAmt+'-'+item.intRate;            
          var tempArr = $scope.tabletempObj[amtIntRate.key];
          if(!$scope.tabletempObj[amtIntRate.key]){
            tempArr=[];
            $scope.tabletempObj[amtIntRate.key] = tempArr;
          }
          tempArr.push(obj);
          amtIntRateArr.push(amtIntRate);
          
        });
        $scope.specialInterestRateTable=amtIntRateArr;  
        
        $scope.Loadfromtemplates.model='';
        $scope.Saveastemplatewithname='';

        /*IPODetail Field*/             
        if(ipodata.allowCancelCash=='Y'){
          $scope.allowCancelCash=true;
        }
        if(ipodata.allowCancelCash=='N'){
          $scope.allowCancelCash=false;
        }

        if(ipodata.allowCancelMargin=='Y'){
          $scope.allowCancelMargin=true;
        }
        if(ipodata.allowCancelMargin=='N'){
          $scope.allowCancelMargin=false;
        }
        
        if(ipodata.requireHoldFundCash=='Y'){
          $scope.requireHoldFundCash=true;
        }
        if(ipodata.requireHoldFundCash=='N'){
          $scope.requireHoldFundCash=false;
        }
        
        if(ipodata.requireHoldFundMargin=='Y'){
          $scope.requireHoldFundMargin=true;
        }
        if(ipodata.requireHoldFundMargin=='N'){
          $scope.requireHoldFundMargin=false;
        }
        
        $scope.exRate=ipodata.exRate;
        $scope.ipoId=ipodata.ipoId;

        $scope.approveStatus=ipodata.approveStatus;
        $scope.approveTime=ipodata.approveTime;
        $scope.approveUserId=ipodata.approveUserId;
        $scope.createTime=ipodata.createTime;
        $scope.createUserId=ipodata.createUserId;
        $scope.exchangeId=ipodata.exchangeId;
        $scope.finalOfferPrice=ipodata.finalOfferPrice;
        $scope.interestCalcDay=ipodata.interestCalcDay;
        $scope.marginCutoff=ipodata.marginCutoff;
        $scope.offerCutoff=ipodata.offerCutoff;
        $scope.status=ipodata.status;
        $scope.subCutoff=ipodata.subCutoff;
        $scope.version=ipodata.version;

      } 


      $scope.createIPOgetSysSetting = function(){      
        $http({
          method: 'POST',
          //url:'/i/getSysSetting',
          url:sharedProperties.getBaseURL() + '/i/getSysSetting',        
        }).then(function successCallback(response) {
          console.log(response);
          if (response['data']['returnCode'] == SUCCESS) {
            //data.currencyMaster
            $scope.convertToCreateIPOList(response['data']);                   
          }
          else {          
          }
        }, function errorCallback(response) {          
          console.log('Error -->' + response);
        });
      }

      $scope.StockCurrency="";      
      $scope.StockCurrency = {model: "", getStockCurrency:[]};      
      $scope.convertToCreateIPOList = function(sysSetting){
        var tempData = sysSetting['currencyMaster'];

        angular.forEach(tempData, function(item) {
          $scope.StockCurrency.getStockCurrency.push(item.currency);          
        })      
        
        var tempDataY = sysSetting['systemParameter'];
        if(tempDataY[4]['value']=="Y"){
          $scope.requireHoldFundCash=true;
        }else if(tempDataY[4]['value']=="N"){
          $scope.requireHoldFundCash=false;
        }else{
          $scope.requireHoldFundCash='';
        }
        
        if(tempDataY[5]['value']=="Y"){
          $scope.requireHoldFundMargin=true;
        }else if(tempDataY[5]['value']=="N"){
          $scope.requireHoldFundMargin=false;
        }else{
          $scope.requireHoldFundMargin='';
        }
        
        if(tempDataY[6]['value']=="Y"){
          $scope.allowCancelCash=true;
        }else if(tempDataY[6]['value']=="N"){
          $scope.allowCancelCash=false;
        }else{
          $scope.allowCancelCash='';
        }
        
        if(tempDataY[7]['value']=="Y"){
          $scope.allowCancelMargin=true;
        }else if(tempDataY[7]['value']=="N"){
          $scope.allowCancelMargin=false;
        }else{
          $scope.allowCancelMargin='';
        }
        
      }   

      

      $scope.isModify = false;

      /*Submit*/
      $scope.createIPOsubmit = function(){
        var strURL='';
        if($scope.isModify){
          strURL='/i/modifyIPO';
        }else{
          strURL='/i/createIPO';
        }
        $http({
          method: 'POST',
        url:sharedProperties.getBaseURL() + strURL,
        data: getCreateIpoData("Submit") 
      }).then(function successCallback(response) {
        console.log(response);
        if (response['data']['returnCode'] == SUCCESS) {          
          $scope.vemode = false;
          sharedProperties.setEditMode(false);
        }
        else { 
            alert(response['data']['returnCode']);         
        }         
      }, function errorCallback(response) {
        console.log(response);
        console.log('Error -->' + response);
      });
    }

    /*SavaDraft*/
    $scope.createIPOsavaDraft = function(){
      var strURL='';
      if($scope.isModify){
        strURL='/i/modifyIPO';
      }else{
        strURL='/i/createIPO';
      }     
      $http({
        method: 'POST',
          url:sharedProperties.getBaseURL() + strURL,
          data:  getCreateIpoData("Save")      
        }).then(function successCallback(response) {
          console.log(response);
          if (response['data']['returnCode'] == SUCCESS) {          
            $scope.vemode = false;
            sharedProperties.setEditMode(false);
          }
          else {
            alert(response['data']['returnCode']);          
          } 
        }, function errorCallback(response) {
          console.log(response);
          console.log('Error -->' + response);
        });   
      }

      /*adminIPODetail*/
      $scope.createIPOadminIPODetail = function(){
        if(sharedProperties.isCreateIPO()){
              return ;
        }
       $http({
        method: 'POST',
          url:sharedProperties.getBaseURL() + '/i/adminIPODetail',
          data:  {"submit":"Submit","ipoIds":sharedProperties.getCurrentIPOId()}      
        }).then(function successCallback(response) {
              console.log(response);
              if (response.data.returnCode == SUCCESS) {          
                $scope.loadIPODetailData(response['data']['IPOs']['0']);
                $scope.isModify=true;
                var tempStatus =response['data']['IPOs']['0']['approveStatus'];
                if(tempStatus!='P'){                
                    $scope.vemode = false;
                    sharedProperties.setEditMode(false); 
                }else{
                    $scope.vemode = true;
                    sharedProperties.setEditMode(true);
                }                                   
              }
              else {
                alert(response['data']['returnCode']);
              } 
        }, function errorCallback(response) {          
          console.log(response);
          console.log('Error -->' + response);
        });   
      }

      /*Delete*/
      $scope.createIPOdelete = function(){     
       $http({
        method: 'POST',
          url:sharedProperties.getBaseURL() + '/i/deleteIPO',
          data:{"ipoId":$scope.ipoId,"version":$scope.version}       
        }).then(function successCallback(response) {
          console.log(response);
          if (response['data']['returnCode'] == SUCCESS) {         
            alert("delete-success");
          }else{
            alert(response['data']['returnCode']);
          }        
        }, function errorCallback(response) {
          //$scope.displayDefaultError();
          console.log(response);
          console.log('Error -->' + response);
        });   
      }

      /*Accept*/
      $scope.createIPOaccept = function(){     
       $http({
        method: 'POST',
          url:sharedProperties.getBaseURL() + '/i/ipoApproval',
          data:{"ipoId":$scope.ipoId,"version":$scope.version,"approvalStatus":"Y"}         
        }).then(function successCallback(response) {
          console.log(response);
          if (response['data']['returnCode'] == SUCCESS) {           
            alert("accept-success");
          }else{
            alert(response['data']['returnCode']);
          } 
        }, function errorCallback(response) {          
          console.log('Error -->' + response);
        });   
      }
      /*Reject*/
      $scope.createIPOreject = function(){     
       $http({
        method: 'POST',
          url:sharedProperties.getBaseURL() + '/i/ipoApproval',
          data:{"ipoId":$scope.ipoId,"version":$scope.version,"approvalStatus":"N"}         
        }).then(function successCallback(response) {
          console.log(response);
          if (response['data']['returnCode'] == SUCCESS) {           
            alert("reject-success");
          }else{
            alert(response['data']['returnCode']);
          } 
        }, function errorCallback(response) {          
          console.log(response);
          console.log('Error -->' + response);
        });   
      }


      /*Edit*/
      $scope.createIPOedit = function(){        
        $scope.vemode = true;
        sharedProperties.setEditMode(true);            
      }
      
      /*Back*/
      $scope.createIPOback = function(){     
        $location.path('/maintenance');    
      }

      

      /*Postpone*/
      $scope.createIPOpostpone = function(){     
       $http({
	        method: 'POST',
	        url:sharedProperties.getBaseURL() + '/i/postponeIPO',
	        data:{"ipoId":$scope.ipoId,"version":$scope.version}       
        }).then(function successCallback(response) {
        	console.log(response);
          if (response['data']['returnCode'] == SUCCESS) {           
            alert("postpone-success");
          }else{
            alert(response['data']['returnCode']);
          }          
        }, function errorCallback(response) {
       		console.log(response);         
          	console.log('Error -->');
        });   
      }

      /*Remuse*/
      $scope.createIPOresume = function(){     
       $http({
	        method: 'POST',
	        url:sharedProperties.getBaseURL() + '/i/resumeIPO',
	        data:{"ipoId":$scope.ipoId,"version":$scope.version}        
        }).then(function successCallback(response) {
        	console.log(response);          	
            if (response['data']['returnCode'] == SUCCESS) {           
            alert("resume-success");
          }else{
            alert(response['data']['returnCode']);
          }         
        }, function errorCallback(response) { 
        	console.log(response);         
          	console.log('Error -->');
        });   
      }






































	//....test value..
  /*$scope.StockCode=00008;
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
  $scope.OnlineIPOStartTime='08:00';*/
  //2017/12/20
  

  // Pie Chart Properties:

	//$scope.bgColors = ['#FAAAAA', '#FADB6B', '#ACD491', '#A4C2E6', '#f9b8f9', '#FF8C00',  '#c5fd9b', '#9370DB', '#ccfffc', '#CD853F'];
	//$scope.colors = ['#F34448', '#E87C3B', '#598439', '#4371B4', '#EB13EB', '#FF6347', '#68EB05', '#6A5ACD',  '#1FFFF0' , '#8B4513'];
	$scope.getDonutChart = function() {
		//var bgColors = ['#FFB6C1', '#FFD700', '#32CD32', '#1E90FF', '#f9b8f9', '#FF8C00',  '#c5fd9b', '#9370DB', '#ccfffc', '#CD853F'];
		//var colors = ['#FF4500', '#DAA520', '#006400', '#00008B', '#EB13EB', '#FF6347', '#68EB05', '#6A5ACD',  '#1FFFF0' , '#8B4513'];	
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
			var index = 0;
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
							finPool['index'] = index;
							index++;
							finPool['poolId'] = item['poolId'];
							finPool['poolName'] = item['poolName'];
							finPool['ipoId'] = item['ipoId'];
							finPool['ccy'] = item['ccy'];
							finPool['status'] = item['status'];														
							finPool['approveStatus'] = item['approveStatus'];
							finPool['approveUserId'] = item['approveUserId'];							
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

	$scope.editFinPool = function() {
		$location.path('/createFinPool'); 
	}

	
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

  /*HEIGHT*/
  function adjustLayoutHeight() {    
    var scrollbodyHeight =$(window).height() -260;//-265-38
    if (scrollbodyHeight > 0) {      
      $("#scrollbody").css('height', scrollbodyHeight);
    }else{
      $("#scrollbody").css('height', '500px');
    }    
  }

  //init
  $scope.init = function() {    
    adjustLayoutHeight();
    $scope.makerCheckerChange();
    $scope.viewEditChange();
    $scope.createIPOgetSysSetting();   
    $scope.sirTableLoadTemplateName();
    $scope.createIPOadminIPODetail();
    $scope.makerCheckerChange();
    $scope.viewEditChange();
	$scope.getAdminFinPoolBook();
  }   
  $scope.init();

  
}]);
