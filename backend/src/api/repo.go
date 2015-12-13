package main

import "fmt"
import "time"

var currentId int

var leagues Leagues
var userNgrams NGrams

// Give us some seed data
func init() {

	var leaderBoard1 Players
	var ngrams1 NGrams
	ngrams1 = append(ngrams1, Ngram{Ngram: "Tennis", Score: 25})
	ngrams1 = append(ngrams1, Ngram{Ngram: "President Obama", Score: 44})
	ngrams1 = append(ngrams1, Ngram{Ngram: "Syria", Score: 64})
	ngrams1 = append(ngrams1, Ngram{Ngram: "France Soccer", Score: 22})
	ngrams1 = append(ngrams1, Ngram{Ngram: "Nadal", Score: 10})

	leaderBoard1 = append(leaderBoard1, Player{UserName: "happy_nyt", Rank: 1, Score: 991, UserId: 122})
	leaderBoard1 = append(leaderBoard1, Player{UserName: "coolbean", Rank: 2, Score: 889, UserId: 778})
	leaderBoard1 = append(leaderBoard1, Player{UserName: "newfreak", Rank: 3, Score: 881, UserId: 2212})
	leaderBoard1 = append(leaderBoard1, Player{UserName: "hackerofnews", Rank: 4, Score: 789, UserId: 11223})
	leaderBoard1 = append(leaderBoard1, Player{UserName: "newfreak", Rank: 5, Score: 600, UserId: 122})

  var time1, _ = time.Parse(time.RFC3339, "2015-12-12T06:00:00+00:00")
	RepoCreateLeague(League{Name: "Dec 12th League", ScoreTime: time1, Status: "OPEN", NGrams: ngrams1, PlayerCount: 2023, Score: 165, Rank: 20, Players: leaderBoard1})

	var leaderBoard2 Players
	var ngrams2 NGrams
	ngrams2 = append(ngrams2, Ngram{Ngram: "Cricket", Score: 20})
	ngrams2 = append(ngrams2, Ngram{Ngram: "Trump", Score: 41})
	ngrams2 = append(ngrams2, Ngram{Ngram: "Justin Beiber", Score: 21})
	ngrams2 = append(ngrams2, Ngram{Ngram: "Microsoft", Score: 2})
	ngrams2 = append(ngrams2, Ngram{Ngram: "Apple", Score: 20})

	leaderBoard2 = append(leaderBoard2, Player{UserName: "coolbean", Rank: 1, Score: 991, UserId: 122})
	leaderBoard2 = append(leaderBoard2, Player{UserName: "hotdude", Rank: 2, Score: 879, UserId: 378})
	leaderBoard2 = append(leaderBoard2, Player{UserName: "somehow", Rank: 3, Score: 778, UserId: 1233})
	leaderBoard2 = append(leaderBoard2, Player{UserName: "harcorenyt", Rank: 4, Score: 667, UserId: 123})
	leaderBoard2 = append(leaderBoard2, Player{UserName: "newfreak", Rank: 5, Score: 600, UserId: 122})

  var time2, _ = time.Parse(time.RFC3339, "2015-12-11T06:00:00+00:00")
	RepoCreateLeague(League{Name: "Dec 11th League", ScoreTime: time2, Status: "CLOSED", NGrams: ngrams2, PlayerCount: 4313, Score: 104, Rank: 65, Players: leaderBoard2})
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
