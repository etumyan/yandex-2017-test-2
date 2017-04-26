const express     = require('express');
const path        = require('path');
const bodyParser  = require('body-parser');
const handlebars  = require('express-handlebars');
const routes      = require('./routes/index');
const schools     = require('./routes/api/schools');
const rooms       = require('./routes/api/rooms');
const lectures    = require('./routes/api/lectures');

const app          = express();

app.engine('handlebars', handlebars.create({
  defaultLayout: 'main',
  helpers: {
    eq: (a, b) => a == b,
    date: (date) => { return date; }
  }
}).engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',             routes);
app.use('/api/schools',  schools);
app.use('/api/rooms',    rooms);
app.use('/api/lectures', lectures);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

module.exports = app;
