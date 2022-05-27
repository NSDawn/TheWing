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
let FONT;

function setup() {
    // setup runs once for the entire program
    createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y); // defined in style.js
}

function preload() {
    // preloads all the scene's stuff at once. hopefully we don't have too much to load ;-;
    for (s in SCENES) {
        SCENES[s].scenePreload();
    }

    FONT = loadFont("./assets/fonts/Montserrat.ttf"); // the font!

    IMG = {}
    for (let i = 0; i < IMG_LIST.length; i++) { // preloading all images at once
        IMG[IMG_LIST[i]] = loadImage("./assets/images/" + IMG_LIST[i]);
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
    mouseScroll = 0;
    mouseJustClicked = false;


}

function changeScene(sceneKey) {
    if (!(sceneKey in SCENES)) {
        throw ("changeScene: Scene <" + sceneKey + "> does not exist.");
    }
    currentScene = sceneKey;
    flagHasRunInit = false;
    return;
}

// //// //// //// //// //// //// //
// INPUT HANDLING                //
// //// //// //// //// //// //// //

let keyJustTyped = "" // this is set to "" at the end of each frame

function keyTyped() {
    if (!keyJustTyped.includes("*")) { // filters functional keys out
        keyJustTyped = key;
    }    
}

function keyPressed() {
    //console.log(keyCode);
    if (keyCode == "ENTER" || keyCode == "RETURN" || keyCode == "13") {
        keyJustTyped = "*return";
    }
    if (keyCode == "DELETE" || keyCode == "8") {
        keyJustTyped = "*delete";
    }
    if (keyCode == "CMD" || keyCode == "91") {
        keyJustTyped = "*skip";
    }
    
}

let mouseScroll = 0;
function mouseWheel(event) {
    mouseScroll = event.delta / SETTINGS.SENSITIVITY * (SETTINGS.SCROLL_INVERT? 1 : -1);
    
    /* // this would handle scrolling on the screen vs. scrolling on the whole page, but google chrome doesn't like this.
    if ((mouseX <= CANVAS_SIZE.x) && (mouseX >= 0) && (mouseY <= CANVAS_SIZE.y) && (mouseY >= 0)) {
        return false;
    }
    */
}

let mouseJustClicked = false;
function mouseClicked() {
    mouseJustClicked = true;
}

// function that parses time to the format we wanna print. i'm passing unix epoch time through it btw
function translateTime(in_int) {
    return ("utc+" + String(in_int));
}