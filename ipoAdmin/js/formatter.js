function moneyFormatter(n) {
	return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function priceFormatter(n) {
	return n.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function numFormatter(n) {
	//with thousands separators
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function padLeft(str, length) {
	if(str==null||str==""){
		return str;
	}
	var pattern=/\d/;
    if(!pattern.test(str)){
    	return "";
    }
    if(str.toString().length >= length) {
      return str; 
  }
  else {
      return padLeft("0" + str, length);
  }
}

function formatAmount(n) {
       if (n != null && n != "undefined") {	   
	   var length = String(n).length;
	   var result = "";
           if (length >= 4 && length < 7) {
			result = (Math.floor(n/100)/10);
			if (result.toString().indexOf('.') < 0) {
            result += ".0";
           }
			return result + "K";
           }
           else if (length >= 7 && length < 10) {
		   result = (Math.floor(n/100000)/10);
		   if (result.toString().indexOf('.') < 0) {
            result += ".0";
           }
			return result + "M";
           }
		   else if (length >= 10 && length < 13) {
		   result = (Math.floor(n/100000000)/10);
		   if (result.toString().indexOf('.') < 0) {
            result += ".0";
           }
            return result + "B";
           }
		   else if (length >= 13) {
		   result = (Math.floor(n/100000000000)/10);
		   if (result.toString().indexOf('.') < 0) {
            result += ".0";
           }
            return result + "T";
           }
		   else {
            return numFormatter(n);
           }
       }
       return "";
    }

function formatNumber(n, dp) {
       if (n != null && n != "undefined") {
           if (dp > 0 && n.indexOf('.') < 0) {
            n += ".0";
           }
           if (dp > 0) {
            try {               
				var part = n.toString().split(".");							
				part[0] = part[0] + "." + part[1].substring(0, 1);
				n = part[0];				
            }
            catch (e) {
            }
           }
           var parts=n.toString().split(".");
           return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (dp > 0 ? "." + parts[1] : "");
       }
       return "";
    }

/*Quantity Amount Table */
/*table one*/
function addQuantityAmountTableRange(){
    var quantityFrom =$('#QuantityFrom').val();
    var quantityTo =$('#QuantityTo').val();
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
        var item = {};
        item.key = quantityFrom+'-'+quantityTo ;
        item.range = quantityFrom+'< quantity <= '+quantityTo ;
        item.qty = qtyarry[i];
        item.amt = '';
        item.del = (i== 0 ? true : false);
        obj[obj.length] = item;     
    }
    return obj;
} 

/*Field calibration*/
/*fill*/
function stockCodeFormat(str) {	
    var newval = padLeft(str, 5);
    return newval;   
}
/*Digital input limit of digits*/
function onlyNumber(value,sName,event) {
	var dotPos = ( sName || '' ).length;  
    var keyCode = event.which;
    //space is not allowed
    if (keyCode == 32) {
        event.returnValue = false;
        event.preventDefault();
        return;   
    }
    //control char is ok
    if (keyCode < 48) {
        event.returnValue = true;        
        return;   
    }
    //letter is not not allowed
    if (keyCode > 57 && keyCode < 96){ 
        event.returnValue = false;
        event.preventDefault();
        return;   
    }
    if (keyCode > 105 && keyCode != 110 && keyCode != 190){ 
        event.returnValue = false;
        event.preventDefault();
        return;   
    }          
    //more '.' is not allowed
    if (keyCode == 110 || keyCode == 190){
        event.returnValue = false;
        event.preventDefault();
        return;   
    }
    if (dotPos >= value) {    	
        event.returnValue =false;
        event.preventDefault();          
        return ;   
    }   
    event.returnValue =true;
    
}
/*Enter the number of characters to limit*/
function numberofchar(value,sName,event){
  var keyCode = event.which;
  var dotPos = ( sName || '' ).length;
     //control char is ok
     if (keyCode < 48) {
        event.returnValue = true;
        return;   
    }    
    if (dotPos > value) {    	
        event.returnValue =false;
        event.preventDefault();          
        return ;   
    }         
    event.returnValue =true;  
}
/*The character bit limit is used for blur()*/
function digitsofchar(value,sName){
  var dotPos = ( sName || '' ).length;
  if(dotPos <= value){
     return sName;
 }
 if (dotPos > value) {    	
     sName = sName.substring(0,value);   
     return sName;   
 }    
}
/*Enter the number of digits to be used for blur()*/
function digitsofnum(value,sName){
  var dotPos = (( sName || '' ) + '').length;
  var pattern=/\d/;
  if(!pattern.test(sName)){
   return "";
} 
if(dotPos <= value){
 return sName;
}
if (dotPos > value) {    	
 sName = sName.substring(0,value);   
 return sName;   
}     
}
/*Digital limits*/
function digitlimt(sName){
    var pattern=/\d/;
    if(!pattern.test(sName)){
        sName ='';
        return sName ;
    }
    return sName;
}

/*Enter the number of digits with a decimal point*/
function decimallimit(inte,deci,sName,id,event){ 	
 sName = sName || ''; 		
 		/*var reg = /^(([1-9]\d{0,9}\.\d{0,2})|([0]\.\d{0,2})|([1-9]\d{0,9}))$/;
 		if(sName.length>0){
       	if(!reg.test(sName)){
       	event.preventDefault();
    	return ;
    }}*/	
    var keyCode = event.which;
        //space is not allowed
        if (keyCode == 32) {
        	event.returnValue = false;
           event.preventDefault();
           return;
       }
        //control char is ok
        if (keyCode < 48) {
            event.returnValue = true;        
            return;
        }
        //letter is not not allowed
        if (keyCode > 57 && keyCode < 96){
          event.returnValue = false;
          event.preventDefault();
          return;
      }
      if (keyCode > 105 && keyCode != 110 && keyCode != 190){
          event.returnValue = false;
          event.preventDefault();
          return;
      }  
      var ranagePos = document.getElementById(id);
      var startPos = ranagePos.selectionStart;
      var endPos = ranagePos.selectionEnd;

      var curVal = sName;
      var dotPos = curVal.indexOf(".");
            //more '.' is not allowed
            if (dotPos >= 0) {
                if ((keyCode == 110 || keyCode == 190) && (dotPos > endPos || dotPos < startPos)) {
                    event.returnValue = false;
                    event.preventDefault();
                    return;
                }
            }
            var plusData = "";
            var digitData = "";
            if (dotPos < 0) {
                plusData = curVal;
                dotPos = curVal.length;
            } else {
                plusData = curVal.substring(0, dotPos);
                digitData = curVal.substring(dotPos + 1, curVal.length);
            }
            if (endPos <= dotPos) {
                if (endPos == startPos) {
                    if (plusData.length >= inte) {
                        //alert("Plus length is excceed:"+inte);
                        if (keyCode == 110 || keyCode == 190) {
                            event.returnValue = true;
                            return ;
                        }
                        event.returnValue = false;
                        event.preventDefault();
                        return;
                    } else {
                        event.returnValue = true;
                        return ;
                    }
                } else {
                    event.returnValue = true;
                    return ;
                }
            } else if (startPos > dotPos) {
                if (endPos == startPos) {
                    if (digitData.length >= deci) {
                        //alert("digitData length is excceed:"+deci);
                        if (keyCode == 110 || keyCode == 190) {
                            event.returnValue = true;
                            return ;
                        }
                        event.returnValue = false;
                        event.preventDefault();
                        return;
                    } else {
                        event.returnValue = true;
                        return ;
                    }
                } else {
                    event.returnValue = true;
                    return ;
                }
            }
            event.returnValue = true;
            return ;
        }


        /*Permissions*/
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


