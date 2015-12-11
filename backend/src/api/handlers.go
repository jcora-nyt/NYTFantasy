package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
)

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Welcome!\n")
}

func LeagueIndex(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	var userId int
	var err error
	if userId, err = strconv.Atoi(vars["userId"]); err != nil {
		panic(err)
	}
	log.Print(userId)

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(leagues); err != nil {
		panic(err)
	}
}

func LeagueShow(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var leagueId int
	var err error
	if leagueId, err = strconv.Atoi(vars["leagueId"]); err != nil {
		panic(err)
	}
	league := RepoFindLeague(leagueId)
	if league.Id > 0 {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(league); err != nil {
			panic(err)
		}
		return
	}

	// If we didn't find it, 404
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusNotFound)
	//League find why jsonErr is a problem
	//if err := json.NewEncoder(w).Encode(jsonErr{Code: http.StatusNotFound, Text: "Not Found"}); err != nil {
	//	panic(err)
	//}

}

/*
Test with this curl command:
curl -H "Content-Type: application/json" -d '{"name":"New League"}' http://localhost:8080/leagues
*/
func LeagueCreate(w http.ResponseWriter, r *http.Request) {
	var league League
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err != nil {
		panic(err)
	}
	if err := r.Body.Close(); err != nil {
		panic(err)
	}
	if err := json.Unmarshal(body, &league); err != nil {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(422) // unprocessable entity
		if err := json.NewEncoder(w).Encode(err); err != nil {
			panic(err)
		}
	}

	t := RepoCreateLeague(league)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(t); err != nil {
		panic(err)
	}
}
