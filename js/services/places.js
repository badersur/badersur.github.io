app.factory('places', ['$http', function ($http) {
	return $http.jsonp
		('https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=23.5913332|58.1722105&gslimit=500&format=json&callback=JSON_CALLBACK')
		.success(function (data) {
			return data;
		})
		.error(function (err) {
			return err;
		});

}]);