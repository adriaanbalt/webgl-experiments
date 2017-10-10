var Reveal = require( '../bower_components/reveal.js/js/reveal' );
var head = require( '../bower_components/reveal.js/lib/js/head.min.js' );
Reveal.initialize({
  history: true,
  dependencies: [
    { src: '../bower_components/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
  ]

});
