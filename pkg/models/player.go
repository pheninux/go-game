package models

import "github.com/jinzhu/gorm"

type Player struct {
	//Id        uint       `gorm:"primary_key,auto_increment" json:"id"`
	gorm.Model
	Login string `gorm:"type:varchar(25)" json:"login"`
	Lvl   int    `gorm:"type:int(11)" json:"lvl"`
	Score int    `gorm:"type:int(11)" json:"score"`
	Pwd   string `gorm:"type:varchar(100)" json:"pwd"`
}

type PlayerDto1 struct {
	Login string `json:"login"`
	Lvl   int    `json:"lvl"`
}

type PlayerDto2 struct {
	Id    uint   `json:"id"`
	Login string `json:"login"`
	Lvl   int    `json:"lvl"`
}
