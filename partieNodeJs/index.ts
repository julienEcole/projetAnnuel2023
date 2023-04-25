import {config} from "dotenv";
import * as database from "mysql2"
import * as express from "express";
config({ path: '../.env' });



const app = express();
const db = database.createConnection({
    host: process.env.MYSQLDB_HOST_SERVER,
    port: Number(process.env.MYSQLDB_LOCAL_PORT),
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE
});

console.log(db);

async function startServer():Promise<void> {

    console.log("TODO startup server")
}

app.listen(process.env.PORT,function(){
    console.log(`Serveur listening on port ${process.env.API_NODEJS_PORT}`);
});

startServer().catch(function(err):void{
    console.log(err);
});

console.log("hello world");