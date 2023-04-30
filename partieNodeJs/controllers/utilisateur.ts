import { NextFunction, Request, Response } from "express";
import loggin from "./loggin";
import { Connect, Query } from "../config/mysql";

const NAMESPACE = "utilisateur";

const getAllUtilisateur = (req:Request, res:Response, next: NextFunction) => {
    loggin.info(NAMESPACE, "getting all utilisateur");

    let query = "SELECT * from utilisateur"

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            //console.log("le resultat a bien été trouvé \n")   //DEBUG
            return res.status(200).json({
                results
            })
        })
        .catch(error => {
            loggin.error(NAMESPACE,error.message,error)
    
            return res.status(500).json({
                message: error.message,
                error
            });
        })
        .finally(() => {
            connection.end();
        })
    })
    .catch(error => {
        loggin.error(NAMESPACE,error.message,error)

        return res.status(500).json({
            message: error.message,
            error
        });
    })
};

export default {getAllUtilisateur}