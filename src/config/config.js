const config = {
    development: {
        username: 'doadmin',
        password: process.env.DB_PASSWORD,
        database: 'defaultdb',
        host: 'melodies-do-user-17932018-0.d.db.ondigitalocean.com',
        dialect: 'postgres',
        logging: false,
        port: '25060',
        timezone: '+07:00',
        define: {
            freezeTableName: true,
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};

module.exports = config;
