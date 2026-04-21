require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.POSTGRESQL_PASSWORD,
    {
        host: "localhost",
        dialect: 'postgres',
        port: 5432,
    }
);

// Test connection
sequelize.authenticate()
    .then(() => console.log('Successfully connected to database:', process.env.DATABASE_NAME))
    .catch((err) => console.error('Connection error:', err.message));

module.exports = sequelize;