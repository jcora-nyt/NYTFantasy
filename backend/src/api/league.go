package main

import "time"

type Player struct {
	UserName string `json:"user_name"`
	Rank     int    `json:"rank"`
	UserId   int    `json:"user_id"`
	Score    int    `json:"score"`
}
type Players []Player

type Ngram struct {
	Ngram string `json:"ngram"`
	Score int    `json:"score"`
}

type NGrams []Ngram

type League struct {
	Id          int       `json:"id"`
	Name        string    `json:"name"`
	ScoreTime   time.Time `json:"score_time"`
	Status      string    `json:"status"`
	Score       int       `json:"score"`
	Rank        int       `json:"rank"`
	PlayerCount int       `json:"player_count"`
	NGrams      NGrams    `json:"ngrams"`
	Players     Players   `json:"leader_board"`
}

type Leagues []League
