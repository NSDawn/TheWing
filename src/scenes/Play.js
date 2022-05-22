// VAR DECLARATION
let selectedUser = ""; selectedUser = "Onion"
let currentSlice = [];
let currentLineNum = 0; let currentLine = "..."; let currentLineTyped = "";
let typeTick = 0; // referenced for the | thing.
let scrollOffset = 0; let maxScroll = 0;

// SCENE (scenePlay)
class scenePlay {
    constructor() { }
    scenePreload() { // runs once before EVERYTHING else
         this.bonk = new Audio('./assets/bonk-sound-effect.mp3');
        return;
    }
    sceneInit() { // runs once when this scene is switched to
        runSlice("testB");
        return;
    }
    sceneDraw() { // runs once per ∆t
        // settings
        background(UI.DARK_COLOR);
        noStroke();
        textFont("Arial");// textFont(FONT); // font change later pls.

        // making sure the selected user is in save
        if (!(selectedUser in save["msg"])) {
            save["msg"][selectedUser] = [];
        }

        // SCREEN ITEMS

        // left sidebar
        fill(UI.VDARK_COLOR); rect(
            0, 
            0, 
            CANVAS_SIZE.x / 8, 
            CANVAS_SIZE.y
        ); 
        
        // putting the texts on the scrolling center screen
        let yOffset = 0;
        let minRep = 2; // offset by at least 2 lines between users (bc of PFP)
        for (let i = 0; i < save.msg[selectedUser].length; i++) {
            
            let isSameUser = false
            if (i != 0) {
                if (save.msg[selectedUser][i][0] == save.msg[selectedUser][i - 1][0]) {
                    isSameUser = true;
                }
            }

            if (isSameUser) {
                yOffset += UI.TEXTSIZE;
                minRep = (minRep == 0)? minRep : minRep -1
            } else {
                yOffset += (minRep + 2) * UI.TEXTSIZE;
                minRep = 2;
            }
            
            if (yOffset + scrollOffset < 0) {
                continue;
            } else if (yOffset + scrollOffset < 9 * CANVAS_SIZE.y / 8) {

                if (!isSameUser) {
                image(
                    IMG[UI.PFP[save.msg[selectedUser][i][0]]],
                    CANVAS_SIZE.x/8 + UI.BUFF,
                    scrollOffset + yOffset, 
                    CANVAS_SIZE.x/8 - UI.BUFF *2,
                    CANVAS_SIZE.x/8 - UI.BUFF *2,
                );
                fill(UI.VLIGHT_COLOR); text(
                    save.msg[selectedUser][i][0], 
                    CANVAS_SIZE.x/4, 
                    scrollOffset + yOffset + UI.TEXTSIZE, 
                ); yOffset += UI.TEXTSIZE * 1.25}

                fill(UI.LIGHT_COLOR); text(
                    save.msg[selectedUser][i][1], 
                    CANVAS_SIZE.x/4, 
                    scrollOffset + yOffset + UI.TEXTSIZE,
                );
            } else {
                break;
            }
        }

        // top bar
        fill(UI.LIGHT_COLOR); rect(
            CANVAS_SIZE.x/8,
            0,
            CANVAS_SIZE.x,
            CANVAS_SIZE.y/8,
        )
        // name tag
        fill(UI.VLIGHT_COLOR); textSize(UI.TEXTSIZE); text(
            selectedUser,
            3 * CANVAS_SIZE.x/16 + 2 * UI.BUFF,
            CANVAS_SIZE.y / 16 + UI.TEXTSIZE /2,
        );
        image(
            IMG[UI.PFP[selectedUser]],
            CANVAS_SIZE.x / 8 + UI.BUFF,
            CANVAS_SIZE.y / 16 - CANVAS_SIZE.x/16 / 2,
            CANVAS_SIZE.x/16,
            CANVAS_SIZE.x/16,
        );
        // bottom bar
        fill(UI.LIGHT_COLOR); rect(
            CANVAS_SIZE.x / 8, 
            7 * CANVAS_SIZE.y / 8, 
            7* CANVAS_SIZE.x /8, 
            CANVAS_SIZE.y / 8,
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
        );
        
        typeTick = (typeTick != 60) ? typeTick + 1 : 0; // tick the ticker
        fill(UI.DARK_COLOR); textSize(UI.TEXTSIZE); text(
            currentLineTyped + ((typeTick > 30) ? "|" : ""),
            CANVAS_SIZE.x / 8 + UI.BUFF + UI.TEXTSIZE, 
            7 * CANVAS_SIZE.y / 8 + 1.5*UI.BUFF + UI.TEXTSIZE,
        );



        // RUNNING THE GAME
        
        if (keyJustTyped == "*delete" && currentLineTyped != "") {
            currentLineTyped = currentLineTyped.substring(0, currentLineTyped.length -1);
        } else if (currentLineTyped == currentLine) {
            if (keyJustTyped == "*return") {
                this.bonk.play();
                // take the currently typed line and throw it into the savedata
                save.msg[selectedUser].push(currentSlice[currentLineNum]);
                // move to the next line
                currentLineNum++;
                currentLine = currentSlice[currentLineNum][1];
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
        
        // scrolling
        maxScroll = yOffset > 6 * CANVAS_SIZE.y/8 ? -yOffset + 6 * CANVAS_SIZE.y/8 : 0;
        if (mouseScroll < 0) {
            scrollOffset = Math.max(scrollOffset + mouseScroll, maxScroll);
        } else if (mouseScroll > 0) {
            scrollOffset = Math.min(scrollOffset + mouseScroll, 0);
        }

        mouseScroll = 0;
        
        return;
        
    }
}

function runSlice(in_str) {
    currentSlice = S[in_str];
    currentLineNum = 0; 
    currentLine = currentSlice[currentLineNum][1];
    currentLineTyped = "";
}