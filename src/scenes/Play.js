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
        background(UI_CONFIG.DARK_COLOR);

        textSize(CANVAS_SIZE.x/12); text(
            "holey shoot it's the game.", 
            CANVAS_SIZE.x/20, CANVAS_SIZE.y/2, 
            UI_CONFIG.DARK_COLOR,
        );
        textSize(CANVAS_SIZE.x/20); text(
            "whee what a nice game \nclick x to change scene lmao.", 
            CANVAS_SIZE.x/16, CANVAS_SIZE.y/2 + CANVAS_SIZE.x/8, 
            UI_CONFIG.DARK_COLOR,
        );

        return;
    }
}