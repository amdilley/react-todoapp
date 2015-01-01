var connect     = require('connect');
var express     = require('express');
var serveStatic = require('serve-static');
var sass        = require('node-sass-middleware');

var srcPath  = __dirname + '/css/sass';
var destPath = __dirname + '/public/styles';

var app = express();

app.use(
  sass({
      src: srcPath,
      dest: destPath,
      debug: true,
      outputStyle: 'compressed',
      prefix: '/styles'
  }),
  serveStatic(__dirname + '/public')
);

app.get('/', function (req, res) {
  res.render('index', {});
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Server listening on port ' + port);
