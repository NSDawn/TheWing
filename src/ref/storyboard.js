save.flag["self_nameResponse"] = false;
save.flag["self_testE1"] = false;
save.flag["self_runtestE1"] = false;

function updateStory() {
    save.tick += 1;

    if (save.flag["testChoiceFlag"] > -1 && !save.flag["self_nameResponse"]) {
        save.flag["self_nameResponse"] = true;
        switch (save.flag["testChoiceFlag"]) {
            case 0: 
                runSlice("testChoice1", "Onion");
                break;
            case 1: 
                runSlice("testChoice2", "Onion");
                break;
            case 2: 
                runSlice("testChoice3", "Onion");
                break;
        }
    }
    if (save.flag["testE1"] > -1 && !save.flag["self_testE1"]) {
        save.flag["self_nameResponse"] = true;
        switch (save.flag["testE1"]) {
            case 0: 
                runSlice("testE1A", "Weeb");
            case 1:
                runSlice("testE1B", "Weeb");
        }
    }

    if (save.tick > 1000 && !save.flag["self_runtestE1"]) {
        save.flag["self_runtestE1"] = false;
        runSlice("testE", "Weeb");
    }   
} 