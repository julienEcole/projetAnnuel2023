import { promises } from "dns";
import {config} from "dotenv";
import * as database from "mysql2"
config()

const params = {
    host: process.env.MYSQLDB_HOST_SERVER,
    //port: Number(process.env.MYSQLDB_LOCAL_PORT),
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE
}

const Connect = async () => 
    new Promise<database.Connection>((resolve, reject) => {
        const connexion = database.createConnection(params);

        connexion.connect((error)=> {
            if(error){
                reject(error);
                return;
            }
            resolve(connexion);
        })
    })

const Query =async (connection :database.Connection, query:string) => 
    new Promise((resolve, reject) => {
        connection.query(query,connection,(error, result) => {
            if(error){
                reject(error);
                return;
            }
            resolve(connection);
        });
    });

export {Connect,Query};