package models

import "github.com/jinzhu/gorm"

type Player struct {
	//Id        uint       `gorm:"primary_key,auto_increment" json:"id"`
	gorm.Model
	Login string `gorm:"type:varchar(25)" json:"login"`
	Lvl   int    `gorm:"type:int(11)" json:"lvl"`
	Score int    `gorm:"type:int(11)" json:"score"`
}
