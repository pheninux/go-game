package dataBase

import "goGame/pkg/model"

func (db *DataModel) SavePlayer(p model.Player) (model.PlayerDto2, error) {
	var dto model.PlayerDto2
	err := db.Db.Debug().Create(&p).Scan(&dto).Error
	return dto, err
}

func (db *DataModel) UpdatePlayer(p model.Player) error {
	return db.Db.Debug().Model(&p).Update(&p).Error

}

func (db *DataModel) Players() ([]model.PlayerDto1, error) {
	var p []model.PlayerDto1
	err := db.Db.Debug().Table("players").Select("login , lvl").Order("lvl desc").Limit(3).Scan(&p).Error
	return p, err
}

func (db *DataModel) GetPlayerByLogin(p model.Player) (fp model.Player, err error) {

	return fp, db.Db.Debug().Find(&fp, "login = ?", &p.Login).Error

}
