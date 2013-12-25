About
=====

What's this?
------------
lib3DS is a tiny JavaScript library to help you write games and applications that run on the Nintendo 3DS Web Browser. It can set up three different display modes and handle D-pad and A button input.

Who made it?
------------
Me, [Andrea Faulds](http://ajf.me/). I admittedly took some ideas on how to deal with positioning from Andy Smith's [jFox demo](http://3ds.andysmith.co.uk/jFox.html) and the 3DSPlaza [Sidescroller Demo](http://www.3dsplaza.com/apps/sidescroller/). However all the code contained within this library was written by me.

What license is it under?
-------------------------
The MIT license, see the LICENSE file.

How do I use it?
----------------
There are three display mode functions, and the intention is that only one is called. Your page's `body` should be entirely empty except for your script includes. The mode function will set things up for you, returning one or two DOM elements (depending on the mode). You should display everything inside those one or two elements and not append anything to the body yourself.

The button handling will overwrite existing `.onkeydown` and `.onkeyup` handlers for `document.body`, if any, but you can otherwise use it in any page.

API
===

The "bouncing" mentioned is due to the left, right, up or down keys moving the page. In some modes, due to the page's size and positioning, the browser will not let the page move in that direction. However, in the cases where it will, lib3DS will move the page back. This is unfortunately not always instant, leading to the page shifting briefly while it "bounces" back. It won't break your button event handlers or anything like that, but it will be annoying, so if you wish to use a mode where pressing a certain button causes "bouncing", you should probably avoid using that button in your control scheme.

* **lib3DS.initMode320**()
  
  Sets up display mode and returns object containing one key:
  * **bottomScreen** - DOM element of div showing on bottom screen of 3DS
  In this mode, there is no top screen. The bottom screen is 320x212px.
  No keys cause bouncing by being pressed in this mode.
  
* **lib3DS.initModeDual320**()
  
  Sets up display mode and returns object containing two keys:
  * **topScreen** - DOM element of div showing on top screen of 3DS
  * **bottomScreen** - DOM element of div showing on bottom screen of 3DS
  In this mode, top screen is 320x218px and the bottom screen is 320x212px.
  Pressing the up key may cause bouncing.

* **lib3DS.initMode400320**()
  
  Sets up display mode and returns object containing two keys:
  * **topScreen** - DOM element of div showing on top screen of 3DS
  * **bottomScreen** - DOM element of div showing on bottom screen of 3DS
  In this mode, top screen is 400x218px and the bottom screen is 320x212px.
  Pressing the left, right or down keys may cause bouncing.

* **lib3DS.handleButtons**([*onkeydown*[, *onkeyup*]])
  
  Registers event handlers for buttons. onkeydown and onkeyup will be
  called when a button is depressed or released, respectively. The name of
  the button ("A", "left", "up", "right" or "down") will be passed as the
  first parameter when calling them. Both parameters are optional and if
  a falsey value (null, false, undefined, etc.) is passed instead, the
  function will not be called.
