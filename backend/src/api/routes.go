package main

import "net/http"

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},
	Route{
		"LeagueIndex",
		"GET",
		"/NYTF/user/{userId}/league",
		LeagueIndex,
	},
	Route{
		"LeagueCreate",
		"POST",
		"/todos",
		LeagueCreate,
	},
	Route{
		"LeagueShow",
		"GET",
		"/leagues/{leagueId}",
		LeagueShow,
	},
}
