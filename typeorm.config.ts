import {config} from "dotenv"
import { DataSource } from "typeorm";

const env= process.env.NODE_ENV || 'development'

config({
    override: true,
    path:`.env.${env}`,
    debug:true //para validar que se está modificando
})

export default new DataSource({
    type:'postgres',
    host:process.env.HOST,
    port: +process.env.PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities:['src/**/*.entity.ts'],
    migrations:['src/database/migrations/*.ts']
});