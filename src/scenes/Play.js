// VAR DECLARATION
let selectedUser = ""; selectedUser = "Nagito";

let availableUsers = []; 

let currentSlice = {};
let currentLineNum = {}; let currentLine = {}; let currentLineTyped = {};

let typeTick = 0; // referenced for the | thing.
let scrollOffset = 0; let maxScroll = 0;
let scrollOffsetUsers = 0; let maxScrollUsers = 0;
let autoScrollDown = false;

// SCENE (scenePlay)
class scenePlay {
    constructor() { }
    scenePreload() { // runs once before EVERYTHING else
         this.bonk = new Audio('./assets/bonk-sound-effect.mp3');
        return;
    }
    sceneInit() { // runs once when this scene is switched to  
        runSlice("testC", "Onion");
        runSlice("testD", "Nagito");
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
            
            if (yOffset + scrollOffset < -CANVAS_SIZE / 8) {
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
                    (save.msg[selectedUser][i][0] == "*p") ? SETTINGS.PLAYER_NAME : save.msg[selectedUser][i][0], 
                    CANVAS_SIZE.x/4, 
                    scrollOffset + yOffset + UI.TEXTSIZE, 
                );
                fill(UI.LIGHT_COLOR); text(
                    translateTime(save.msg[selectedUser][i][3]),
                    3 * CANVAS_SIZE.x/4,
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
        if (currentLine[selectedUser][0] == "*p") {
            fill(UI.LIGHT_COLOR); textSize(UI.TEXTSIZE); text(
                currentLine[selectedUser][1],
                CANVAS_SIZE.x / 8 + UI.BUFF + UI.TEXTSIZE, 
                7 * CANVAS_SIZE.y / 8 + 1.5*UI.BUFF + UI.TEXTSIZE,
            );
        }
        
        typeTick = (typeTick != 60) ? typeTick + 1 : 0; // tick the ticker
        fill(UI.DARK_COLOR); textSize(UI.TEXTSIZE); text(
            currentLineTyped[selectedUser] + ((typeTick > 30) ? "|" : ""),
            CANVAS_SIZE.x / 8 + UI.BUFF + UI.TEXTSIZE, 
            7 * CANVAS_SIZE.y / 8 + 1.5*UI.BUFF + UI.TEXTSIZE,
        );

        // left bar 
        // left sidebar
        fill(UI.VDARK_COLOR); rect(
            0, 
            0, 
            CANVAS_SIZE.x / 8, 
            CANVAS_SIZE.y,
        ); 
        // mascot
        image(
            IMG["mascot.png"],
            CANVAS_SIZE.x / 64,
            CANVAS_SIZE.x / 64,
            3 * CANVAS_SIZE.x / 32,
            3 * CANVAS_SIZE.x / 32,
        );
        // left side, scrolling users
        let yOffsetUsers = CANVAS_SIZE.x / 8;
        let mousePos = new v2(mouseX, mouseY);
        for (let i = 0; i < availableUsers.length; i++) {
            if (yOffsetUsers + scrollOffsetUsers < CANVAS_SIZE.y / 8) {
                yOffsetUsers += 3 * CANVAS_SIZE.x / 32;
            } else if (yOffsetUsers + scrollOffsetUsers < CANVAS_SIZE.y) {
                
                // check if mouse is on a particular user, and note a buff in size if it is
                let isMouseOn = mousePos.isWithin(new v2(CANVAS_SIZE.x / 32, scrollOffsetUsers + yOffsetUsers), new v2(CANVAS_SIZE.x / 32 + CANVAS_SIZE.x/16, scrollOffsetUsers + yOffsetUsers + CANVAS_SIZE.x/16));
                let hoverBuff = isMouseOn? CANVAS_SIZE.x / 128 : 0;

                // check if mouse is clicking on this particuar user
                if (mouseJustClicked && isMouseOn) {
                    selectedUser = availableUsers[i];
                    autoScrollDown = true;
                }

                // render user
                image(
                    IMG[UI.PFP[availableUsers[i]]],
                    CANVAS_SIZE.x / 32 -hoverBuff/2,
                    scrollOffsetUsers + yOffsetUsers -hoverBuff/2, 
                    CANVAS_SIZE.x / 16 +hoverBuff,
                    CANVAS_SIZE.x / 16 +hoverBuff,
                );
                yOffsetUsers += 3 * CANVAS_SIZE.x / 32;
            } else {
                break;
            }
        }

        




        // RUNNING THE GAME

        // IF IT'S THE PLAYER'S TURN allow them to type responses
        if (currentLine[selectedUser][0] == "*p") {
            // handling different key inputs
            if (keyJustTyped == "*delete" && currentLineTyped[selectedUser] != "") {
                currentLineTyped[selectedUser] = currentLineTyped[selectedUser].substring(0, currentLineTyped[selectedUser].length -1);
            } else if (currentLineTyped[selectedUser] == currentLine[selectedUser][1]) {
                if (keyJustTyped == "*return") {
                    // take the currently typed line and throw it into the savedata
                    currentSlice[selectedUser][currentLineNum[selectedUser]][3] = Date.now();
                    save.msg[selectedUser].push(currentSlice[selectedUser][currentLineNum[selectedUser]]);
                    // move to the next line
                    currentLineNum[selectedUser]++;
                    currentLine[selectedUser] = currentSlice[selectedUser][currentLineNum[selectedUser]];
                    currentLineTyped[selectedUser] = "";
                    // note that a message was sent, so autoscroll happens
                    autoScrollDown = true;
                }
            } else {
                let nextChar = currentLine[selectedUser][1][currentLineTyped[selectedUser].length]; 
                const skippedChar = `"'.,?`;
                if (skippedChar.includes(nextChar)) {
                    currentLineTyped[selectedUser] += nextChar;
                } else if (keyJustTyped == nextChar) {
                    currentLineTyped[selectedUser] += nextChar;
                    typeTick = 31;
                } else if (keyJustTyped == "*skip") { // debugging, delete after testing is done!!
                    currentLineTyped[selectedUser] = currentLine[selectedUser][1];
                }
            }
        }

        // tick everyone's clocks, and send messages when necessary
        for (let i = 0; i < availableUsers.length; i++) {
            if (currentLine[availableUsers[i]][0] != "*p") {
                if (currentLine[availableUsers[i]][2]) {
                    currentLine[availableUsers[i]][2] -= 1;
                } else {
                    this.bonk.play();
                    // take the line just sent and throw it into the savedata
                    currentSlice[availableUsers[i]][currentLineNum[availableUsers[i]]][3] = Date.now();
                    save.msg[availableUsers[i]].push(currentSlice[availableUsers[i]][currentLineNum[availableUsers[i]]]);
                    // move to the next line
                    currentLineNum[availableUsers[i]]++;
                    currentLine[availableUsers[i]] = currentSlice[availableUsers[i]][currentLineNum[availableUsers[i]]];
                    currentLineTyped[availableUsers[i]] = "";
                    // note that a message was sent, so autoscroll happens IF the screen is open to it.
                    
                    autoScrollDown = (availableUsers[i] == selectedUser)? true : autoScrollDown;
                }
            }
        }

        // scrolling
        maxScroll = yOffset > 6 * CANVAS_SIZE.y/8 ? -yOffset + 6 * CANVAS_SIZE.y/8 : 0;
        
        /*
        if (save.msg[selectedUser].length > 1 && maxScroll < 0) { // janky little bugfix
            let lastMessageIndex = save.msg[selectedUser].length - 1;
            maxScroll -= (save.msg[selectedUser][lastMessageIndex][0] != save.msg[selectedUser][lastMessageIndex - 1][0]? CANVAS_SIZE.x/2 - UI.BUFF*2: 0);
        }*/
        if (mouseScroll < 0) {
            scrollOffset = Math.max(scrollOffset + mouseScroll, maxScroll);
        } else if (mouseScroll > 0) {
            scrollOffset = Math.min(scrollOffset + mouseScroll, 0);
        }

        // autoscroll down to the next message if one was sent last frame
        if (autoScrollDown) {
            scrollOffset = maxScroll;
            autoScrollDown = false;
        }

        return;
    }
}

function runSlice(in_str, in_user) {
    if (!(in_user in availableUsers)) {
        addUser(in_user);
    }
    currentSlice[in_user] = S[in_str];
    currentLineNum[in_user] = 0; 
    currentLine[in_user] = currentSlice[in_user][currentLineNum[in_user]];
    currentLineTyped[in_user] = "";
}

function addUser(in_user) {
    availableUsers.splice(1, 0, in_user);
    currentSlice[in_user] = [];
    currentLineNum[in_user] = 0; 
    currentLine[in_user] = []; 
    currentLineTyped[in_user] = ""; 
    save.msg[in_user] = [];
}