

import { NextFunction, Request, Response } from 'express';
import logging from '../../config/logging';
import { executeSQLCommand } from '../shared/executeCommand';

//

const NAMESPACE = 'notification';

const createNotification = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting Notification');

    if(!req.body || !req.body.critique_id || !req.body.atelier_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const critique_id : number = parseInt(req.body.critique_id);
    const atelier_id : number = parseInt(req.body.atelier_id);
    const is_readed : boolean = false;

    let query = `INSERT INTO notification (critique_id, atelier_id, is_readed) VALUES (${critique_id}, ${atelier_id}, ${is_readed})`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Notification created: ');
};

// CREATE TABLE IF NOT EXISTS notification (
//     service_id INT NOT NULL REFERENCES `service`(service_id),
//     probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
//     is_readed BOOLEAN NOT NULL,
//     PRIMARY KEY(service_id,probleme_id)
// );

const getAllProblemeFromService = async (req: Request, res: Response, next: NextFunction) => {   //TODO
    logging.info(NAMESPACE, 'Getting all Service by probleme_id.');
    if(!req.params.service_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du service");
        return;
    }
    const query = `SELECT probleme.* FROM notification, probleme WHERE notification.service_id = ${parseInt(req.params.service_id)} AND notification.probleme_id = probleme.probleme_id;` + 
    `UPDATE notification SET is_readed = ${true} WHERE notification.service_id = ${parseInt(req.params.service_id)} AND notification.probleme_id = probleme.probleme_id;`;
    

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved probleme list : ');
};

const getAllServiceFromProbleme = async (req: Request, res: Response, next: NextFunction) => {   //TODO
    logging.info(NAMESPACE, 'Getting one Notification by id.');
    if(!req.params.probleme_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du probleme");
        return;
    }
    const query = `SELECT service.* FROM notification, atelier WHERE notification.probleme_id = ${parseInt(req.params.probleme_id)} AND notification.service_id = service.service_id`
    + `UPDATE notification SET is_readed = ${true} WHERE notification.probleme_id = ${parseInt(req.params.probleme_id)} AND notification.service_id = service.service_id`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved service list : ');
};

const updateOneNotificationById = async (req: Request, res: Response, next: NextFunction) => {
    res.status(403);
        res.send("erreur, Cette table n'est pas sensé être update");
    return;
}; 

const DeleteOneNotificationById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one Notification by id.');
    if(!req.body || !req.body.utilisateur_id || !req.body.atelier_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le DELETE, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const critique_id : number = parseInt(req.body.critique_id);
    const atelier_id : number = parseInt(req.body.atelier_id);
    const query = `DELETE FROM notification WHERE notification.critique_id = ${critique_id} AND notification.atelier_id = ${atelier_id}`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete utilisateur_atelier : ');
};

export default {/*getAllNotification,*/ createNotification, getAllProblemeFromService, getAllServiceFromProbleme, updateOneNotificationById, DeleteOneNotificationById};