var app = angular.module('beer-controllers', []);

app.controller('BeerListController', function($http, $scope) {
	$scope.completeBeerList;
	$http.get('/getCompleteBeerList').then(function(response) {
		$scope.completeBeerList = response.data.data;
		console.log($scope.completeBeerList[0]);
	});
	

	this.getSpecificBeerList = function($http, $scope, queries) {
		var request = { "queries": 
			{

			}
		}
		$http.get('/getSpecificBeerList', request).then(function(response) {

		})
	}
	


});