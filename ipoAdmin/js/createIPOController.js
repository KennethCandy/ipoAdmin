angular.module('ipoAdminApp.createIPOController', [])

.controller('createIPOCtrl', [ '$scope', '$rootScope', '$sce', '$http', '$interval', '$translate', 'sharedProperties', 'redirectService', 'applicationStatusService', 'timelineService', function($scope, $rootScope, $sce, $http, $interval, $translate, sharedProperties, redirectService, applicationStatusService, timelineService) {

	$scope.getCurrentDate = function(value){
		return getCurrentDate().substring(0, 4) +"/"+ getCurrentDate().substring(4, 6) +"/"+ getCurrentDate().substring(6);
	}

	$scope.getCurrentDateTime = function(value){
		return getCurrentDateTime(value).substring(8,10) +":"+ getCurrentDateTime().substring(10,12);
	}

	$scope.getTime = function(value){
		return getTime(value);
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
    $scope.machkerf = false;
    $scope.machkert = true;
  
 	/*字段校验*/
 	function padLeft(str, lenght) {
    if (str.length >= lenght)
        return str;
    else
        return padLeft("0" + str, lenght);
	}
 	$scope.padLeft = function(str, lenght) {
    if (str.length >= lenght)
        return str;
    else
        return padLeft("0" + str, lenght);
	}




   
	
}]);
