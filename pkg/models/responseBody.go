package models

type ResponseBodySavePlayer struct {
	Player PlayerDto2 `json:"player"`
	ErrMsg string     `json:"err_msg"`
}
