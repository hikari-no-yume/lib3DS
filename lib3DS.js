(function (lib3DS) {
    // *** INTERNAL VARIABLES ***
    var keyNames = {
        13: 'A',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // *** INTERNAL FUNCTIONS ***
    
    // Adds <meta name=viewport> tag to make 3DS browser zoom page correctly
    function makeMetaViewport(width) {
        var meta;
        meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=' + width + ', initial-scale=1, maximum-scale=1';
        document.head.appendChild(meta);
        return meta;
    }

    // Removes page padding to ensure correct screen alignment
    function removePadding() {
        document.body.style.padding = '0';
        document.body.style.margin = '0';
    }

    // Creates a fixed-size div for a particular screen
    function addScreen(width, height) {
        var screen;
        screen = document.createElement('div');
        screen.style.width = width + 'px';
        screen.style.height = height + 'px';
        screen.style.overflow = 'hidden';
        screen.style.position = 'relative';
        // Centres screen - needed for modes where both screens aren't same size
        screen.style.margin = '0 auto';
        document.body.appendChild(screen);
        return screen;
    }

    // Makes browser constantly scroll to point, "bouncing back" if the arrow
    // keys (or thumb stick) moved the frame.
    function stickTo(x, y) {
        var interval;
        interval = window.setInterval(function () {
            window.scrollTo(x, y);
        }, 0);
        return interval
    }

    // *** PUBLIC API **

    // Sets up display mode and returns object containing one key:
    // "bottomScreen" - DOM element of div showing on bottom screen of 3DS
    // In this mode, there is no top screen. The bottom screen is 320x212px.
    // No keys cause bouncing by being pressed in this mode.
    lib3DS.initMode320 = function () {
        var meta, bottomScreen;
        
        removePadding();
        makeMetaViewport(320);
        bottomScreen = addScreen(320, 212);
        stickTo(0, 0);
        
        return {
            bottomScreen: bottomScreen
        };
    };

    // Sets up display mode and returns object containing two keys:
    // "topScreen" - DOM element of div showing on top screen of 3DS
    // "bottomScreen" - DOM element of div showing on bottom screen of 3DS
    // In this mode, top screen is 320x218px and the bottom screen is 320x212px.
    // Pressing the up key may cause bouncing.
    lib3DS.initModeDual320 = function () {
        var meta, topScreen, bottomScreen;
        
        removePadding();
        makeMetaViewport(320);
        topScreen = addScreen(320, 218);
        bottomScreen = addScreen(320, 212);
        stickTo(0, 218);
        
        return {
            topScreen: topScreen,
            bottomScreen: bottomScreen
        };
    };

    // Sets up display mode and returns object containing two keys:
    // "topScreen" - DOM element of div showing on top screen of 3DS
    // "bottomScreen" - DOM element of div showing on bottom screen of 3DS
    // In this mode, top screen is 400x218px and the bottom screen is 320x212px.
    // Pressing the left, right or down keys may cause bouncing.
    lib3DS.initMode400320 = function () {
        var meta, topScreen, bottomScreen;
        
        removePadding();
        makeMetaViewport(400);
        topScreen = addScreen(400, 218);
        bottomScreen = addScreen(320, 212);
        stickTo(40, 218);
        
        return {
            topScreen: topScreen,
            bottomScreen: bottomScreen
        };
    };

    // Registers event handlers for buttons. onkeydown and onkeyup will be
    // called when a button is depressed or released, respectively. The name of
    // the button ("A", "left", "up", "right" or "down") will be passed as the
    // first parameter when calling them. Both parameters are optional and if
    // a falsey value (null, false, undefined, etc.) is passed instead, the
    // function will not be called.
    lib3DS.handleButtons = function (onkeydown, onkeyup) {
        if (onkeydown) {
            document.body.onkeydown = function (e) {
                if (keyNames.hasOwnProperty(e.which)) {
                    e.preventDefault();
                    onkeydown(keyNames[e.which]);
                    return false;
                }
            };
        }
        if (onkeyup) {
            document.body.onkeyup = function (e) {
                if (keyNames.hasOwnProperty(e.which)) {
                    e.preventDefault();
                    onkeyup(keyNames[e.which]);
                    return false;
                }
            };
        }
    };
}(window.lib3DS = window.lib3DS || {}));
