package main

import (
	"encoding/json"
	"github.com/pheninux/go-game/pkg/models"
	"io/ioutil"
	"net/http"
)

/***
save login as object
*/
func (app *application) saveLogin(w http.ResponseWriter, r *http.Request) {

	// parse r body as byte and then to player object
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		app.serverError(w, err)
	}
	p := models.Player{}
	if err := json.Unmarshal(b, &p); err != nil {
		app.serverError(w, err)
	}

	if err = app.dbModel.SavePlayer(p); err != nil {
		app.serverError(w, err)
	}
}
