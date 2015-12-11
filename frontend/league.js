(function() {
    'use strict';

    // Angular setup
    var moduleNYT = angular.module('NYTFantasy', ['ui.bootstrap']);

    moduleNYT.controller('NYTFantasyController', NYTFantasyController);
    moduleNYT.controller('NYTFantasyViewController', NYTFantasyViewController);
    moduleNYT.factory('serviceUserLeagueDetails', getUserLeagueDetailsService);
    
    // Main controller
    function NYTFantasyController($scope) {
    }
    
    // View controller
    function NYTFantasyViewController($scope, serviceUserLeagueDetails) {
        // League options
        $scope.user_id = 1;
        $scope.league_id = 2;
        $scope.league_data = null;

        // View options
        $scope.currentView = 1; // (start with view 1)

        // API settings
        $scope.serviceUserLeagueDetails = serviceUserLeagueDetails;

        // Load the league details for user
        loadUserLeagueDetails($scope);

        // Menu handler
        $scope.updateView = function(view_pos) {
            $scope.currentView = view_pos;
        };
        
        // View visibility handler
        $scope.showView = function(view_pos) {
            return $scope.currentView === view_pos;
        };
    }

    // API Service Handlers
    function loadUserLeagueDetails($scope) {
        $scope.serviceUserLeagueDetails.service($scope.user_id, $scope.league_id, function(data) {
            // Store the n-gram results
            $scope.league_data = data;
            $scope.league_data.ngrams = data.ngrams;

            angular.forEach($scope.league_data.ngrams, function(ngram) {
                if (ngram.score > 10) {
                    ngram.rank = 'success';
                } else if (ngram.score > 5 && ngram.score <= 10) {
                    ngram.rank = 'info';
                } else {
                    ngram.rank = 'danger';
                }
            });
        });
    }

    // API Services
    function getUserLeagueDetailsService($http) {
        return {
            service: function(user_id, league_id, callback) {
                var urlAPI = '/NYTF/user/' + user_id + '/league/' + league_id;

                $http.get(urlAPI).then(function(response) {
                    callback(response.data);
                });
            }
        };
    }
})();
