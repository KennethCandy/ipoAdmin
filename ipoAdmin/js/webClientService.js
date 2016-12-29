function sendUpdateDataToWeb(data) {
	var $body = angular.element(document.body);  
	var $rootScope = $body.scope().$root;    
	$rootScope.$apply(function () {
		var items = data.split(';');
		for (var item of items) {
			eval('$rootScope.' + item);
		}
	});
}
