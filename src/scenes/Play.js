// VAR DECLARATION
let currentLine = "Peepeepoopoo eeeeee"; let currentLineTyped = "Peepeepo";

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
        textFont(FONT);

        // SCREEN ITEMS

        // left sidebar
        fill(UI.VDARK_COLOR); rect(
            0, 
            0, 
            CANVAS_SIZE.x / 8, 
            CANVAS_SIZE.y
        ); 

        // bottom bar
        fill(UI.LIGHT_COLOR); rect(
            CANVAS_SIZE.x / 8, 
            7 * CANVAS_SIZE.y / 8, 
            7* CANVAS_SIZE.x /8, 
            CANVAS_SIZE.y / 8
        );
        // textbox
        fill(UI.VLIGHT_COLOR); rect(
            CANVAS_SIZE.x / 8 + UI.BUFF, 
            7 * CANVAS_SIZE.y / 8 + UI.BUFF, 
            7* CANVAS_SIZE.x /8 - 2* UI.BUFF, 
            CANVAS_SIZE.y / 8 - 2*UI.BUFF,
            CANVAS_SIZE.y / 16,             // rounded corners
        );
        fill(UI.LIGHT_COLOR); textSize(UI.TEXTSIZE); text(
            currentLine,
            CANVAS_SIZE.x / 8 + UI.BUFF + UI.TEXTSIZE, 
            7 * CANVAS_SIZE.y / 8 + 1.5*UI.BUFF + UI.TEXTSIZE,
        )
        fill(UI.DARK_COLOR); textSize(UI.TEXTSIZE); text(
            currentLineTyped,
            CANVAS_SIZE.x / 8 + UI.BUFF + UI.TEXTSIZE, 
            7 * CANVAS_SIZE.y / 8 + 1.5*UI.BUFF + UI.TEXTSIZE,
        )

        return;
        
    }
}