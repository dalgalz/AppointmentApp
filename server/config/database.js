// require mongoose
const mongoose = require('mongoose');
// require the fs module for loading model files
const fs = require('fs');
// require path for getting the models path
const path = require('path');
// create a variable that points to the path where all of the models live
const models_path = path.resolve('./server/models');
// connect to mongoose!
mongoose.connect('mongodb://0.0.0.0/appointment');
mongoose.connection.on('connected', () => console.log('connected to mongodb'));

mongoose.Promise = global.Promise;

// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
  }
});
