// VAR DECLARATION


// SCENE (sceneMenu)
class sceneMenu {
    constructor() { }
    scenePreload() { // runs once before EVERYTHING else
        return;
    }
    sceneInit() { // runs once when this scene is switched to
        return;
    }
    sceneDraw() { // runs once per ∆t
        
        background(UI.LIGHT_COLOR);

        textSize(CANVAS_SIZE.x/10); text(
            "hello what is up.", 
            CANVAS_SIZE.x/20, CANVAS_SIZE.y/2, 
            UI.DARK_COLOR,
        );
        textSize(CANVAS_SIZE.x/20); text(
            "click x to change scene lmao.", 
            CANVAS_SIZE.x/16, CANVAS_SIZE.y/2 + CANVAS_SIZE.x/8, 
            UI.DARK_COLOR,
        );
        
        if (keyJustTyped == "x") {
            changeScene("Play");
        }
        
        return;
    }
}

