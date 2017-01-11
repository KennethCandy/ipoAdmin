angular.module('ipoAdminApp.createIPOController', [])

.controller('createIPOCtrl', [ '$scope', '$rootScope', '$sce', '$http', '$interval', '$translate', 'sharedProperties', 'redirectService', 'applicationStatusService', 'timelineService', function($scope, $rootScope, $sce, $http, $interval, $translate, sharedProperties, redirectService, applicationStatusService, timelineService) {

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

    /*权限控制*/    
    $scope.machker = false;//maker:false     checker:true

    $scope.vemode = true;// view:false     edit:true

   $scope.showbelow = true;//Check box Checked if IPO financing is allowed;Unchecked if IPO financing is not allowed.


    /*权限*/
	function showAccRej(machker,vemode){
		return machker & vemode;
	}

	function showBack(machker,vemode){
		return !(machker ^ vemode);
	}

	function showEdit(machker,vemode){
		return (!machker) & (!vemode);
	}

	function showSSDPR(machker,vemode){
		return (machker ^ vemode)&vemode;
	}

	function disableFields(machker,vemode){
		return !((machker ^ vemode)&vemode);
	}
    
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
  

  
 	/*字段校验format*/ 	
 	$scope.stockCodeFormat = function(value) {
 		$scope.StockCode = stockCodeFormat(value);		 
    	return stockCodeFormat(value);
	}

	$scope.onlyNumber = function(sName){
		return onlyNumber(sName);
	}

	$scope.numberofdigits = function(value,sName){
		return numberofdigits(value,sName);
	}

	$scope.digits = function(sName){
		$scope.EnglishStockName = digits(sName);
	}

	/*Quantity Amount Table */
	/*表格一*/	
	function rlsAmount(){
		var commissionRate =$scope.CommissionRate;
		var levyRate = $scope.LevyRate;
		var tradingFeeRate = $scope.TradingFeeRate ;
		var icLevyRate =$scope.InvestorCompensationLevyRate ;	
		var price = $scope.OfferPriceRangeEnd;
		var quantityFrom =$scope.QuantityFrom;
		var quantityTo =$scope.QuantityTo;
		var interval = $scope.Interval;
		var qtyarrysumtemp = (quantityTo - quantityFrom)/interval;
		var qtyarrysum = Math.ceil(qtyarrysumtemp);
		var obj = [];
		var qtyarry = new Array(qtyarrysum);

		for(var i=0;i<qtyarry.length-1;i++){
		 	qtyarry[i] = parseInt(quantityFrom, 10) + interval*(i+1);	 	
		}
		qtyarry[qtyarrysum-1] = quantityTo;
		var amount = new Array(qtyarrysum);

		for(var i=0;i<amount.length;i++){
		 	amount[i] = ((price * qtyarry[i])*(1 + commissionRate/100 + levyRate/100 + icLevyRate/100 + tradingFeeRate/100)).toFixed(2);	 	
		 	var item = {};
		 	item.key = quantityFrom+'-'+quantityTo ;
		 	item.range = quantityFrom+'< quantity <= '+quantityTo ;
		 	item.qty = qtyarry[i];
		 	item.amt = amount[i];
		 	item.del = (i== 0 ? true : false);
		 	obj[obj.length] = item;	 	
		}
		return obj;
	}

	function rbiCharge(){
		var commissionRate = $scope.CommissionRate;
		var levyRate = $scope.LevyRate ;
		var tradingFeeRate = $scope.TradingFeeRate;
		var icLevyRate = $scope.InvestorCompensationLevyRate;	
		var price = $scope.OfferPriceRangeEnd;
		var quantityFrom =$scope.QuantityFrom ;
		var quantityTo =$scope.QuantityTo;
		var interval = $scope.Interval;
		var qtyarrysumtemp = (quantityTo - quantityFrom)/interval;
		var qtyarrysum = Math.ceil(qtyarrysumtemp);
		var obj = [];
		var qtyarry = new Array(qtyarrysum);

		for(var i=0;i<qtyarry.length-1;i++){
		 	qtyarry[i] = parseInt(quantityFrom, 10) + interval*(i+1);	 	
		}
		qtyarry[qtyarrysum-1] = quantityTo;
		var amount = new Array(qtyarrysum);

		for(var i=0;i<amount.length;i++){
		 	amount[i] = (parseFloat((price * qtyarry[i]).toFixed(2))
		 	+ parseFloat(((price * qtyarry[i])*commissionRate/100).toFixed(2))
		 	+ parseFloat(((price * qtyarry[i])*levyRate/100).toFixed(2))
		 	+ parseFloat(((price * qtyarry[i])*icLevyRate/100).toFixed(2))
		 	+ parseFloat(((price * qtyarry[i])*tradingFeeRate/100).toFixed(2))).toFixed(2);
		 	var item = {};
		 	item.key = quantityFrom+'-'+quantityTo ;
		 	item.range = quantityFrom+'< quantity <= '+quantityTo ;
		 	item.qty = qtyarry[i];
		 	item.amt = amount[i];
		 	item.del = (i== 0 ? true : false);
		 	obj[obj.length] = item;	 	
		}	
		return obj;
	}
	
	function bousarlsAmount(){
		var commissionRate =$scope.CommissionRate;
		var levyRate = $scope.LevyRate;
		var tradingFeeRate =$scope.TradingFeeRate ;
		var icLevyRate = $scope.InvestorCompensationLevyRate;	
		var price =$scope.OfferPriceRangeEnd;
		var quantityFrom = $scope.QuantityFrom;
		var quantityTo = $scope.QuantityTo ;
		var interval =$scope.Interval;
		var qtyarrysumtemp = (quantityTo - quantityFrom)/interval;
		var qtyarrysum = Math.ceil(qtyarrysumtemp);
		var obj = [];
		var qtyarry = new Array(qtyarrysum);

		for(var i=0;i<qtyarry.length-1;i++){
		 	qtyarry[i] = parseInt(quantityFrom, 10) + interval*(i+1);	 	
		}
		qtyarry[qtyarrysum-1] = quantityTo;
		var amount = new Array(qtyarrysum);

		for(var i=0;i<amount.length;i++){
		 	amount[i] =qtyarry[i]/1000 * ((price *1000)*(1 + commissionRate/100 + levyRate/100 + icLevyRate/100 + tradingFeeRate/100)).toFixed(2);
		 	var item = {};
		 	item.key = quantityFrom+'-'+quantityTo ;
		 	item.range = quantityFrom+'< quantity <= '+quantityTo ;
		 	item.qty = qtyarry[i];
		 	item.amt = amount[i];
		 	item.del = (i== 0 ? true : false);
		 	obj[obj.length] = item;	 	
		}	
		return obj;
	}

	function boucarbiCharge(){
		var commissionRate = $scope.CommissionRate ;
		var levyRate =$scope.LevyRate;
		var tradingFeeRate =$scope.TradingFeeRate;
		var icLevyRate = $scope.InvestorCompensationLevyRate;	
		var price = $scope.OfferPriceRangeEnd;
		var quantityFrom =$scope.QuantityFrom;
		var quantityTo =$scope.QuantityTo;
		var interval = $scope.Interval;
		var qtyarrysumtemp = (quantityTo - quantityFrom)/interval;
		var qtyarrysum = Math.ceil(qtyarrysumtemp);
		var obj = [];
		var qtyarry = new Array(qtyarrysum);

		for(var i=0;i<qtyarry.length-1;i++){
		 	qtyarry[i] = parseInt(quantityFrom, 10) + interval*(i+1);	 	
		}
		qtyarry[qtyarrysum-1] = quantityTo;
		var amount = new Array(qtyarrysum);

		for(var i=0;i<amount.length;i++){
		 	amount[i] =qtyarry[i]/1000 * (parseFloat((price * 1000).toFixed(2))
		 	+ parseFloat(((price * 1000)*commissionRate/100).toFixed(2))
		 	+ parseFloat(((price * 1000)*levyRate/100).toFixed(2))
		 	+ parseFloat(((price * 1000)*icLevyRate/100).toFixed(2))
		 	+ parseFloat(((price * 1000)*tradingFeeRate/100).toFixed(2))).toFixed(2);
		 	var item = {};
		 	item.key = quantityFrom+'-'+quantityTo ;
		 	item.range = quantityFrom+'< quantity <= '+quantityTo ;
		 	item.qty = qtyarry[i];
		 	item.amt = amount[i];
		 	item.del = (i== 0 ? true : false);
		 	obj[obj.length] = item;	 	
		}	
		return obj;
	}

	$scope.CalculationMethod = "RLSUA";
	function quantityAmountTableAdd(){	
		var methods=$scope.CalculationMethod;		
		if(methods == "RLSUA" ){
			return rlsAmount();
		}else if(methods == ("RBIC" )){
			return rbiCharge();
		}
		else if(methods == ("BOUCARLSUA" )){
			return bousarlsAmount();
		}
		else if(methods == ("BOUCARBIC" )){
			return boucarbiCharge();
		}
	}
	
	$scope.quantityAmountTable = [];
	$scope.tempObj = {};
	$scope.methodTemp ="";		
	$scope.quantityAmountTableAdd = function() {    	
    	var newTable = quantityAmountTableAdd();
    	if($scope.methodTemp!=$scope.CalculationMethod){
			$scope.tempObj = {};
    	} 
    	var _key = newTable[0].key;    	
        $scope.tempObj[_key] = newTable;    	
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
    	$scope.methodTemp = $scope.CalculationMethod;
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
	/*表格二*/	
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
		$scope.specialInterestRateTable = {};
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






	














	

	//....test value..
	/*$scope.OfferPriceRangeEnd = 1.7;
	$scope.CommissionRate = 1;
	$scope.LevyRate = 0.005;
	$scope.TradingFeeRate = 0.002;
	$scope.InvestorCompensationLevyRate = 0.005;
	$scope.QuantityFrom = 0;
	$scope.QuantityTo = 5000;
	$scope.Interval = 1000;*/

	/*$scope.LoadAmountAbove = 10000;
	$scope.SpecicalInterestRate =2000;*/
   
	
}]);
