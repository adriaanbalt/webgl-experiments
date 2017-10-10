//   PIXEL CLUB LOADER
//
//   The below code injects a script tag pointing to your src/index.js file
//   in whatever examples folder we happen to be in.  Browserify gets run
//   inline on your code, so it might take a second the first time, but it
//   gets cached.
var VERSION = "0.1.0"
  , COLORS = ['#fe938c','#e6b89c','#ead2ac','#9cafb7','#4281a4']
  , CONSOLE_STYLE = `background: #000; color: ${COLORS[0]}; padding: 5px;`;

//   get some information about where we are
var p = window.location.pathname.split('/')  //   split the url path into an array
  , f = p[p.length-1]                        //   the last item is the filename
  , dir = p[2];                              //   the example directory name is at index 2

//   generate the path to this project's browserified src/index.js file
var scriptPath = `/js/${dir}/index.js`;

//   and then generate a script tag pointing to it, and add it to the DOM
var scriptElement = document.createElement('script');
scriptElement.setAttribute("type","text/javascript");
scriptElement.setAttribute("src", scriptPath);
document.body.appendChild( scriptElement );


console.log(`%c  ⚡︎ Heyo it's the Pixel Club loader - version ${VERSION}. ⚡︎  Injecting ${scriptPath}...   `, CONSOLE_STYLE);

//   And now we're dynamically injecting javascript.  And with no frickin' libraries.
