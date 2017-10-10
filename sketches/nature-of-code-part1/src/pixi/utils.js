var _ = require('underscore')
  , inherits = require('inherits')
  , PIXI = require('pixi.js')
  , tinycolor = require('tinycolor2');



var utils = {

    // -----------------------------------------------------------------------------
    rgbToInt: function( obj ){
        var color = tinycolor( obj ).toHexString();
        return parseInt(color.replace(/^#/, ''), 16);
    },

    // -----------------------------------------------------------------------------

    makeCircle: function( x, y, radius ){
        var graphics = new PIXI.Graphics();
        graphics.lineStyle( 2, 0x999999 );
        graphics.beginFill( 0xffffff );
        graphics.drawCircle( x, y, 40.0 );
        graphics.endFill();
        var circle = new PIXI.Sprite( graphics.generateTexture() );
        circle.anchor = new PIXI.Point( 0.5, 0.5 );
        return circle;
    },

    add: function( pt1, pt2 ) {
        pt1.x += pt2.x;
        pt1.y += pt2.y;
    }
}

module.exports = utils;
