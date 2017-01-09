$(document).ready(function() {

	/*var h=0.07
       var n=h.toFixed(1);
     alert(n);*/
  
})

function checkerNum(str){
	if(str==null||str==""){
		return false;
	}
	var reg = new RegExp("^\d{n}$");       
    if(reg.test(str)){        
        return false;
    }
    return true ;
}

/*检验字段*/
function stockCodeFormat(str) {	 
	    var newval = padLeft(str, 5);   
		return newval;   
}

/*表格一*/
function quantityAmountTableAdd(){
	var methods=$('#CalculationMethod option:selected').val();
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

function rlsAmount(){
	var commissionRate = $('#CommissionRate').val();
	var levyRate = $('#LevyRate').val();
	var tradingFeeRate = $('#TradingFeeRate').val();
	var icLevyRate = $('#InvestorCompensationLevyRate').val();	
	var price = $('#OfferPriceRangeEnd').val();
	var quantityFrom = $('#QuantityFrom').val();
	var quantityTo = $('#QuantityTo').val();
	var interval = $('#Interval').val();
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
	 	item.range = quantityFrom+'<quantity <= '+quantityTo ;
	 	item.qty = qtyarry[i];
	 	item.amt = amount[i];
	 	item.del = (i== 0 ? true : false);
	 	obj[obj.length] = item;	 	
	}	
	return obj;
}

function rbiCharge(){
	var commissionRate = $('#CommissionRate').val();
	var levyRate = $('#LevyRate').val();
	var tradingFeeRate = $('#TradingFeeRate').val();
	var icLevyRate = $('#InvestorCompensationLevyRate').val();	
	var price = $('#OfferPriceRangeEnd').val();
	var quantityFrom = $('#QuantityFrom').val();
	var quantityTo = $('#QuantityTo').val();
	var interval = $('#Interval').val();
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
	 	item.range = quantityFrom+'<quantity <= '+quantityTo ;
	 	item.qty = qtyarry[i];
	 	item.amt = amount[i];
	 	item.del = (i== 0 ? true : false);
	 	obj[obj.length] = item;	 	
	}	
	return obj;
}

function bousarlsAmount(){
	var commissionRate = $('#CommissionRate').val();
	var levyRate = $('#LevyRate').val();
	var tradingFeeRate = $('#TradingFeeRate').val();
	var icLevyRate = $('#InvestorCompensationLevyRate').val();	
	var price = $('#OfferPriceRangeEnd').val();
	var quantityFrom = $('#QuantityFrom').val();
	var quantityTo = $('#QuantityTo').val();
	var interval = $('#Interval').val();
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
	 	item.range = quantityFrom+'<quantity <= '+quantityTo ;
	 	item.qty = qtyarry[i];
	 	item.amt = amount[i];
	 	item.del = (i== 0 ? true : false);
	 	obj[obj.length] = item;	 	
	}	
	return obj;
}

function boucarbiCharge(){
	var commissionRate = $('#CommissionRate').val();
	var levyRate = $('#LevyRate').val();
	var tradingFeeRate = $('#TradingFeeRate').val();
	var icLevyRate = $('#InvestorCompensationLevyRate').val();	
	var price = $('#OfferPriceRangeEnd').val();
	var quantityFrom = $('#QuantityFrom').val();
	var quantityTo = $('#QuantityTo').val();
	var interval = $('#Interval').val();
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
	 	item.range = quantityFrom+'<quantity <= '+quantityTo ;
	 	item.qty = qtyarry[i];
	 	item.amt = amount[i];
	 	item.del = (i== 0 ? true : false);
	 	obj[obj.length] = item;	 	
	}	
	return obj;
}

/*表格二*/

function specialInterestRateTableAdd(){

}


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

