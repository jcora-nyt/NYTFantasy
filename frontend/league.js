(function() {
    'use strict';

    // Angular setup
    var moduleNYT = angular.module('NYTFantasy', ['ui.bootstrap']);

    moduleNYT.controller('NYTFantasyController', NYTFantasyController);
    moduleNYT.controller('NYTFantasyViewController', NYTFantasyViewController);
    moduleNYT.factory('serviceUserLeagues', getUserLeaguesService);
    moduleNYT.factory('serviceUserLeagueDetails', getUserLeagueDetailsService);

    // Main controller
    function NYTFantasyController($scope) {
    }

    // View controller
    function NYTFantasyViewController($scope, $filter, serviceUserLeagues, serviceUserLeagueDetails) {
        // League options
        $scope.user_id = 1;
        $scope.league_date = 'Today';
        $scope.league_id = 2;
        $scope.league_data = null;

        // View options
        $scope.currentView = 1; // Start with view 1 (scores / leaderboard)
        $scope.sortLeagueField = '-score'; // Start with league table sorting by score
        $scope.sortLeaderboardField = 'rank'; // Start with leaderboard table sorting by rank

        // League date options
        $scope.dateLeague = {};
        $scope.dateLeague.viewDate = new Date();
        $scope.dateLeague.isPickerOpen = false;

        // Setup API services
        $scope.serviceUserLeagues = serviceUserLeagues;
        $scope.serviceUserLeagueDetails = serviceUserLeagueDetails;

        // Setup API service handlers
        $scope.loadUserLeagues = function() {
            $scope.serviceUserLeagues.service($scope.user_id, function(data) {
                // Sort the leagues by date and store
                $scope.leagues = {};

                var leagues = $filter('orderBy')(data, '-score_time');

                // Process leagues to make them date referenceable and set min and max date
                if (leagues.length > 0) {
                    // Set the max and min date for the date picker
                    $scope.dateLeague.maxDate = new Date(leagues[0].score_time);
                    $scope.dateLeague.minDate = new Date(leagues[leagues.length - 1].score_time);

                    // Set leagues to be date referenceable
                    angular.forEach(leagues, function(league) {
                        $scope.leagues[new Date(league.score_time).toDateString()] = league;
                    });
                }
            });
        };

        $scope.loadUserLeagueDetails = function(league_date) {
            var league_id;

            switch (league_date) {
                case 'Today':
                    league_id = 1;

                    break;
                case 'Yesterday':
                    league_id = 2;

                    break;
                case 'Custom':
                    // Select league picked from date picker
                    league_id = $scope.leagues[$scope.dateLeague.viewDate.toDateString()].id;

                    break;
            }

            // Set the league date
            $scope.league_date = league_date;

            $scope.serviceUserLeagueDetails.service($scope.user_id, league_id, function(data) {
                // Store the n-gram results
                $scope.league_data = data;

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

        // Date picker visibility handler
        $scope.toggleDatePicker = function() {
            $scope.dateLeague.isPickerOpen = !$scope.dateLeague.isPickerOpen;
        }

        // Table Sort Handlers
        $scope.sortLeague = function(sortField) {
          $scope.sortLeagueField = sortField;
        }

        $scope.sortLeaderboard = function(sortField) {
          $scope.sortLeaderboardField = sortField;
        }

        // Initialize view //

        // Load the leagues for user
        $scope.loadUserLeagues();

        // Load the league details for user
        $scope.loadUserLeagueDetails($scope.league_date);
    }

    // API Services
    function getUserLeaguesService($http) {
        return {
            service: function(user_id, callback) {
                var urlAPI = '/NYTF/user/' + user_id + '/league/';

                $http.get(urlAPI).then(function(response) {
                    callback(response.data);
                });
            }
        };
    }

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
