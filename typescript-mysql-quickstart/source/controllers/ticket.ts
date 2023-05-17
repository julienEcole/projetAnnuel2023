import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'Ticket';

const getAllTicket = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all ticket.');

    let query = 'SELECT * FROM ticket';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved ticket: ', results);

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

const createTicket = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting ticket');

    if(!req.body || !req.body.etat_id || req.body.urgence_id || !req.body.type_ticket_id || !req.body.description_bug){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le put, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const etat_id : number = req.body.etat_id;
    const urgence_id : number = req.body.urgence_id;
    const type_ticket_id : number = req.body.type_ticket_id;
    const description_bug : string = req.body.description_bug;

    if(description_bug.length < 1){
        res.status(400);
        res.send("la description est trop courte.");
        return;
    }
    let query = `INSERT INTO ticket (etat_id, urgence_id, type_ticket_id, description_bug) VALUES (${etat_id}, ${urgence_id}, ${type_ticket_id}, "${description_bug}")`;
    
    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'ticket created: ', result);

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

const getOneTicketById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one user by id.');
    if(!req.params.idTicket){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du ticket");
        return;
    }
    const query = `SELECT * FROM ticket WHERE ticket.ticket_id = ${req.params.idTicket}`;

    

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved ticket : ', results);

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

const updateOneTicketById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'updating one ticket by id.');
    const isInt : RegExp = new RegExp("[0-9]*")
    if(!req.params || !req.body || !req.params.idTicket || !isInt.test(req.params.idTicket)){
        res.status(400);
        res.send(`erreur, les arguments doivent être le mail ou l'id de l'utilisateur`); //\n req.params.idTicket = ${req.params.idTicket}
        return;
    }
    if(!req.body.etat_id && !req.body.urgence_id && !req.body.type_ticket_id && !req.body.description_bug){
        res.status(400);
        res.send(`erreur, le body doit contenir les informations a mettre a jours`); //\n req.params.idTicket = ${req.params.idTicket}
        return;
    }
    
    const etat_id : number = req.body.etat_id;
    const urgence_id : number = req.body.urgence_id;
    const type_ticket_id : number = req.body.type_ticket_id;
    const description_bug : string = req.body.description_bug;
    let query = `UPDATE ticket SET `
    if(etat_id){    //ne surtout pas enlever espace avant virgule!!
        query += `etat_id = ${etat_id} ,`
    }
    if(urgence_id){
        query += `urgence_id = ${urgence_id} ,`
    }
    if(type_ticket_id){
        query += `type_ticket_id = ${type_ticket_id} ,`
    }
    if(description_bug){
        query += `description_bug = "${description_bug}" `
    }
    query = query.substring(0, query.length - 1)

    query += `WHERE utilisateur.utilisateur_id = ${req.params.idTicket}`
    
    logging.info(NAMESPACE,"ma query = ", query);

    

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'updating users: ', results);

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

const DeleteOneTicketById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one ticket by id.');
    if(!req.params.idTicket){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du ticket");
        return;
    }
    const query = `DELETE * FROM ticket WHERE ticket.ticket_id = ${req.params.idTicket}`;

    

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'delete ticket : ', results);

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

export default {getAllTicket, createTicket, getOneTicketById, updateOneTicketById};