class Mycanvas {

    _width ;
    _height ;
    _rectangles = [];

    constructor(width , height ,rectangles) {
        this._width = width;
        this._height = height;
        this._rectangles = rectangles;
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

    get rectangles() {
        return this._rectangles;
    }

    set rectangles(value) {
        this._rectangles = value;
    }

}