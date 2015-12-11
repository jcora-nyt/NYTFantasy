(function() {
	'use strict';
	
	// Angular setup
	var moduleNYT = angular.module('NYTFantasy', ['ui.bootstrap']);
	
	moduleNYT.controller('NYTFantasyController', NYTFantasyController);
	moduleNYT.controller('NYTFantasyViewController', NYTFantasyViewController);
	moduleNYT.service('wordEndpoint', wordEndpoint);
	
	// Main controller
	function NYTFantasyController($scope) {
		// Displayed view
		$scope.currentView = 0;
		
		// Load today's words
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
	
	// View controller
	function NYTFantasyViewController($scope) {
		// Displayed view (start with view 1)
		$scope.currentView = 1;
		
		// Menu handler
		$scope.updateView = function(view_pos) {
			$scope.currentView = view_pos;
		};
		
		// View visibility handler
		$scope.showView = function(view_pos) {
			return $scope.currentView === view_pos;
		};
	}
	
	// Word API Handler
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
