package main

import "time"

type League struct {
	Id        int       `json:"id"`
	Name      string    `json:"name"`
	ScoreTime time.Time `json:"score_time"`
	Status    string    `json:"status"`
}

type Leagues []League
