app.world = null;

docReady(() => {
    const launchBtn = document.querySelector(".launch-btn");
    const resetBtn = document.querySelector(".reset-btn");

    app.world = new Canvas("main");

    app.world.init();

    launchBtn.addEventListener("click", handleLunch);

    resetBtn.addEventListener("click", handleReset);
});



function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive")
        setTimeout(fn, 1);
    else
        document.addEventListener("DOMContentLoaded", fn);
};

function handleLunch() {
    const theta = document.querySelector(".theta").value;
    const voi = document.querySelector(".voi").value;

    app.world.cannon.fire(theta, voi);
}

function handleReset() {

    app.world.ctx.clearRect(0, 0, window.screen.width, window.screen.height);
    window.app.updateUI();

    if (app.world) {
        app.world.stop(() => {
            app.world = new Canvas("main");
            app.world.init();
        });
    } else {
        app.world = new Canvas("main");
        app.world.init();
    }
};