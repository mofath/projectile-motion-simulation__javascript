window.app = {};

app.gravity = 9.8;

app.cannon = {
    imgSrc: 'https://www.pngrepo.com/png/206710/180/cannon.png',
    width: 70,
    height: 100,
    pos: {
        x: 10,
        y: 35,
    }
};

app.missile = {
    imgSrc: 'https://i.pinimg.com/originals/e1/f9/29/e1f929da2b1fa5cd34d4f7de4ea1dfa1.gif',
    width: 70,
    height: 70,
    colors: [
        'red',
        'blue',
        'green',
        'pink',
        'purble',
        'gray',
        'orange',
        'yellow',
    ],
    offset: {
        x: window.screen.width * app.cannon.pos.x / 100,
        y: window.screen.height * app.cannon.pos.y / 100,
    },
    pathColor: 'white',
};