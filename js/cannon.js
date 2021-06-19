class Cannon {

    constructor(canvas, x, y) {
        this.canvas = canvas;
        
        this.X = window.screen.width * x / 100;
        this.Y = window.screen.height * y / 100;

        this.ctx = canvas.getContext("2d");

        this.width = window.app.cannon.width;
        this.height = window.app.cannon.height;
        
        this.img = new Image(this.width, this.height);
        this.img.src = window.app.cannon.imgSrc;
    };

    draw() {
        this.img.onload = () => this.ctx.drawImage(this.img, (this.X - this.width), (window.app.invertY(this.Y) - this.height));
    };

    fire(theta, voi) {
        new Missile(theta, voi, this.X, this.Y, this.canvas).launch();
    };
};