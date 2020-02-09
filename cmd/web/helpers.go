package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"runtime/debug"
	"strings"
	"unicode/utf8"
)

// The serverError helper writes an error message and stack trace to the errorLog,
// then sends a generic 500 Internal Server Error response to the user.
func (app *application) serverError(w http.ResponseWriter, err error) {
	trace := fmt.Sprintf("%s\n%s", err.Error(), debug.Stack())
	app.errorLog.Output(2, trace)
	http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
}

// The clientError helper sends a specific status code and corresponding description
// to the user. We'll use this later in the book to send responses like 400 "Bad
// Request" when there's a problem with the request that the user sent.
func (app *application) clientError(w http.ResponseWriter, status int) {
	http.Error(w, http.StatusText(status), status)
}

// For consistency, we'll also implement a notFound helper. This is simply a
// convenience wrapper around clientError which sends a 404 Not Found response to
// the user.
func (app *application) notFound(w http.ResponseWriter) {
	app.clientError(w, http.StatusNotFound)
}

func (app *application) BodyParser(r *http.Request) []byte {
	body, _ := ioutil.ReadAll(r.Body)
	return body
}

func (app *application) ToJson(w http.ResponseWriter, data interface{}, statusCode int) {
	w.Header().Set("Content-type", "application/json; charset=UTF8")
	w.WriteHeader(statusCode)
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		app.serverError(w, err)
	}

}
func (app *application) validateForm(r *http.Request) map[string]string {
	errors := make(map[string]string)

	name := r.PostForm.Get("nom")
	prenom := r.PostForm.Get("prenom")

	if strings.TrimSpace(name) == "" {
		errors["name"] = "le nom ne dois pas être vide"
	}
	if strings.TrimSpace(prenom) == "" {
		errors["prenom"] = "le prenom ne dois pas être vide"
	} else if utf8.RuneCountInString(prenom) > 10 {
		errors["prenom"] = "le prenom depasse le nombre de caractaires authorisé (max 10)"
	}

	return errors
}
