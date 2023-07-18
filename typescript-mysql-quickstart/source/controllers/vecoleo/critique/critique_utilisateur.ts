

import { NextFunction, Request, Response } from 'express';
import logging from '../../../config/logging';
import { executeSQLCommand } from '../../shared/executeCommand';

//

const NAMESPACE = 'critique_utilisateur';

const createCritique_Utilisateur = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting Critique_Utilisateur');

    if(!req.body || !req.body.utilisateur_id || !req.body.critique_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const utilisateur_id : number = parseInt(req.body.utilisateur_id);
    const critique_id : number = parseInt(req.body.critique_id);

    let query = `INSERT INTO critique_utilisateur (utilisateur_id, critique_id) VALUES (${utilisateur_id}, ${critique_id})`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Critique_Utilisateur created: ');
};

// CREATE TABLE IF NOT EXISTS critique_utilisateur (
//     critique_id INT NOT NULL REFERENCES critique(critique_id),
//     utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id),
//     PRIMARY KEY(critique_id,utilisateur_id)
// );

const getAllCritiqueFromUtilsateur = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all Service by utilisateur_id.');
    if(!req.params.utilisateur_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du Critique_Utilisateur");
        return;
    }
    const query = `SELECT critique.* FROM critique_utilisateur, critique WHERE critique_utilisateur.utilisateur_id = ${req.params.utilisateur_id} AND critique_utilisateur.critique_id = critique.critique_id`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved atelier list : ');
};

const getAllUtilisateurFromCritique = async (req: Request, res: Response, next: NextFunction) => {   //a revoir si pertinent
    logging.info(NAMESPACE, 'Getting one Critique_Utilisateur by id.');
    if(!req.params.critique_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du Critique_Utilisateur");
        return;
    }
    const query = `SELECT utilsateur.* FROM critique_utilisateur, utilsateur WHERE critique_utilisateur.critique_id = ${req.params.critique_id} AND critique_utilisateur.utilisateur_id = utilsateur.utilisateur_id`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved user list : ');
};

const updateOneCritique_UtilisateurById = async (req: Request, res: Response, next: NextFunction) => {
    res.status(403);
        res.send("erreur, Cette table n'est pas sensé être update");
    return;
}; 

const DeleteOneCritique_UtilisateurById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one Critique_Utilisateur by id.');
    if(!req.body || !req.body.utilisateur_id || !req.body.critique_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le DELETE, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const utilisateur_id : number = parseInt(req.body.utilisateur_id);
    const critique_id : number = parseInt(req.body.critique_id);
    const query = `DELETE FROM critique_utilisateur WHERE critique_utilisateur.utilisateur_id = ${utilisateur_id} AND critique_utilisateur.critique_id = ${critique_id}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete critique_utilisateur : ');
};

export default {/*getAllCritique_Utilisateur,*/ createCritique_Utilisateur, getAllCritiqueFromUtilsateur, getAllUtilisateurFromCritique,  updateOneCritique_UtilisateurById, DeleteOneCritique_UtilisateurById};