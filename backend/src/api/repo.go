package main

import "fmt"

var currentId int

var leagues Leagues
var userNgrams NGrams

// Give us some seed data
func init() {
	var ngrams1 NGrams
	var n1 = Ngram{Ngram: "Tennis", Score: 25}
	ngrams1 = append(ngrams1, n1)
	var n2 = Ngram{Ngram: "President Obama", Score: 44}
	ngrams1 = append(ngrams1, n2)

	RepoCreateLeague(League{Name: "Dec 12th League", Status: "OPEN", NGrams: ngrams1, PlayerCount: 2023})

	var ngrams2 NGrams
	var n12 = Ngram{Ngram: "Cricket", Score: 20}
	ngrams2 = append(ngrams2, n12)
	var n22 = Ngram{Ngram: "Trump", Score: 41}
	ngrams2 = append(ngrams2, n22)

	RepoCreateLeague(League{Name: "Dec 11th League", Status: "CLOSED", NGrams: ngrams2, PlayerCount: 2313})
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

//this is bad, I don't think it passes race condtions
func SetUserNgram(ngrams NGrams) NGrams {
	userNgrams = ngrams
	return ngrams
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
