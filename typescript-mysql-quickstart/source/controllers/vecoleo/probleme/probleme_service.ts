

import { NextFunction, Request, Response } from 'express';
import logging from '../../../config/logging';
import { executeSQLCommand } from '../../shared/executeCommand';

//utilisateur_atelier = nom de la table

const NAMESPACE = 'utilisateur_atelier';

// const getAllUtilisateur_Atelier = async (req: Request, res: Response, next: NextFunction) => {
//     logging.info(NAMESPACE, 'Getting all Utilisateur_Atelier.');

//     let query = 'SELECT * FROM utilisateur_atelier';

//     return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved Utilisateur_Atelier: ');
// };

const createUtilisateur_Atelier = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting Utilisateur_Atelier');

    if(!req.body || !req.body.utilisateur_id || !req.body.atelier_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const utilisateur_id : number = req.body.utilisateur_id;
    const atelier_id : number = req.body.atelier_id;

    let query = `INSERT INTO utilisateur_atelier (utilisateur_id, atelier_id) VALUES (${utilisateur_id}, ${atelier_id})`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Utilisateur_Atelier created: ');
};

const getAllAtelierFromUtilisateur = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all Utilisateur_Atelier by utilisateur_id.');
    if(!req.params.utilisateur_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du Utilisateur_Atelier");
        return;
    }
    const query = `SELECT atelier.* FROM utilisateur_atelier, atelier WHERE utilisateur_atelier.utilisateur_id = ${req.params.utilisateur_id} AND utilisateur_atelier.atelier_id = atelier.atelier_id`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved atelier list : ');
};

const getAllUtilisateurFromAtelier = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one Utilisateur_Atelier by id.');
    if(!req.params.atelier_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du Utilisateur_Atelier");
        return;
    }
    const query = `SELECT utilisateur.* FROM utilisateur_atelier, utilisateur WHERE utilisateur_atelier.atelier_id = ${req.params.atelier_id} AND utilisateur_atelier.utilisateur_id = utilisateur.utilisateur_id`; 
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved user list : ');
};

const updateOneUtilisateur_AtelierById = async (req: Request, res: Response, next: NextFunction) => {
    res.status(403);
        res.send("erreur, Cette table n'est pas sensé être update");
    return;
}; 

const DeleteOneUtilisateur_AtelierById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one Utilisateur_Atelier by id.');
    if(!req.body || !req.body.utilisateur_id || !req.body.atelier_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le DELETE, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const utilisateur_id : number = req.body.utilisateur_id;
    const atelier_id : number = req.body.atelier_id;
    const query = `DELETE * FROM utilisateur_atelier WHERE utilisateur_atelier.utilisateur_id = ${utilisateur_id} AND utilisateur_atelier.atelier_id = ${atelier_id}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete utilisateur_atelier : ');
};

export default {/*getAllUtilisateur_Atelier,*/ createUtilisateur_Atelier, getAllAtelierFromUtilisateur, getAllUtilisateurFromAtelier,  updateOneUtilisateur_AtelierById, DeleteOneUtilisateur_AtelierById};


// CREATE TABLE IF NOT EXISTS utilisateur_atelier (
//     utilisateur_id INT PRIMARY KEY NOT NULL REFERENCES utilisateur(utilisateur_id),
//     atelier_id INT PRIMARY KEY NOT NULL REFERENCES atelier(atelier_id)
// );