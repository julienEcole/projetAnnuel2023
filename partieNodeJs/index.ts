import * as express from "express";
import {config} from "dotenv";
config({ path: '../.env' });    //.env var
import loggin from './controllers/loggin';
import bodyParser = require('body-parser');
import utilisateur from './controllers/utilisateur';
import * as http from "http"


const NAMESPACE = 'Server';
const router = express();

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    loggin.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        loggin.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
router.use('/utilisateur', utilisateur.getAllUtilisateur);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(process.env.API_NODEJS_PORT, () => loggin.info(NAMESPACE, `Server is running ${process.env.API_NODEJS_BACK_HOST}:${process.env.API_NODEJS_PORT}`));
// import * as database from "mysql2"
// 
// config({ path: '../.env' });




 

// db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows[0].solution);
// });

// async function startServer():Promise<void> {
    
//     const db = database.createConnection({
//         host: process.env.MYSQLDB_HOST_SERVER,
//         //port: Number(process.env.MYSQLDB_LOCAL_PORT),
//         user: process.env.MYSQLDB_USER,
//         password: process.env.MYSQLDB_ROOT_PASSWORD,
//         database: process.env.MYSQLDB_DATABASE
//     });
    
//     db.connect(
//         function (err) {
//             if (err) {
//                 console.log("!!! Cannot connect to the database !!! Error:");
//                 throw err;
//             }
//             else
//             {
//                 // console.log("Connection established with the database.");   //DEBUG
//                 const app = express();
//                 app.get('/', (req, res) => {
//                     res.send("What's up doc ?!");
//                 });
                
//                 app.get('/ping', function(req, res) {
//                     res.send("pong");
//                 });
//                 //queryDatabase();
//                 app.listen(process.env.API_NODEJS_PORT,function(){
//                     console.log(`server running : ${process.env.API_NODEJS_BACK_HOST}:${process.env.API_NODEJS_PORT}`);
//                 });
//             }
//         }
//     );
//     // console.log(db);    //DEBUG
// }


// startServer().catch(function(err):void{
//     console.log(err);
// });

// console.log("hello world");