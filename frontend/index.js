(function() {
	'use strict';
	
	var moduleNYT = angular.module('NYTFantasy', ['ui.bootstrap']);
	
	moduleNYT.controller('NYTFantasyController', NYTFantasyController);
	moduleNYT.service('wordEndpoint', wordEndpoint);
	
	function NYTFantasyController($scope) {
		// Main controller
		$scope.todaysWords = wordEndpoint();
		
		angular.forEach($scope.todaysWords, function(word) {
			if (word.score > 500) {
				word.rank = 'success';
			} else if (word.score > 100 && word.score <= 500) {
				word.rank = 'info';
			} else {
				word.rank = 'danger';
			}
		});
	}
	
	function wordEndpoint($http) {
		/*return function() {
			var url = '/data/scores';
			
			return $http.get(url).then(function(response) {
				return response.data;
			});
		}*/
		
		return [{"word":"Tom", "score":"150"}, {"word":"hope", "score":"30"}, {"word":"time", "score":"520"}];
	}
})();
