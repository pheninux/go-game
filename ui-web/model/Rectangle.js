class MyRectangle {

    width ;
    height ;
    position ;
    color ;

    constructor(width, height, position, color) {
        this.width = width;
        this.height = height;
        this.position = position;
        this.color = color;
    }

    get width() {
        return this.width;
    }

    set width(value) {
        this.width = value;
    }

    get height() {
        return this.height;
    }

    set height(value) {
        this.height = value;
    }

    get position() {
        return this.position;
    }

    set position(value) {
        this.position = value;
    }

    get color() {
        return this.color;
    }

    set color(value) {
        this.color = value;
    }


}