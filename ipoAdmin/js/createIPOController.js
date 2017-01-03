angular.module('ipoAdminApp.createIPOController', [])

.controller('createIPOCtrl', [ '$scope', '$rootScope', '$sce', '$http', '$translate', 'sharedProperties', 'redirectService', 'applicationStatusService', 'timelineService', function($scope, $rootScope, $sce, $http, $translate, sharedProperties, redirectService, applicationStatusService, timelineService) {
	
	$scope.getCurrentDate = function(value){
		return getCurrentDate().substring(0, 4) +"/"+ getCurrentDate().substring(4, 6) +"/"+ getCurrentDate().substring(6);
	}

	$scope.getCurrentDateTime = function(value){
		return getCurrentDateTime(value).substring(8,10) +":"+ getCurrentDateTime().substring(10,12);
	}

	$scope.getTime = function(value){
		return getTime(value);
	}
	
	
	
}]);
