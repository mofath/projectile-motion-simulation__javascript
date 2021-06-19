class Canvas {
    
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");

        // shooter position take a percentage value of the view port 
        // 10 means 10% of the view port width or height
        this.cannon = new Cannon(this.canvas, window.app.cannon.pos.x, window.app.cannon.pos.y);
    };

    stop(callback) {
        let event = new Event("stop");
        this.canvas.dispatchEvent(event);
        setTimeout(callback, 200);
    };

    init() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.draw();
    };

    draw() {
        this.cannon.draw();
    };
}