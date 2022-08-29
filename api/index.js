const dotenv = require('dotenv');
const server = require('./src/app');
const {db} = require('./src/db');
dotenv.config();

db.sync({ force: false }).then(() => {
    server.listen(process.env.PORT, () => {
      console.log('Listening on port 3001'); // eslint-disable-line no-console
    });
  });