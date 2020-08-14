class MyRectangle {

    _width ;
    _height ;
    _position ;
    _color ;

    constructor(width, height, position, color) {
        this._width = width;
        this._height = height;
        this._position = position;
        this._color = color;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }


}