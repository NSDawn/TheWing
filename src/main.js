/*
    
    Nishant Suria 
    Alyse Rose
    Stephanie Styffe 

    "The Wing"

*/

let config = {
    type: Phaser.CANVAS,
    width: 3000,
    height: 2000,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: false,
    scene: [Play]
}

let game = new Phaser.Game(config);