angular.module('ipoAdminApp.createIPOController', [])

.controller('createIPOCtrl', [ '$scope', '$rootScope', '$sce', '$http', '$interval', '$translate','$location', 'sharedProperties', 'redirectService', 'applicationStatusService', 'timelineService', function($scope, $rootScope, $sce, $http, $interval, $translate,$location, sharedProperties, redirectService, applicationStatusService, timelineService) {

	$scope.getCurrentDate = function(value){
		return getCurrentDate().substring(0, 4) +"/"+ getCurrentDate().substring(4, 6) +"/"+ getCurrentDate().substring(6);
	}

	$scope.getCurrentDateTime = function(value){
		return getCurrentDateTime(value).substring(8,10) +":"+ getCurrentDateTime().substring(10,12);
	}	

	$scope.theTime = new Date().toLocaleTimeString();

	$interval(function () {
		$scope.theTime = new Date().toLocaleTimeString();
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
	/*datepicker end*/

	/*Access Control*/    
    $scope.machker = false;//maker:false     checker:true

  $scope.vemode = false;// view:false     edit:true

  $scope.showbelow = true;//Check box Checked if IPO financing is allowed;Unchecked if IPO financing is not allowed.

  /*Edit*/
  $scope.createIPOedit = function(){     
    $scope.machker = false;
    $scope.vemode = true;    
  }
  
  /*Back*/
  $scope.createIPOback = function(){     
    $location.path('/maintenance');    
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

   $scope.IPOCode = "IPO20160513000000001";

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
    }

    $scope.removeqatableAll = function(value) {    	
    	$scope.quantityAmountTable = [];
    }
    $scope.delsingelqat = function(qat) {  
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
    	if($scope.StockCurrency &&($scope.StockCurrency!=null && $scope.StockCurrency!='')){
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
    	if($scope.StockCurrency && ( $scope.StockCurrency!=null && $scope.StockCurrency!='' )) {
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
    	if($scope.CurrencyofHandingFee && ( $scope.CurrencyofHandingFee!=null && $scope.CurrencyofHandingFee!='' )) {
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

    $scope.basictotal = 18;
    $scope.feetotal = 7;
    $scope.quantitytotal = 5;
    $scope.financingtotal = 11;
    $scope.totalMandatorField = 41;

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
    	$scope.totalFieldProgress =Math.floor((tof/41)*100) ;
    }, 500);


    $('#scrollbody').scrollspy({ target: '#navbar-example' })


    /*submit data*/ 
    function getCreateIpoData(){ 
    $scope.createIpoData ={};
    $scope.createIpoData.StockCode =$scope.StockCode||"";
    $scope.createIpoData.IPOCode=$scope.IPOCode||"";
    $scope.createIpoData.EnglishStockName=$scope.EnglishStockName||"";
    $scope.createIpoData.TranditionalChineseName=$scope.TranditionalChineseName||"";
    $scope.createIpoData.SimplifiedChineseName=$scope.SimplifiedChineseName||"";
    $scope.createIpoData.NumberofOfferSharesUnitunderGlobalOffering=$scope.NumberofOfferSharesUnitunderGlobalOffering||"";
    $scope.createIpoData.NumberofPublicOfferSharesUnit=$scope.NumberofPublicOfferSharesUnit||"";
    $scope.createIpoData.StockCurrency=$scope.StockCurrency||"";
    $scope.createIpoData.OfferPriceRangeStart=$scope.OfferPriceRangeStart||"";
    $scope.createIpoData.OfferPriceRangeEnd=$scope.OfferPriceRangeEnd||"";
    $scope.createIpoData.BroadLot=$scope.BroadLot||"";
    $scope.createIpoData.NominalValue=$scope.NominalValue||"";
    $scope.createIpoData.OnlineIPOStartDate=$scope.OnlineIPOStartDate||"";
    $scope.createIpoData.OnlineIPOStartTime=$scope.OnlineIPOStartTime||"";
    $scope.createIpoData.OnlineIPOEndDate=$scope.OnlineIPOEndDate||"";
    $scope.createIpoData.OnlineIPOEndTime=$scope.OnlineIPOEndTime||"";
    $scope.createIpoData.IPOClosingDate=$scope.IPOClosingDate||"";
    $scope.createIpoData.IPOClosingTime=$scope.IPOClosingTime||"";
    $scope.createIpoData.PriceFixingDate=$scope.PriceFixingDate||"";
    $scope.createIpoData.ResultAnnouncementDate=$scope.ResultAnnouncementDate||"";
    $scope.createIpoData.DispatchofSharesandRefundDate=$scope.DispatchofSharesandRefundDate||"";
    $scope.createIpoData.ListingDate=$scope.ListingDate||"";
    $scope.createIpoData.FinalOfferPrice=$scope.FinalOfferPrice||"";
    $scope.createIpoData.ProspectusesEnglishURL=$scope.ProspectusesEnglishURL||"";
    $scope.createIpoData.ProspectusesSimplifiedChineseURL=$scope.ProspectusesSimplifiedChineseURL||"";
    $scope.createIpoData.ProspectusesTranditionalChineseURL=$scope.ProspectusesTranditionalChineseURL||"";
    $scope.createIpoData.RemarkforExternal=$scope.RemarkforExternal||"";
    $scope.createIpoData.RemarkforInternal=$scope.RemarkforInternal||"";
    $scope.createIpoData.AcceptSubscription=$scope.AcceptSubscription||"";
    $scope.createIpoData.CommissionRate=$scope.CommissionRate||"";
    $scope.createIpoData.LevyRate=$scope.LevyRate||"";
    $scope.createIpoData.TradingFeeRate=$scope.TradingFeeRate||"";
    $scope.createIpoData.InvestorCompensationLevyRate=$scope.InvestorCompensationLevyRate||"";
    $scope.createIpoData.ClientRebateRate=$scope.ClientRebateRate||"";
    $scope.createIpoData.CurrencyofHandingFee=$scope.CurrencyofHandingFee||"";
    $scope.createIpoData.FinancingHandingFee=$scope.FinancingHandingFee||"";

    $scope.createIpoData.quantityAmountTable=$scope.quantityAmountTable||"";
    $scope.createIpoData.CalculationMethod=$scope.CalculationMethod||"";
    $scope.createIpoData.QuantityFrom=$scope.QuantityFrom||"";
    $scope.createIpoData.QuantityTo=$scope.QuantityTo||"";
    $scope.createIpoData.interval=$scope.interval||"";
    $scope.createIpoData.ProvideIPOfinancing=$scope.ProvideIPOfinancing||"";
    $scope.createIpoData.FinancingStartDate=$scope.FinancingStartDate||"";
    $scope.createIpoData.FinancingStartTime=$scope.FinancingStartTime||"";
    $scope.createIpoData.FinancingEndDate=$scope.FinancingEndDate||"";
    $scope.createIpoData.FinancingEndTime=$scope.FinancingEndTime||"";
    $scope.createIpoData.InterestDay=$scope.InterestDay||"";
    $scope.createIpoData.MaxLoanAmountperApplication=$scope.MaxLoanAmountperApplication||"";
    $scope.createIpoData.MinLoanAmountperApplication=$scope.MinLoanAmountperApplication||"";
    $scope.createIpoData.MinnoofsharespapliedforIPOLoan=$scope.MinnoofsharespapliedforIPOLoan||"";
    $scope.createIpoData.MaxLoanRatio=$scope.MaxLoanRatio||"";
    $scope.createIpoData.MustUseMaxLoan=$scope.MustUseMaxLoan||"";
    $scope.createIpoData.AllowedLoanRatioSelectedby=$scope.AllowedLoanRatioSelectedby||"";
    $scope.createIpoData.BasicInterestRate=$scope.BasicInterestRate||"";
    $scope.createIpoData.specialInterestRateTable=$scope.specialInterestRateTable||"";
    $scope.createIpoData.Loadfromtemplates=$scope.Loadfromtemplates||"";
    $scope.createIpoData.LoadAmountAbove=$scope.LoadAmountAbove||"";
    $scope.createIpoData.SpecicalInterestRate=$scope.SpecicalInterestRate||"";
    return $scope.createIpoData;
    }


    $scope.createIPOsubmit = function(){    	
    	$http({
    		method: 'POST',
    		url:'/i/createIPO',
    		//sharedProperties.getBaseURL() + '/i/createIPO',
    		data: getCreateIpoData() 
    		//{clientId createipo?data}
    	}).then(function successCallback(response) {
    		console.log('success -->' +response);
       	 	alert("success");
    	}, function errorCallback(response) {
    		//$scope.displayDefaultError();
    		console.log('Error -->' + response);
    	});
    }





























	//....test value..
	/*$scope.OfferPriceRangeStart= 1.0;
	$scope.OfferPriceRangeEnd = 1.7;
	$scope.CommissionRate = 1;
	$scope.LevyRate = 0.005;
	$scope.TradingFeeRate = 0.002;
	$scope.InvestorCompensationLevyRate = 0.005;
	$scope.QuantityFrom = 0;
	$scope.QuantityTo = 5000;
	$scope.Interval = 1000;*/

	//  $scope.ProspectusesEnglishURL ;

	/*$scope.LoadAmountAbove = 10000;
	$scope.SpecicalInterestRate =2000;*/

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

	
}]);
