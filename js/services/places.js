app.factory('places', ['$http', function ($http) {
	// 22.5276646,59.4724502
	//https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=5000&gscoord=40.741934%7C-74.004897&gslimit=250&format=json&callback=JSON_CALLBACK')
    return $http.jsonp
	('https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=23.5913332|58.1722105&gslimit=500&format=json&callback=JSON_CALLBACK')
	.success(function (data) {
        return data;
    })
	.error(function (err) {
			return err;
	});
	
}]);