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
	if(str.toString().length >= length) {
		return str; 
	}
	else {
		return padLeft("0" + str, length);
	}
}


/*检验字段*/
function stockCodeFormat(str) {	
   	var newval = padLeft(str, 5);
	return newval;   
}

function onlyNumber(sName) {
	var dotPos = ( sName || '' ).length;  
    var keyCode = event.which;
    //space is not allowed
    if (keyCode == 32) {
        event.returnValue = false;
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
        return;   
    }
    if (keyCode > 105 && keyCode != 110 && keyCode != 190){ 
        event.returnValue = false;
        return;   
    }          
    //more '.' is not allowed
    if (keyCode == 110 || keyCode == 190){
        event.returnValue = false;
        return;   
 	}
 	if (dotPos > 4) {    	
        event.returnValue =false;          
        return ;   
    }              
 	event.returnValue =true;
			 
 }

 function numberofdigits(value,sName){
 	var keyCode = event.which;
    var dotPos = ( sName || '' ).length;
     //control char is ok
    if (keyCode < 48) {
        event.returnValue = true;
        return;   
    }    
    if (dotPos > value) {    	
        event.returnValue =false;          
        return ;   
    }         
    event.returnValue =true;  
 }

 function digits(sName){
 	var dotPos = ( sName || '' ).length;
 	if(dotPos <= 35){
 		return sName;
 	}
 	if (dotPos > 35) {    	
       sName = sName.substring(0,35);   
        return sName;   
    }    
 }

