package models

type ResponseBodySavePlayer struct {
	Player Player `json:"player"`
	ErrMsg string `json:"err_msg"`
}
