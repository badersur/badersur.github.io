var app = angular.module('NearMeApp', ['leaflet-directive', 'ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'NearMeController',
			templateUrl: 'views/near.html'
		})
		.when('/about', {
			controller: 'AboutController',
			templateUrl: 'views/about.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});