// //// //// //// //// //// //// //
// THE WING                      //
// //// //// //// //// //// //// //
/*
    
    Nishant Suria 
    Alyse Rose
    Stephanie Styffe 

*/

// //// //// //// //// //// //// //
// SCENE HANDLING                //
// //// //// //// //// //// //// //

const SCENES = { // everytime you make a new scene, you need to put it into this dictionary.
    "Play" : new scenePlay,
    "Menu": new sceneMenu,
};

let currentScene = "Menu";
let flagHasRunInit = false;

function setup() {
    // setup runs once for the entire program
    createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y); // defined in style.js
}

function preload() {
    // preloads all the scene's stuff at once. hopefully we don't have too much to load ;-;
    for (s in SCENES) {
        SCENES[s].scenePreload();
    }
}

function draw() {
    // runs sceneInit once per changeScene
    if (!flagHasRunInit) {
        SCENES[currentScene].sceneInit();
        flagHasRunInit = true;
    }
    // runs sceneDraw once per frame
    SCENES[currentScene].sceneDraw();
    
    // see KEY HANDLING
    keyJustTyped = "";
}

function changeScene(sceneKey) {
    if (!(sceneKey in SCENES)) {
        throw ("changeScene: Scene <" + sceneKey + "> does not exist.");
    }
    currentScene = sceneKey;
    flagHasRunInit = true;
    return;
}

// //// //// //// //// //// //// //
// KEY HANDLING                  //
// //// //// //// //// //// //// //

let keyJustTyped = "" // this is set to "" at the end of each frame

function keyTyped() {
    keyJustTyped = key;
}

