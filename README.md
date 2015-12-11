# NYTFantasy
===========

Guess the most frequent n-gram on the news!

NYT Fantasy Services

## Routes
---

##### Get List of all Leagues
GET /NYTF/user/UserId/league

Returns a list of all leagues. ID's and date, status CLOSED/OPEN. 

Response
```
[
  {
    "id": 3,
    "name":"Dec 6th League",
    "status":"OPEN",
    "score_time":"2015-12-07T06:00:00Z"
  },
  {
    "id": 2,
    "name":"Dec 5th League",
    "status":"CLOSED",
    "score_time":"2015-12-06T06:00:00Z"
  },
  {
    "id": 1,
    "name":"Dec 4th League",
    "status":"CLOSED",
    "score_time":"2015-12-05T06:00:00Z"
  }
]
```

##### Get League Details

GET /NYTF/user/UserId/league/LeagueID

Returns the detail of a particular league in context of a user, list of ngrams and scores populated for each ngram if league is closed. This will also contain the leaderboard for that league.

Response
```
{
  "id": 2,
  "name":"Dec 5th League",
  "status":"CLOSED",
  "score_time":"2015-12-06T06:00:00Z",
  "score":34, 
  "rank": 61,
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
}
```

##### Update League Ngrams
POST /NYTD/user/UserId/league/LeagueID

Request payload will have upto 5 ngrams for a given user. If ngram exist in db they will be deleted and reinserted.

```
[
    {
      "ngram": "Obama"
    },
    {
      "ngram": "Democrats"
    },
    {
      "ngram": "Football"
    },
    {
      "ngram": "Giants"
    },
    {
      "ngram": "Spain"
    }
]
```





