$(document).ready(function() {

     //alert(methods);
  
})

/*function validate(){
       var reg = new RegExp("^[0-9]*$");
       var obj = document.getElementById("name");
    if(!reg.test(obj.value)){
        alert("请输入数字!");
    }
    if(!/^[0-9]*$/.test(obj.value)){
        alert("请输入数字!");
    }*/

/*检验字段*/
function stockCodeFormat(str) {
    var newval = padLeft(str, 5);   
	return newval;
}

/*表单一*/


function rqAmountAdd(){
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
	 	amount[i] = Math.round(price * qtyarry[i]) 
	 	+ Math.round((price * qtyarry[i])*commissionRate/100)
	 	+ Math.round((price * qtyarry[i])*levyRate/100) 
	 	+ Math.round((price * qtyarry[i])*icLevyRate/100)
	 	+ Math.round((price * qtyarry[i])*tradingFeeRate/100);
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
	 	amount[i] =qtyarry[i]/1000 * Math.round((price *1000)*(1 + commissionRate/100 + levyRate/100 + icLevyRate/100 + tradingFeeRate/100));
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
	 	amount[i] =qtyarry[i]/1000 * Math.round(price * 1000) 
	 	+ Math.round((price * 1000)*commissionRate/100)
	 	+ Math.round((price * 1000)*levyRate/100) 
	 	+ Math.round((price * 1000)*icLevyRate/100)
	 	+ Math.round((price * 1000)*tradingFeeRate/100);
	 	var item = {};
	 	item.range = quantityFrom+'<quantity <= '+quantityTo ;
	 	item.qty = qtyarry[i];
	 	item.amt = amount[i];
	 	item.del = (i== 0 ? true : false);
	 	obj[obj.length] = item;	 	
	}	
	return obj;
}