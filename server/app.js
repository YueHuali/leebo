var express = require('express');
var logger = require('morgan'); //remove on final
var bodyParser = require('body-parser');
var config = require('./API/config');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-XSRF-TOKEN, Origin, X-Requested-With, Content-Type, Accept ,Authorization");
    next();
});


app.use(logger('dev')); //remove on final
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
require('./routes/api')(app);

app.listen(config.PORT);
console.log('Server PORT: ', config.PORT);
module.exports = app;
