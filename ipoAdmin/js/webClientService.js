function sendUpdateDataToWeb(data) {
	var $body = angular.element(document.body);  
	var $rootScope = $body.scope().$root;    
	$rootScope.$apply(function () {
		var obj = JSON.parse(data);
		angular.forEach(obj, function(value, key) {
			if (typeof(value) == "string") {
				eval('$rootScope.' + key + '="' + value + '"');
			}
			else {
				eval('$rootScope.' + key + '=' + value);
			}
		})		
	});
}
