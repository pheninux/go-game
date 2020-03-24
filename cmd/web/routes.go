package main

import (
	rice "github.com/GeertJohan/go.rice"
	"github.com/bmizerany/pat"
	"github.com/justinas/alice"
	"github.com/rs/cors"
	"net/http"
)

func (app *application) routes() http.Handler {
	// Create a middleware chain containing our 'standard' middleware
	// which will be used for every request our application receives.
	standardMiddleware := alice.New(app.recoverPanic, app.logRequest, secureHeaders)

	mux := pat.New()
	mux.Post("/save/player", http.HandlerFunc(app.savePlayer))
	mux.Post("/update/player", http.HandlerFunc(app.updatePlayer))
	mux.Get("/players", http.HandlerFunc(app.players))
	fileServer := http.FileServer(rice.MustFindBox("./ui-web").HTTPBox())
	mux.Get("/x/", http.StripPrefix("/x", fileServer))
	handler := cors.AllowAll().Handler(mux)
	return standardMiddleware.Then(handler)
}
