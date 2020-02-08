package models

import "time"

type Player struct {
	Id        int       `gorm:"primary_key,auto_increment" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	Login     string    `gorm:"type:varchar(25)" json:"login"`
	Level     int       `gorm:"type:int(11)" json:"level"`
	Score     int       `gorm:"type:int(11)" json:"login"`
}

func NewPlayer(createdAt time.Time, login string, level int, score int) *Player {
	return &Player{CreatedAt: createdAt, Login: login, Level: level, Score: score}
}
