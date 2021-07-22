"use strict";
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const config = {
    development: {
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.DATABASE_PORT || 5432,
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'capstone',
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrationsTableName: 'migrations',
        migrations: ['dist/**/migration/*.js'],
        synchronize: true,
        migrationsRun: false,
        logging: false,
        namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy()
    },
};
const env = process.env.NODE_ENV || 'development';
module.exports = config['development'];
//# sourceMappingURL=database.config.js.map