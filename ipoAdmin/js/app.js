angular.module('ipoAdminApp', ['ng', 'ngRoute', 'ui.router', 'ipoAdminApp.maintenanceController', 'ipoAdminApp.createIPOController', 'ipoAdminApp.service' ])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	
	.state('maintenance', {
		url: '/maintenance',
		templateUrl: 'maintenance.html',
		controller: 'maintenanceCtrl'
	})

	.state('createIPO', {
		url: '/createIPO',
		templateUrl: 'createIPO.html',
		controller: 'createIPOCtrl'
	})  ;
		
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/maintenance');

	//$resourceProvider.defaults.stripTrailingSlashes = false;
})
;
