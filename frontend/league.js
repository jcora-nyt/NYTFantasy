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
        $scope.league_date = 'Today';
        $scope.league_id = 2;
        $scope.league_data = null;

        // View options
        $scope.currentView = 1; // (start with view 1)

        // Setup API services
        $scope.serviceUserLeagueDetails = serviceUserLeagueDetails;

        // Setup API service handlers
        $scope.loadUserLeagueDetails = function(league_date) {
            var league_id;

            switch (league_date) {
                case 'Today':
                    league_id = 1;

                    break;
                case 'Yesterday':
                    league_id = 2;

                    break;
            }

            // Set the league date
            $scope.league_date = league_date;

            $scope.serviceUserLeagueDetails.service($scope.user_id, league_id, function(data) {
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
        };

        // Menu handler
        $scope.updateView = function(view_pos) {
            $scope.currentView = view_pos;
        };
        
        // View visibility handler
        $scope.showView = function(view_pos) {
            return $scope.currentView === view_pos;
        };

        // Initialize view //

        // Load the league details for user
        $scope.loadUserLeagueDetails($scope.league_date);
    }

    /*function loadUserLeagueDetailsHandler($scope) {
    }*/

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
