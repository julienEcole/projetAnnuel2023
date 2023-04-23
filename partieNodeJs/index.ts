import {config} from "dotenv";
import * as express from "express"
config({ path: '../.env' });

const app = express();

async function startServer():Promise<void> {
    // const connexion = await mongoose.connect(process.env.MONGODB_URI as string,{
    //     auth:{
    //         username: process.env.MONGODB_USER as string,
    //         password: process.env.MONGODB_PASSWORD as string
    //     },
    //     authSource: "admin"
    // });
    // console.log(connexion);

    // const temp = await AnimalModel.create({
    //     isFemale:false,
    //     name:"viceix",
    //     type: "gobgonlin",
    //     birthDate:new Date()
    // });
    console.log("TODO startup server")
}

app.listen(process.env.PORT,function(){
    console.log(`Serveur listening on port ${process.env.API_NODEJS_PORT}`);
});

startServer().catch(function(err):void{
    console.log(err);
});

console.log("hello world");