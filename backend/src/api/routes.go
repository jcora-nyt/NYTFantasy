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

	/*
		Route{
			"Index",
			"GET",
			"/",
			Index,
		},*/

	Route{
		"LeagueIndex",
		"GET",
		"/NYTF/user/{userId}/league",
		LeagueIndex,
	},
	Route{
		"LeagueCreate",
		"POST",
		"/NYTF/user/{userId}/league/{leagueId}",
		LeagueCreate,
	},
	Route{
		"LeagueShow",
		"GET",
		"/NYTF/user/{userId}/league/{leagueId}",
		LeagueShow,
	},
}
