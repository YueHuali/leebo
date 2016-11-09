var config = require('./config');
var qs = require("querystring");
var http = require("http");

/***********************************************************************************
    Normal signup for user , adding his details in database
***********************************************************************************/

exports.addnewusr = function(req, res) {

}

/***********************************************************************************
                Login user after passport-local strategy pass
***********************************************************************************/

exports.loginusr = function(request, response) {
  var user = request.body;
  console.log('request body = ', request.body);
  console.log('config:', config);
  var options = {
    "method": "POST",
    "hostname": config.OAUTH2_SERVER,
    "port": config.OAUTH2_PORT,
    "path": config.OAUTH2_ACCESS_TOKEN,
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "authorization": config.OAUTH2_BASIC_AUTH
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);

      var jwt = JSON.parse(body.toString());
      if (jwt.error) {
        response.status(200).json(jwt);
        return;
      }
      response.status(200).json({
        token : jwt,
        user: {
          username: user.username
        }
      });
    });
  });

  var postParam = qs.stringify({
    grant_type: 'password',
    scope: 'read',
    username: user.username,
    password: user.password
  });
  console.log('oauth2 postParam: ', postParam);
  req.write(
    postParam
  );
  req.end();
}
