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

/*Quantity Amount Table */
/*表格一*/
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

/*字段校验*/
/*填充*/
function stockCodeFormat(str) {	
    var newval = padLeft(str, 5);
    return newval;   
}
/*数字输入位数限制*/
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
/*输入字符位数限制*/
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
/*字符位数限制用于blur*/
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
/*输入数字位数限制用于blur*/
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
/*数字限制*/
function digitlimt(sName){
    var pattern=/\d/;
    if(!pattern.test(sName)){
        sName ='';
        return sName ;
    }
    return sName;
}

/*输入带小数点的位数限制*/
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


