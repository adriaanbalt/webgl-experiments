var _ = require('underscore')
  , inherits = require('inherits')
  , PIXI = require('pixi.js');



var PixiScene = function(){

  var scene = {

    updateEvent: null,
    renderer: null,
    stage: null,
    width: 0,
    height: 0,
    mousePosition: new PIXI.Point(),

    setup: function(){
      // Let pixi determine canvas or webGL renderer
      var renderer = new PIXI.autoDetectRenderer(800, 600);

      // add renderer canvas to the dom
      document.body.appendChild(renderer.view);

      // You need to create a root container that will hold the scene you want to draw.
      var stage = new PIXI.Container();
      stage.interactive = true;

      // subscribe to resize events
      window.addEventListener( 'resize', this.onWindowResize.bind( this ), false );
      stage.on( 'mousemove', this.onMouseMove.bind( this ) );

      this.updateEvent = new Event('update');
      this.renderer = renderer;
      this.stage = stage;
      this.onWindowResize();
    },

    animate: function(){
      // dispatch update event
      window.dispatchEvent( this.updateEvent );

      // this is the main render call that makes pixi draw your container and its children.
      scene.renderer.render( scene.stage );

      // start the timer for the next animation loop
      requestAnimationFrame( this.animate.bind( this ) );
    },

    onWindowResize: function(){
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      // update renderer
      this.renderer.resize( this.width, this.height );
    },

    onMouseMove: function( evt ){
        this.mousePosition.x = evt.data.global.x;
        this.mousePosition.y = evt.data.global.y;
    }
  }

  scene.setup();
  scene.animate();
  return scene;
}

module.exports = PixiScene;
