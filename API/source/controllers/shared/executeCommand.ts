import { NextFunction, Request, Response } from "express"
import logging from "../../config/logging";
import { Connect, Query } from "../../config/mysql";

export async function executeSQLCommand(req: Request, res: Response, next: NextFunction, NAMESPACE:string, sqlCommand:string, logMessage:string){
    Connect()
        .then((connection) => {
            Query(connection, sqlCommand)
                .then((results) => {
                    logging.info(NAMESPACE, logMessage, results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);
                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
}