(function() {
    'use strict';

    // Fake data
    var league_details = {
        "id": 2,
        "name":"Dec 5th League",
        "status":"CLOSED",
        "score_time":"2015-12-06T06:00:00Z",
        "score":34,
        "rank": 61,
        "player_count": 2000,
        "ngrams" : [
            {
                "ngram": "President Speech",
                "score": 5
            },
            {
                "ngram": "Elections",
                "score": 7
            },
            {
                "ngram": "Tennis Games",
                "score": 12
            },
            {
                "ngram": "Giants",
                "score": 7
            },
            {
                "ngram": "France",
                "score": 3
            }
        ],
        "leader_board":[
            {
                "rank": 1,
                "user_name": "icemaker",
                "user_id": 59,
                "score": 85
            },
            {
                "rank": 2,
                "user_name": "icemaker",
                "user_id": 101,
                "score": 82
            }
        ]
    };
    
    // Angular setup
    var moduleNYT = angular.module('NYTFantasy', ['ui.bootstrap']);
    
    moduleNYT.controller('NYTFantasyController', NYTFantasyController);
    moduleNYT.controller('NYTFantasyViewController', NYTFantasyViewController);
    moduleNYT.factory('getUserLeagueDetailsService', getUserLeagueDetailsService);
    
    // Main controller
    function NYTFantasyController($scope) {
        // League options
        $scope.user_id = 1;
        $scope.league_id = 1;
        $scope.league_data = null;

        // View options
        $scope.currentView = 1;
        
        // Load the league details for user
        loadUserLeagueDetails($scope);
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

    // API Service Handlers
    function loadUserLeagueDetails($scope) {
        getUserLeagueDetailsService().service($scope.user_id, function(data) {
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
            service: function(user_id, callback) {
                callback(league_details);
            }
        };

        /*return function() {
            var url = '/data/scores';
            
            return $http.get(url).then(function(response) {
                return response.data;
            });
        }
        
        return [{"word":"Tom", "score":"150"}, {"word":"hope", "score":"30"}, {"word":"time", "score":"520"}];*/
    }
})();
