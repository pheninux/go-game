package main

import (
	"encoding/json"
	"goGame/pkg/model"
	"goGame/pkg/responsesBody"
	"io/ioutil"
	"net/http"
)

/***
save login as object
fp = found player
p = player
r = reslut of player after save
*/
func (app *application) savePlayer(w http.ResponseWriter, r *http.Request) {

	// parse r body as byte and then to player object

	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		app.serverError(w, err)
	}
	p := model.Player{}
	if err := json.Unmarshal(b, &p); err != nil {
		app.serverError(w, err)
	}

	if err == nil {
		p := model.Player{}
		if err := json.Unmarshal(b, &p); err == nil {
			fp, err := app.dbModel.GetPlayerByLogin(p)
			if err == nil && fp.Login != "" {
				var pmap model.PlayerDto2
				if app.comparePasswords(fp.Pwd, []byte(p.Pwd)) {
					pmap = model.PlayerDto2{Id: fp.ID, Login: fp.Login, Lvl: fp.Lvl}
					rsb := responsesBody.ResponseBodySavePlayer{pmap, ""}
					json.NewEncoder(w).Encode(rsb)
				} else {
					pmap = model.PlayerDto2{Id: p.ID, Login: p.Login, Lvl: p.Lvl}
					rsb := responsesBody.ResponseBodySavePlayer{pmap, "PassWord incorrect"}
					json.NewEncoder(w).Encode(rsb)
				}
			} else {
				/*** hash password ***/
				hashedPass := app.hashAndSalt([]byte(p.Pwd))
				p.Pwd = hashedPass

				r, err := app.dbModel.SavePlayer(p)
				if err == nil {
					rsb := responsesBody.ResponseBodySavePlayer{r, ""}
					if err := json.NewEncoder(w).Encode(&rsb); err != nil {
						app.serverError(w, err)
					}
				} else {
					app.serverError(w, err)
				}
			}
		} else {
			app.serverError(w, err)
		}
	} else {
		app.serverError(w, err)
	}

}

/***
update player as object
*/
func (app *application) updatePlayer(w http.ResponseWriter, r *http.Request) {

	// parse r body as byte and then to player object
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		app.serverError(w, err)
	}
	p := model.Player{}
	if err := json.Unmarshal(b, &p); err != nil {
		app.serverError(w, err)
	} else if err = app.dbModel.UpdatePlayer(p); err != nil {
		app.serverError(w, err)
	}
}

/***
get players high level
*/

func (app *application) players(w http.ResponseWriter, r *http.Request) {

	p, err := app.dbModel.Players()
	if err == nil {
		if err := json.NewEncoder(w).Encode(&p); err != nil {
			app.serverError(w, err)
		}
	} else {
		app.serverError(w, err)
	}
}
