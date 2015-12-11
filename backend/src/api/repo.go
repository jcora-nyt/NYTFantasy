package main

import "fmt"

var currentId int

var leagues Leagues

// Give us some seed data
func init() {
	RepoCreateLeague(League{Name: "Dec 12th League", Status: "OPEN"})
	RepoCreateLeague(League{Name: "Dec 11th League", Status: "CLOSED"})
}

func RepoFindLeague(id int) League {
	for _, t := range leagues {
		if t.Id == id {
			return t
		}
	}
	// return empty League if not found
	return League{}
}

//this is bad, I don't think it passes race condtions
func RepoCreateLeague(t League) League {
	currentId += 1
	t.Id = currentId
	leagues = append(leagues, t)
	return t
}

func RepoDestroyLeague(id int) error {
	for i, t := range leagues {
		if t.Id == id {
			leagues = append(leagues[:i], leagues[i+1:]...)
			return nil
		}
	}
	return fmt.Errorf("Could not find League with id of %d to delete", id)
}
