class Missile {

    constructor(theta, vi, x, y, canvas) {
        this.X = x;
        this.Y = y;
        this.Vi = vi;
        this.Theta = theta * Math.PI / 180.0;

        this.stop = false;

        this.launchTime = 0;
        this.flightPath = new Array();
        this.width = window.app.missile.width;
        this.height = window.app.missile.height;
        this.maxHeight = 0;

        this.img = new Image(this.width, this.height);
        this.img.src = window.app.missile.imgSrc;

        this.canvas = canvas;

        this.ctx = this.canvas.getContext("2d");

        this.canvas.addEventListener("stop", () => {
            this.stop = true;
        });
    };


    launch() {
        this.vi_y = Math.sin(this.Theta) * this.Vi;
        this.vi_x = Math.cos(this.Theta) * this.Vi;

        this.ctx.beginPath();

        window.requestAnimationFrame((t) => {
            this.launchTime = t;
            this.plot(t);
        });
    };


    plot(timestamp) {
        this.stop = false;

        let T = (timestamp - this.launchTime) / 1000;

        let X = (this.vi_x * T) + window.app.missile.offset.x;
        let Y = (this.vi_y * T - app.gravity / 2 * T * T) + window.app.missile.offset.y;

        this.maxHeight = Math.max(Y, this.maxHeight);

        this.flightPath.push(new Point(this.X, this.Y));

        // draw missile path
        this.drawMissilePath(this.X, this.Y, X, Y);

        this.X = X;
        this.Y = Y;

        this.flightPath.push(new Point(X, Y));

        if (this.Y < window.app.missile.offset.y) {
            this.explodeMissile((this.X - this.width / 2), window.app.invertY(this.Y + this.height / 2));
            const timer = setTimeout(() => {
                this.drawAreeUnderTheCurve();
                clearInterval(timer);
            }, 200);
        } else {
            window.requestAnimationFrame((t) => {
                !this.stop && this.plot(t);
            });
        };

        window.app.updateUI(T, this.X, this.Y, this.maxHeight, false);
    };


    drawMissilePath(x1, y1, x2, y2) {
        this.ctx.globalAlpha = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, window.app.invertY(y1));
        this.ctx.lineTo(x2, window.app.invertY(y2));
        this.ctx.strokeStyle = window.app.missile.pathColor;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    };


    drawAreeUnderTheCurve() {
        let area = new Path2D();

        let pt = this.flightPath.pop();

        area.moveTo(pt.X, window.app.invertY(pt.Y));

        while (this.flightPath.length) {
            pt = this.flightPath.pop();
            area.lineTo(pt.X, window.app.invertY(pt.Y));
        }

        area.lineTo(pt.X, window.app.invertY(window.app.missile.offset.y));
        area.closePath();

        const crveColor = window.app.missile.colors[Math.floor(Math.random() * app.missile.colors.length)];

        this.ctx.strokeStyle = crveColor;
        this.ctx.fillStyle = crveColor;
        this.ctx.globalAlpha = 0.2;

        setTimeout(() => {
            this.ctx.stroke(area);
            this.ctx.fill(area);
        }, 200);
    };


    explodeMissile(x, y) {
        this.ctx.drawImage(this.img, x, y, this.width, this.height);
        var killedTimeOut = setTimeout(() => {
            this.ctx.clearRect(x, y, window.app.missile.width * 2, window.app.missile.height * 2);
            clearInterval(killedTimeOut);
        }, 300)
    }
};