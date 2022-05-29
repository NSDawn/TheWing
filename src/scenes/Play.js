// VAR DECLARATION
let selectedUser = ""; selectedUser = "Onion";

let availableUsers = []; 

let currentSlice = {};
let currentLineNum = {}; let currentLine = {}; let currentLineTyped = {}; 
let currentChoice = {}; let currentSelectedChoice = {};
let notif = {};

let typeTick = 0; // referenced for the | thing.
let scrollOffset = 0; let maxScroll = 0;
let scrollOffsetUsers = 0; let maxScrollUsers = 0;
let autoScrollDown = false; let autoScrollDownTick = 2;

// SCENE (scenePlay)
class scenePlay {
    constructor() {};
    scenePreload() { // runs once before EVERYTHING else
         this.bonk = new Audio('./assets/bonk-sound-effect.mp3');
        return;
    }
    sceneInit() { // runs once when this scene is switched to  
        runSlice("testChoice", "Onion");
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
                    translateTime(save.msg[selectedUser][i][2]),
                    3 * CANVAS_SIZE.x/4,
                    scrollOffset + yOffset + UI.TEXTSIZE,        
                ); yOffset += UI.TEXTSIZE * 1.25}

                fill(UI.LIGHT_COLOR); text(
                    save.msg[selectedUser][i][1], 
                    CANVAS_SIZE.x/4, 
                    scrollOffset + yOffset + UI.TEXTSIZE,
                );
            } else {
                continue;
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
                currentLine[selectedUser][1] + currentChoice[selectedUser],
                CANVAS_SIZE.x / 8 + UI.BUFF + UI.TEXTSIZE, 
                7 * CANVAS_SIZE.y / 8 + 1.5*UI.BUFF + UI.TEXTSIZE,
            );
            typeTick = (typeTick != 60) ? typeTick + 1 : 0; // tick the ticker
            fill(UI.DARK_COLOR); textSize(UI.TEXTSIZE); text(
                currentLineTyped[selectedUser] + ((typeTick > 30) ? "|" : ""),
                CANVAS_SIZE.x / 8 + UI.BUFF + UI.TEXTSIZE, 
                7 * CANVAS_SIZE.y / 8 + 1.5*UI.BUFF + UI.TEXTSIZE,
            );
        }
        
        // left bar 
        // left sidebar
        fill(UI.VDARK_COLOR); rect(
            0, 
            0, 
            CANVAS_SIZE.x / 8, 
            CANVAS_SIZE.y,
        ); 
        // left side, scrolling users
        let yOffsetUsers = CANVAS_SIZE.x / 8;
        let mousePos = new v2(mouseX, mouseY);
        for (let i = 0; i < availableUsers.length; i++) {
            if (yOffsetUsers + scrollOffsetUsers < CANVAS_SIZE.y / 16) {
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

                // draw a thing on the side if its the selected user
                if (availableUsers[i] == selectedUser) {
                    fill(UI.VLIGHT_COLOR); ellipse(
                        0,
                        scrollOffsetUsers + yOffsetUsers - CANVAS_SIZE.x / 16, 
                        CANVAS_SIZE.x/64,
                    )
                }
                
                // draw a bubble if there are notifs
                if (notif[availableUsers[i]] > 0) {
                    fill(UI.NOTIF_COLOR); ellipse(
                        CANVAS_SIZE.x / 32 -hoverBuff/2,
                        scrollOffsetUsers + yOffsetUsers - CANVAS_SIZE.x / 16 -hoverBuff/2,
                        CANVAS_SIZE.x/32,
                    )
                    fill(UI.VLIGHT_COLOR); text(
                        String(notif[availableUsers[i]]),
                        CANVAS_SIZE.x / 32 -hoverBuff/2 -5*UI.TEXTSIZE/16,
                        scrollOffsetUsers + yOffsetUsers - CANVAS_SIZE.x / 16 -hoverBuff/2 +6*UI.TEXTSIZE/16,
                    )
                }

            } else {
                break;
            }
        }
        // mascot
        image(
            IMG["mascot.png"],
            CANVAS_SIZE.x / 64,
            CANVAS_SIZE.x / 64,
            3 * CANVAS_SIZE.x / 32,
            3 * CANVAS_SIZE.x / 32,
        );


        // RUNNING THE GAME

        // IF IT'S THE PLAYER'S TURN allow them to type responses
        if (currentLine[selectedUser][0] == "*p") {
            // handling different key inputs
            if (keyJustTyped == "*delete" && currentLineTyped[selectedUser] != "") {
                currentLineTyped[selectedUser] = currentLineTyped[selectedUser].substring(0, currentLineTyped[selectedUser].length -1);
            } else if (currentLineTyped[selectedUser] == currentLine[selectedUser][1] + currentChoice[selectedUser]) {
                if (keyJustTyped == "*return") {
                    // save flags, if any
                    if (currentLine[selectedUser][4]) {
                        save["flag"][currentLine[selectedUser][3]] = currentSelectedChoice[selectedUser];
                    } else if (currentLine[selectedUser][3]) {
                        save["flag"][currentLine[selectedUser][3]] = 1;
                    }
                    // take the currently typed line and throw it into the savedata
                    currentSlice[selectedUser][currentLineNum[selectedUser]][2] = Date.now();
                    currentSlice[selectedUser][currentLineNum[selectedUser]][1] += currentChoice[selectedUser];
                    save.msg[selectedUser].push(currentSlice[selectedUser][currentLineNum[selectedUser]]);
                    // move to the next line
                    currentLineNum[selectedUser]++;
                    currentLine[selectedUser] = currentSlice[selectedUser][currentLineNum[selectedUser]];
                    currentLineTyped[selectedUser] = "";

                    currentChoice[selectedUser] = "";
                    if (currentLine[selectedUser][4]) {
                        currentChoice[selectedUser] = "[" + currentLine[selectedUser][4] + "]";
                    }

                    // note that a message was sent, so autoscroll happens
                    autoScrollDown = true;
                }
            } else {
                let nextChar = (currentLine[selectedUser][1] + currentChoice[selectedUser])[currentLineTyped[selectedUser].length]; 
                // also allow the user to type in multiple options, based on choice
                let selectChars = "";
                if (currentChoice[selectedUser].includes("|") && currentLineTyped[selectedUser] == currentLine[selectedUser][1]) {
                    let choices = currentChoice[selectedUser].replace("[", "").replace("]", "").split("|");
                    for (let i = 0; i < choices.length; i++) {
                        selectChars += choices[i][0];
                    }
                }
                const skippedChar = `"'.,?`;
                if (skippedChar.includes(nextChar)) {
                    currentLineTyped[selectedUser] += nextChar;
                } else if (keyJustTyped == nextChar && nextChar != "[") {
                    currentLineTyped[selectedUser] += keyJustTyped;
                    typeTick = 31;
                } else if (selectChars.includes(keyJustTyped) && !(keyJustTyped == "")) {
                    currentLineTyped[selectedUser] += keyJustTyped;
                    currentSelectedChoice[selectedUser] = selectChars.indexOf(keyJustTyped);
                    currentChoice[selectedUser] = currentChoice[selectedUser].replace("[", "").replace("]", "").split("|")[currentSelectedChoice[selectedUser]];

                } else if (keyJustTyped == "*skip") { // debugging, delete after testing is done!!
                    currentLineTyped[selectedUser] = currentLine[selectedUser][1];
                }
                
                if (currentLineTyped[selectedUser].length <= currentLine[selectedUser][1].length) {
                    if (currentLine[selectedUser][4]) {
                        currentChoice[selectedUser] = "[" + currentLine[selectedUser][4] + "]";
                        currentSelectedChoice[selectedUser] = -1;
                    }
                }
            }
        }

        // tick everyone's clocks, and send messages when necessary
        let userSent = false;
        for (let i = 0; i < availableUsers.length; i++) {
            if (currentLine[availableUsers[i]][0] != "*p") {
                if (currentLine[availableUsers[i]][2]) {
                    currentLine[availableUsers[i]][2] -= 1;
                } else {
                    this.bonk.play();
                    userSent = availableUsers[i];
                    // take the line just sent and throw it into the savedata
                    currentSlice[userSent][currentLineNum[userSent]][2] = Date.now();
                    save.msg[userSent].push(currentSlice[userSent][currentLineNum[userSent]]);
                    // move to the next line
                    currentLineNum[userSent]++;
                    currentLine[userSent] = currentSlice[userSent][currentLineNum[userSent]];
                    currentLineTyped[userSent] = "";
                    currentChoice[userSent] = "";
                    if (currentLine[userSent][4]) {
                        currentChoice[userSent] = "[" + currentLine[userSent][4] + "]";
                    }
                    // note that a message was sent, so autoscroll happens IF the screen is open to it.
                    autoScrollDown = (userSent == selectedUser)? true : autoScrollDown;
                    // if the screen is not open to it, send a notif
                    notif[userSent] += (userSent == selectedUser)? 0 : 1;

                }
            }
        }
        // if a user sent a message, move it to the top of availableUsers
        if (userSent) {
            availableUsers = removeFromArray(availableUsers, userSent);
            availableUsers.unshift(userSent);
        }

        // scrolling
        maxScroll = yOffset > 6 * CANVAS_SIZE.y/8 ? -yOffset + 6 * CANVAS_SIZE.y/8 : 0;
        maxScrollUsers = yOffsetUsers > 6 * CANVAS_SIZE.y/8 ? -yOffsetUsers + 6 * CANVAS_SIZE.y/8 : 0;
        
        if (mousePos.isWithin(new v2(CANVAS_SIZE.x/8, CANVAS_SIZE.y/8), new v2(CANVAS_SIZE.x, 7* CANVAS_SIZE.y/8))) {
            if (mouseScroll < 0) {
                scrollOffset = Math.max(scrollOffset + mouseScroll, maxScroll);
            } else if (mouseScroll > 0) {
                scrollOffset = Math.min(scrollOffset + mouseScroll, 0);
            }
        } else if (mousePos.isWithin(new v2(0, CANVAS_SIZE.y/8), new v2(CANVAS_SIZE.x/8, CANVAS_SIZE.y))) {
            if (mouseScroll < 0) {
                scrollOffsetUsers = Math.max(scrollOffsetUsers + mouseScroll, maxScrollUsers);
            } else if (mouseScroll > 0) {
                scrollOffsetUsers = Math.min(scrollOffsetUsers + mouseScroll, 0);
            }
        }
        
        

        // autoscroll down to the next message if one was sent last frame
        if (autoScrollDown) {
            if (autoScrollDownTick > 0) {
                autoScrollDownTick -= 1;
            } else {
                scrollOffset = maxScroll;
                autoScrollDown = false;
                autoScrollDownTick = 2;
            }
        }
        
        // clear notifs for selectedUser
        notif[selectedUser] = 0;
        
        updateStory(); // run storyboard.js
        return;

    }
}

function runSlice(in_str, in_user) {
    if (!(availableUsers.includes(in_user))) {
        addUser(in_user);
    }
    currentSlice[in_user] = S[in_str];
    currentLineNum[in_user] = 0; 
    currentLine[in_user] = currentSlice[in_user][currentLineNum[in_user]];
    currentLineTyped[in_user] = "";
    
    
    currentChoice[in_user] = "";
    currentSelectedChoice[in_user] = -1;
    if (currentLine[in_user][4]) {
        currentChoice[in_user] = "[" + currentLine[selectedUser][4] + "]";
    }
}

function addUser(in_user) {
    availableUsers.splice(1, 0, in_user);
    currentSlice[in_user] = [];
    currentLineNum[in_user] = 0; 
    currentLine[in_user] = []; 
    currentLineTyped[in_user] = ""; 
    save.msg[in_user] = [];
    notif[in_user] = 0;
}