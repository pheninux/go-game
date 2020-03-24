package mysql

import "goGame/pkg/models"

func (db *DataModel) SavePlayer(p models.Player) (models.Player, error) {

	err := db.Db.Debug().Create(&p).Error
	return p, err
}

func (db *DataModel) UpdatePlayer(p models.Player) error {
	return db.Db.Debug().Model(&p).Update(&p).Error

}

func (db *DataModel) Players() ([]models.LightPlayer, error) {
	var p []models.LightPlayer
	err := db.Db.Debug().Table("players").Select("login , lvl").Order("lvl desc").Limit(3).Scan(&p).Error
	return p, err
}

/***
get player by login
*/
func (db *DataModel) GetPlayerByLogin(p models.Player) (fp models.Player, err error) {

	return fp, db.Db.Debug().Find(&fp, "login = ?", &p.Login).Error

}
