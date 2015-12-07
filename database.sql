drop database if exists nyt_fantasy;
create database nyt_fantasy;

use nyt_fantasy;

drop table if exists user;
CREATE TABLE user (
  user_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50),
  last_upd_ts TIMESTAMP
);

drop table if exists ngram;
CREATE TABLE ngram (
  ngram_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ngram VARCHAR(50),
  last_upd_ts TIMESTAMP
);

drop table if exists league;
CREATE TABLE league (
  league_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  league_name VARCHAR(50),
  last_upd_ts TIMESTAMP
);

drop table if exists user_ngram;
CREATE TABLE user_ngram (
  user_ngram_id INT(6)  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT(6) NOT NULL REFERENCES user(user_id),
  league_id INT(6) NOT NULL REFERENCES league(league_id),
  ngram_id INT(6) NOT NULL REFERENCES ngram(ngram_id),
  score INT(6) NOT NULL,
  last_upd_ts TIMESTAMP
);

#sample data
insert into user (user_id,email) values (1,"alex.khordos@nytimes.com"), (2,"ilia.rogov@nytimes.com"),(3,"naveed.ahmad@nytimes.com"), (4,"joseph.cora@nytimes.com"),(5,"hirak.chattopadhyay@nytimes.com");
insert into ngram (ngram_id,ngram) values (1,"mets"), (2,"trump"),(3,"syria"), (4,"halloween"),(5,"golang");
insert into league(league_id, league_name) values(1,"October 30, 2015");
insert into user_ngram(user_id, league_id, ngram_id, score) values(1,1,1,30),(2,1,1,50),(3,1,1,40),(4,1,1,60),(5,1,1,70),(6,1,1,80);

