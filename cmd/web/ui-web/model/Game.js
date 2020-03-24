class Game {

    _multi  ;
    _canvas  ;
    _level ;
    _players = [] ;

    constructor(multi, canvas, level, players) {
        this._multi = multi;
        this._canvas = canvas;
        this._level = level;
        this._players = players;
    }

    get multi() {
        return this._multi;
    }

    set multi(value) {
        this._multi = value;
    }

    get canvas() {
        return this._canvas;
    }

    set canvas(value) {
        this._canvas = value;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
    }

    get players() {
        return this._players;
    }

    set players(value) {
        this._players = value;
    }


}