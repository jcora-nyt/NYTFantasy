
package main

//Set GoPath to any place you want to keep GO libraries
// e.g. export GOPATH=/Users/204714/Documents/ideaProjects/NYTFantasy/golib
//go get github.com/go-sql-driver/mysql
//in intellij add go libraries

import "fmt"
import "log"

import (
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
)

func main() {

  db, err := sql.Open("mysql",
  "root:root@tcp(127.0.0.1:3306)/NYTFantasy")
  if err != nil {
    log.Fatal(err)
  }

  var (
    user_id int
    email string
  )
  rows, err := db.Query("select user_id, email from user where user_id = ?", 1)
  if err != nil {
    log.Fatal(err)
  }
  defer rows.Close()
  for rows.Next() {
    err := rows.Scan(&user_id, &email)
    if err != nil {
      log.Fatal(err)
    }
    log.Println(user_id, email)
  }
  err = rows.Err()
  if err != nil {
    log.Fatal(err)
  }

  defer db.Close()
 //fmt.Printf("Hello, world\n")
}
