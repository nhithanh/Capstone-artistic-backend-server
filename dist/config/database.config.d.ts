import { SnakeNamingStrategy } from "typeorm-naming-strategies";
declare const _default: {
    type: string;
    host: string;
    port: string | number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    migrationsTableName: string;
    migrations: string[];
    synchronize: boolean;
    migrationsRun: boolean;
    logging: boolean;
    namingStrategy: SnakeNamingStrategy;
};
export = _default;
