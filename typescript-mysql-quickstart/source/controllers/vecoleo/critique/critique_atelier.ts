

import { NextFunction, Request, Response } from 'express';
import logging from '../../../config/logging';
import { executeSQLCommand } from '../../shared/executeCommand';

//

const NAMESPACE = 'critique_atelier';

const createCritique_Atelier = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting Critique_Atelier');

    if(!req.body || !req.body.critique_id || !req.body.atelier_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const critique_id : number = req.body.critique_id;
    const atelier_id : number = req.body.atelier_id;

    let query = `INSERT INTO critique_atelier (critique_id, atelier_id) VALUES (${critique_id}, ${atelier_id})`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Critique_Atelier created: ');
};

// CREATE TABLE IF NOT EXISTS critique_atelier (
//     critique_id INT NOT NULL REFERENCES critique(critique_id),
//     atelier_id INT NOT NULL REFERENCES atelier(atelier_id),
//     PRIMARY KEY(critique_id,atelier_id)
// );

const getAllCritiqueFromAtelier = async (req: Request, res: Response, next: NextFunction) => {   //TODO
    logging.info(NAMESPACE, 'Getting all Service by probleme_id.');
    if(!req.params.atelier_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du Critique_Atelier");
        return;
    }
    const query = `SELECT critique.* FROM critique_atelier, critique WHERE critique_atelier.atelier_id = ${req.params.atelier_id} AND critique_atelier.critique_id = critique.critique_id`;    //NOT WORKING
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved atelier list : ');
};

const getAllAtelierFromCritique = async (req: Request, res: Response, next: NextFunction) => {   //TODO
    logging.info(NAMESPACE, 'Getting one Critique_Atelier by id.');
    if(!req.params.atelier_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du Critique_Atelier");
        return;
    }
    const query = `SELECT atelier.* FROM critique_atelier, atelier WHERE critique_atelier.critique_id = ${req.params.critique_id} AND critique_atelier.atelier_id = atelier.atelier_id`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved user list : ');
};

const updateOneCritique_AtelierById = async (req: Request, res: Response, next: NextFunction) => {
    res.status(403);
        res.send("erreur, Cette table n'est pas sensé être update");
    return;
}; 

const DeleteOneCritique_AtelierById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one Critique_Atelier by id.');
    if(!req.body || !req.body.utilisateur_id || !req.body.atelier_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le DELETE, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const critique_id : number = req.body.critique_id;
    const atelier_id : number = req.body.atelier_id;
    const query = `DELETE * FROM critique_atelier WHERE critique_atelier.critique_id = ${critique_id} AND critique_atelier.atelier_id = ${atelier_id}`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete utilisateur_atelier : ');
};

export default {/*getAllCritique_Atelier,*/ createCritique_Atelier, getAllCritiqueFromAtelier, getAllAtelierFromCritique, updateOneCritique_AtelierById, DeleteOneCritique_AtelierById};


// CREATE TABLE IF NOT EXISTS utilisateur_atelier (
//     utilisateur_id INT PRIMARY KEY NOT NULL REFERENCES utilisateur(utilisateur_id),
//     atelier_id INT PRIMARY KEY NOT NULL REFERENCES atelier(atelier_id)
// );