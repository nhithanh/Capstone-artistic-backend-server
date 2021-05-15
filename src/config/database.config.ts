import { SnakeNamingStrategy } from "typeorm-naming-strategies";


const config = {
    // production: {
    //     type: 'postgres',
    //     host: process.env.MYSQL_HOST || 'localhost',
    //     port: process.env.MYSQL_PORT || 5432,
    //     username: process.env.MYSQL_USER || 'postgres',
    //     password: process.env.MYSQL_PASSWORD || 'postgres',
    //     database: process.env.MYSQL_DATABASE || 'capstone',
    //     entities: ['dist/**/*.entity{.ts,.js}'],
    //     migrationsTableName: 'migrations',
    //     migrations: ['dist/**/migration/*.js'],
    //     synchronize: true,
    //     migrationsRun: false,
    //     logging: false,
    // },
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
      namingStrategy: new SnakeNamingStrategy()
    },
  };
  
  const env = process.env.NODE_ENV || 'development';

  export = config['development'];
  