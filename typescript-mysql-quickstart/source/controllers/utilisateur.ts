import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'Utilisateur';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting utilisateurs');

    if(!req.body){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le put, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const mdp : string = req.body.mdp;
    const mail : string = req.body.mail;
    const role_utilisateur_id : number = req.body.role_utilisateur_id;

    if(mdp.length < 8 || mail.length < 4){
        res.status(400);
        res.send("le mail ou mdp sont trop court pour être vraiment utile.");
        return;
    }
    let query = `INSERT INTO utilisateur (mdp, mail, role_utilisateur_id) VALUES ("${mdp}", "${mail}", ${role_utilisateur_id})`;
    

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'user created: ', result);

                    return res.status(200).json({
                        result
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
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all users.');

    let query = 'SELECT * FROM utilisateur';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved users: ', results);

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
};

const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one user by id.');

    let query = `SELECT * FROM utilisateur WHERE utilisateur.utilisateur_id = ${req.params.idUser}`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved users: ', results);

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
};

export default { createUser, getAllUsers, getOneUser };
