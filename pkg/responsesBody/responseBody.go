package responsesBody

import "goGame/pkg/model"

type ResponseBodySavePlayer struct {
	Player model.PlayerDto2 `json:"player"`
	ErrMsg string           `json:"err_msg"`
}
