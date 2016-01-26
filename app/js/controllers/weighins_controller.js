app.controller('WeighinsController', function($scope) {
	$scope.weights = [
		{ date: 1,
		  weight: 188
		}, 
		{ date: 2,
		  weight: 190
		}, 
		{ date: 3,
		  weight: 187.4
		}, 
		{ date: 4, 
		  weight: 186.4
		}
		];

	$scope.addWeight = function(weight) {
		if (weight === '') {
			return
		}
		$scope.weights.push({date: $scope.weights.length + 1, weight: parseFloat(weight)});

		console.log($scope.weights);	
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