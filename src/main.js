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

const SCENES = {
    "Play" : new scenePlay,
};

let currentScene = "Play";
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
}

function changeScene(sceneKey) {
    if (!(sceneKey in SCENES)) {
        throw ("changeScene: Scene <" + sceneKey + "> does not exist.");
    }
    currentScene = sceneKey;
    flagHasRunInit = true;
    return;
}