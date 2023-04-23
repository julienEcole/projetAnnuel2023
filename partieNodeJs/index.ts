import {config} from "dotenv";
import * as express from "express"
config({ path: '../.env' });

const app = express();

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