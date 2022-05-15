// VAR DECLARATION
let currentSlice = [];
let currentLineNum = 0; let currentLine = "..."; let currentLineTyped = "";
let typeTick = 0; // referenced for the | thing.

// SCENE (scenePlay)
class scenePlay {
    constructor() { }
    scenePreload() { // runs once before EVERYTHING else
        return;
    }
    sceneInit() { // runs once when this scene is switched to
        runSlice("testA");
        return;
    }
    sceneDraw() { // runs once per ∆t
        // settings
        background(UI.DARK_COLOR);
        noStroke();
        textFont("Arial");// textFont(FONT);

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
        
        typeTick = (typeTick != 60) ? typeTick + 1 : 0; // tick the ticker
        fill(UI.DARK_COLOR); textSize(UI.TEXTSIZE); text(
            currentLineTyped + ((typeTick > 30) ? "|" : ""),
            CANVAS_SIZE.x / 8 + UI.BUFF + UI.TEXTSIZE, 
            7 * CANVAS_SIZE.y / 8 + 1.5*UI.BUFF + UI.TEXTSIZE,
        )



        // RUNNING THE GAME
        
        if (currentLineTyped == currentLine) {
            if (keyJustTyped == "*return") {
                currentLineNum += 1;
                currentLine = currentSlice[currentLineNum];
                currentLineTyped = "";
            }
        } else {
            let nextChar = currentLine[currentLineTyped.length]; 
            const skippedChar = `"'.,?`;
            if (skippedChar.includes(nextChar)) {
                currentLineTyped += nextChar;
            } else if (keyJustTyped == nextChar) {
                currentLineTyped += nextChar;
                typeTick = 31;
            }
        }
        
        return;
        
    }
}

function runSlice(in_str) {
    currentSlice = S[in_str];
    currentLineNum = 0; 
    currentLine = currentSlice[currentLineNum];
    currentLineTyped = "";
}