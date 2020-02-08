package mysql

import "github.com/pheninux/go-game/pkg/models"

func (db *DataModel) SavePlayer(p models.Player) error {
	return db.Db.Debug().Create(p).Error

}
