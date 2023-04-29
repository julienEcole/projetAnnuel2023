import {config} from "dotenv";
import * as database from "mysql2"
import * as express from "express";
config({ path: '../.env' });




 

// db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows[0].solution);
// });

async function startServer():Promise<void> {
    
    const db = database.createConnection({
        host: process.env.MYSQLDB_HOST_SERVER,
        //port: Number(process.env.MYSQLDB_LOCAL_PORT),
        user: process.env.MYSQLDB_USER,
        password: process.env.MYSQLDB_ROOT_PASSWORD,
        database: process.env.MYSQLDB_DATABASE
    });
    
    db.connect(
        function (err) {
            if (err) {
                console.log("!!! Cannot connect to the database !!! Error:");
                throw err;
            }
            else
            {
                console.log("Connection established with the database.");
                const app = express();
                app.get('/', (req, res) => {
                    res.send("What's up doc ?!");
                });

                app.get('/ping', function(req, res) {
                    res.send("pong");
                });
                //queryDatabase();
                app.listen(process.env.API_NODEJS_PORT,function(){
                    console.log(`server running : http://${process.env.API_NODEJS_BACK_HOST}:${process.env.API_NODEJS_PORT}`);
                });
            }
        }
    );
    console.log(db);    
}


startServer().catch(function(err):void{
    console.log(err);
});

// console.log("hello world");