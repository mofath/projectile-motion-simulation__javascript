app.invertY = (y) => window.screen.height - y;


app.updateUI = (t = 0, x = 0, y = 0, maxHeight = 0, reset = true) => {

    const updateUITimer = setTimeout(() => {
        if (!reset) {
            document.querySelector("#time").innerHTML = t.toPrecision(4);
            document.querySelector("#x-displacement").innerHTML = (x - window.app.missile.offset.x).toPrecision(4);
            document.querySelector("#y-displacement").innerHTML = (y < window.app.missile.offset.y ? 0 : y - window.app.missile.offset.y).toPrecision(4);
            document.querySelector("#max-height").innerHTML = (Math.max(maxHeight - window.app.missile.offset.y)).toPrecision(4);
        }
        else {
            document.querySelector("#time").innerHTML = (t).toPrecision(4);
            document.querySelector("#x-displacement").innerHTML = (x).toPrecision(4);
            document.querySelector("#y-displacement").innerHTML = (y).toPrecision(4);
            document.querySelector("#max-height").innerHTML = (maxHeight).toPrecision(4);
        }

        clearInterval(updateUITimer);

    }, 40);
};