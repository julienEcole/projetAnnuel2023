

import { NextFunction, Request, Response } from 'express';
import logging from '../../../config/logging';
import { executeSQLCommand } from '../../shared/executeCommand';

//

const NAMESPACE = 'probleme_service';

const createProbleme_Service = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting Probleme_Service');

    if(!req.body || !req.body.utilisateur_id || !req.body.atelier_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const utilisateur_id : number = parseInt(req.body.utilisateur_id);
    const atelier_id : number = parseInt(req.body.atelier_id);

    let query = `INSERT INTO utilisateur_atelier (utilisateur_id, atelier_id) VALUES (${utilisateur_id}, ${atelier_id})`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Probleme_Service created: ');
};

// CREATE TABLE IF NOT EXISTS probleme_service (
//     probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
//     service_id INT NOT NULL REFERENCES service(service_id),
//     PRIMARY KEY(service_id,probleme_id)
// );

const getAllServiceFromProbleme = async (req: Request, res: Response, next: NextFunction) => {   //TODO
    logging.info(NAMESPACE, 'Getting all Service by probleme_id.');
    if(!req.params.probleme_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du Probleme_Service");
        return;
    }
    const query = `SELECT service.* FROM probleme_service, service WHERE probleme_service.probleme_id = ${req.params.probleme_id} AND probleme_service.service_id = service.service_id`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved atelier list : ');
};

const getAllProblemeFromService = async (req: Request, res: Response, next: NextFunction) => {   //TODO
    logging.info(NAMESPACE, 'Getting one Probleme_Service by id.');
    if(!req.params.atelier_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du Probleme_Service");
        return;
    }
    const query = `SELECT probleme.* FROM probleme_service, probleme WHERE probleme_service.service_id = ${req.params.service_id} AND probleme_service.probleme_id = probleme.probleme_id`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved user list : ');
};

const updateOneProbleme_ServiceById = async (req: Request, res: Response, next: NextFunction) => {
    res.status(403);
        res.send("erreur, Cette table n'est pas sensé être update");
    return;
}; 

const DeleteOneProbleme_ServiceById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one Probleme_Service by id.');
    if(!req.body || !req.body.utilisateur_id || !req.body.atelier_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le DELETE, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const utilisateur_id : number = parseInt(req.body.utilisateur_id);
    const atelier_id : number = parseInt(req.body.atelier_id);
    const query = `DELETE FROM utilisateur_atelier WHERE utilisateur_atelier.utilisateur_id = ${utilisateur_id} AND utilisateur_atelier.atelier_id = ${atelier_id}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete utilisateur_atelier : ');
};

export default {/*getAllProbleme_Service,*/ createProbleme_Service, getAllServiceFromProbleme, getAllProblemeFromService,  updateOneProbleme_ServiceById, DeleteOneProbleme_ServiceById};


// CREATE TABLE IF NOT EXISTS utilisateur_atelier (
//     utilisateur_id INT PRIMARY KEY NOT NULL REFERENCES utilisateur(utilisateur_id),
//     atelier_id INT PRIMARY KEY NOT NULL REFERENCES atelier(atelier_id)
// );