package main

import (
    "fmt"
		"log"
    "github.com/pocketbase/pocketbase"
)

func main() {
		fmt.Println("Hello, playground")
    app := pocketbase.New()

    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}