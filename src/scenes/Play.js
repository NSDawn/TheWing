class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        
        // rexUI is an external plugin that's gonna help with UI stuff. 
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });      
        
    }
    create() {
        
        // textPanel: main scrollable panel, which shows texts
        
        let textPanel = this.rexUI.add.scrollablePanel({
            x: config.width/2,
            y: config.height/2,
            // anchor: undefined,
            width: 1000,
            height: 1000,

            scrollMode: 0,
        
            // Elements
            background: this.rexUI.add.roundRectangle(1500, 1000, 2000, 1000, 10, UI_CONFIG.PRIMARY_COLOR),

            panel: {
                child: this.rexUI.add.roundRectangle(1500, 1000, 10, 10, 10, UI_CONFIG.LIGHT_COLOR),
                mask: {
                    padding: 1,
                    // updateMode: 0,
                    // layer: undefined,
                }
            },
        
            slider: {
                // background: sliderBackgroundGameObject,
                track: this.rexUI.add.roundRectangle(2400, 1000, 80, 900, 10, UI_CONFIG.DARK_COLOR),

                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, UI_CONFIG.LIGHT_COLOR),
                // input: 'drag',
                // position: 'right',
                // adaptThumbSize: false,
                // minThumbSize: 90,
        
                // buttons: {
                //     top: topButtonGameObject, 
                //     bottom: bottomButtonGameObject,
                //     left: leftButtonGameObject, 
                //     right: rightButtonGameObject,
                //     step: 0.01,
                // }
            },
        
            scroller: {
                threshold: 10,
                slidingDeceleration: 5000,
                backDeceleration: 2000,
                pointerOutRelease: true,
            },
        
            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },
        
            clamplChildOY: false,
        
            // header: headerGameObject,
            // footer: footerGameObject,
        
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
        
                panel: 0,
                // panel: {
                //    top: 0,
                //    bottom: 0,
                //    left: 0,
                //    right: 0,
                //},
                header: 0,
                footer: 0,
            },
        
            expand: {
                header: true,
                footer: true,
            },
        
            align: {
                header: 'center',
                footer: 'center',
            },
        
            // name: '',
            // draggable: false,
            // sizerEvents: false,
        });
        
    }
    update() {
    }
}