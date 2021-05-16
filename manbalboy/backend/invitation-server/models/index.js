const Sequelize = require('sequelize');
const User = require('./User');
const dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG

const db = {};

const sequelize = new Sequelize(process.env.DATABASE,
    process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    timezone: '+09:00', //한국 시간 셋팅
    operatorsAliases: Sequelize.Op,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    port: process.env.DB_PORT
});

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

User.sync()

// User.associate(db);

module.exports = db;