var API = require('../API/apiImplementation.js');

module.exports = function (app) {

  app.get('/', function (req, res, next) {res.send('Working');  });//testing
  app.post('/addnewusr', API.addnewusr);
  app.post('/loginusr', API.loginusr);

}
