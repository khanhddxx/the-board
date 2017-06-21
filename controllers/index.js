// index.js
// traffic cop to handle all the init of wiring up all the operations that need to be done
(function (controllers) {
  var homeController = require('./homeController');
  var notesController = require('./notesController');
  controllers.init = function (app) {
    homeController.init(app);
    notesController.init(app);
    // add new controller later...
  };
}(module.exports));


// Alternative
// var homeController = require('./homeController');

// module.exports.init = function(app){
//         homeController.init(app);
//     };