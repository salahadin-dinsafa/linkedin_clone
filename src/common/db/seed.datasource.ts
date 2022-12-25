import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { config } from 'dotenv'
config();

import { ormConfig } from "./ormconfig.datasource";

const ormSeed = (): PostgresConnectionOptions => ({
    ...ormConfig(),
    migrations: [__dirname + "/seeds/**/*.{ts,js}"]
})

const datasource: DataSource = new DataSource(ormSeed());
export default datasource;