var path = require('path')
  , readJsonSync = require('read-json-sync');

var SketchTemplate = function( filePath ) {
  this.url = filePath;
  this.pathRaw = this.path = path.parse( this.url );
  this.name = this.pathRaw.dir.split('/')[2];
  this.packageJson = readJsonSync(`${this.pathRaw.dir}/package.json`);
  console.log(`added example: `.grey + `/js/${this.name}/index.js`.blue);
}

module.exports = SketchTemplate;
