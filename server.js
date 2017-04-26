const http   = require('http');
const app    = require('./app');
const models = require('./models');

const port = process.env.PORT || 3000;

models.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server listening on port ${port}`));
});
