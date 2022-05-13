// VAR DECLARATION


// SCENE (scenePlay)
class scenePlay {
    constructor() { }
    scenePreload() { // runs once before EVERYTHING else
        return;
    }
    sceneInit() { // runs once when this scene is switched to
        return;
    }
    sceneDraw() { // runs once per ∆t
        // settings
        background(UI.DARK_COLOR);
        noStroke();

        // screen items
        fill(UI.VDARK_COLOR); rect(0, 0, CANVAS_SIZE.x / 8, CANVAS_SIZE.y); // left sidebar

        fill(UI.LIGHT_COLOR); rect(CANVAS_SIZE.x / 8, 7 * CANVAS_SIZE.y / 8, 7* CANVAS_SIZE.x /8, CANVAS_SIZE.y /8);
        //fill(UI.VLIGHT_COLOR); rect(CANVAS_SIZE.x / 8 +UI.BUFF, 7 * CANVAS_SIZE.y / 8 +UI.BUFF, 7* CANVAS_SIZE.x /8 -UI.BUFF, CANVAS_SIZE.y /8 -UI.BUFF);
        return;
    }
}