import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'Utilisateur';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting utilisateurs');

    let { mdp, mail, role_utilisateur_id } = req.body;

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

export default { createUser, getAllUsers };
