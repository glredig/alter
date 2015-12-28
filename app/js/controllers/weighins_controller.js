app.controller('WeighinsController', function($scope) {
	$scope.weights = [188, 189, 190, 187];

	$scope.addWeight = function(weight) {
		if (weight === '') {
			return
		}
		$scope.weights.push(weight);

		$scope.weight = '';
	};

	$scope.deleteWeight = function(weight) {
		var loc = $scope.weights.indexOf(weight);
		console.log('click', loc);
		
		if (loc > -1) {
			$scope.weights.splice(loc, 1);
		}
	}
});