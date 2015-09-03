app.controller('NearMeController', ['$scope', 'places', function ($scope, places) {
	$scope.mapCenter = {
		// lat: 40.741934,
		// lng: -74.004897,
		lat: 23.5913332,
		lng: 58.1722105,
		zoom: 13
	};

	places.success(function (data) {
		$scope.geodata = data;
		$scope.mapMarkers = geodataToMarkers($scope.geodata);
	});

}]);