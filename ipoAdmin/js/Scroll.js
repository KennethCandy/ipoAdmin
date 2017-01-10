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








