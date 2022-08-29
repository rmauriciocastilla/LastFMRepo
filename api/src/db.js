const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
const modelUser = require('./models/User');
const modelCompra = require('./models/Compra');
dotenv.config();

const sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

modelUser(sequelize);
modelCompra(sequelize);

module.exports = {
    ...sequelize.models,
    db: sequelize
}


